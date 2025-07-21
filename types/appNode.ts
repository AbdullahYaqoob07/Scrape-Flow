import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task";

export interface ScrapeNodeData{
    type: TaskType;
    inputs: Record<string,string>
    [key:string]:any
}
export interface ScrapeNode extends Node{
 data: ScrapeNodeData

}

export interface ParamProps{
    param:TaskParam
    value:string
    updateNodeParamValue: (newValue:string)=>void
    disabled?:boolean
}

export type ScrapeNodeMissingInputs={
    nodeId:string
    inputs:string[]    
}