import { ScrapeNode } from "@/types/appNode";
import { TaskType } from "@/types/task";

export function CreateFlowNode(

    nodeType:TaskType,
    position?: {x:number, y:number}
): ScrapeNode{
    {
        return {
            id: crypto.randomUUID(),
            type:"Node",
            data:{
                type:nodeType,
                inputs:{}
            },
            position:position??{x:0 , y:0}

        }
    }
}
