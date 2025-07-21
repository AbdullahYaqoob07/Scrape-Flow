"use server"

import prisma from "@/lib/prisma"
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { TaskType } from "@/types/task"
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"

export async function RunWorkflow(form: {
    workflowId: string
    flowDefinition?: string
}) {
    const { userId } = auth()
    if (!userId) {
        throw new Error("unauthenticated")
    }

    const { workflowId, flowDefinition } = form

    if (!workflowId) {
        throw new Error("Workflow is required")
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            userId,
            id: workflowId
        }
    })

    if (!workflow) {
        throw new Error("workflow not found")
    }

    let executionPlan: WorkflowExecutionPlan

    if (!flowDefinition) {
        throw new Error("flow definition is not defined")
    }

    const flow = JSON.parse(flowDefinition)
    const result = FlowToExecutionPlan(flow.nodes, flow.edges)

    if (result.error) {
        throw new Error("flow definition not valid")
    }

    if (!result.executionPlan) {
        throw new Error("no execution plan generated")
    }

    executionPlan = result.executionPlan

    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId,
            startedAt: new Date(),
            status: WorkflowExecutionStatus.PENDING,
            trigger: WorkflowExecutionTrigger.MANUAL,
            phases: {
                create: executionPlan.flatMap(phase => {
                    return phase.nodes.flatMap((node) => {
                        return {
                            userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label,
                        }
                    })
                })
            }
        },
        select: {
            id: true,
            phases: true
        }
    })

    if (!execution) {
        throw new Error("workflow execution not created")
    }

    // Optionally return execution data if needed
    return execution
}
