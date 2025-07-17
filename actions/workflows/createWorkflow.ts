"use server";

import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { ScrapeNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { z } from "zod";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  try {
    const parsed = createWorkflowSchema.safeParse(form);
    if (!parsed.success) {
      throw new Error("Invalid form data");
    }

    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated user");
    }

    const initialFlow: {nodes:ScrapeNode[], edges: Edge[]}={
      nodes:[],
      edges:[]
    }
    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))
    const result = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition:JSON.stringify(initialFlow),
        ...parsed.data,
      },
    });

    if (!result) {
      throw new Error("Failed to create the workflow");
    }

    // ✅ return instead of redirect
    return { id: result.id };

  } catch (error) {
    console.error("CreateWorkflow error:", error);
    throw new Error("Something went wrong while creating the workflow");
  }
}
