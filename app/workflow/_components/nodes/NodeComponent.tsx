import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { ScrapeNodeData } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { NodeInput, NodeInputs } from "./NodeInputs";
import NodeOutputs, { NodeOutput } from "./NodeOutputs";

const NodeComponent =memo((props:NodeProps)=>{


  const nodeData=props.data as ScrapeNodeData
  const task= TaskRegistry[nodeData.type]
    return( 
    <NodeCard nodeId={props.id} isSelected={props.selected}>
        <NodeHeader taskType={nodeData.type} nodeId={props.id}/>
            <NodeInputs>
            {task.inputs.map((input)=>(
               
                <NodeInput key={input.name} input={input} nodeId={props.id}/>

  ))}
        </NodeInputs>
          <NodeOutputs>
            {task.outputs.map((output)=>(
               
                <NodeOutput key={output.name} output={output} />

  ))}
        </NodeOutputs>
    </NodeCard>
    )
});


export default NodeComponent;

NodeComponent.displayName="NodeComponent"