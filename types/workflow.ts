import { LucideIcon, LucideProps } from "lucide-react"
import { TaskParam, TaskType } from "./task"
import { ScrapeNode } from "./appNode"

export enum WorkflowStatus{
    DRAFT="DRAFT",
    PUBLISHED="PUBLISHED"
}
export type WorkflowTask={
    label:string,
    icon: React.FC<LucideProps>
    type: TaskType
    isEntryPoint?: boolean
    inputs:TaskParam[]
    outputs:TaskParam[]
    credits:number
}



export type WorkflowExecutionPlanPhase={
phase:number,
nodes:ScrapeNode[]

}

export type WorkflowExecutionPlan=WorkflowExecutionPlanPhase[]