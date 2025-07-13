import { Node } from "@xyflow/react";
import { TaskType } from "./task";

export interface ScrapeNodeData{
    type: TaskType;
    inputs: Record<string,string>
    [key:string]:any
}
export interface ScrapeNode extends Node{
 data: ScrapeNodeData

}