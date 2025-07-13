"use client"
import { workflow } from "@prisma/client"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react"
import React from "react"
import "@xyflow/react/dist/style.css"
import { CreateFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/task"
import NodeComponent from "./nodes/NodeComponent"

const nodeTypes={
   Node: NodeComponent
}

function FlowEditor({workflow}:{workflow: workflow}){

    const [nodes,setNodes,onNodesChange]=useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER)
    ])
    const[edges,setEdges,onEdgeChange]=useEdgesState([])

    return(
        <main className="h-full w-full ">
           <ReactFlow
           nodes={nodes}
           edges={edges}
           onNodesChange={onNodesChange}
           onEdgesChange={onEdgeChange}
           nodeTypes={nodeTypes}
           >
            
           </ReactFlow>
           <Controls position="top-left"/>
           <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
        </main>
    )
}
export default FlowEditor