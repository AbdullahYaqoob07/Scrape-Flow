"use client";
import { workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  MarkerType,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import React, { useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "./nodes/NodeComponent";
import { ScrapeNode } from "@/types/appNode";
import DeletableEdge from "@/app/(dashboard)/workflows/_components/edges/DeletableEdge";
import { TaskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  Node: NodeComponent,
};
const edgeTypes = {
  default: DeletableEdge,
};
const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

function FlowEditor({ workflow }: { workflow: workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<ScrapeNode>([]);
  const [edges, setEdges, onEdgeChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData("application/reactflow");
      if (typeof taskType === "undefined" || !taskType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = CreateFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
          },
          eds
        )
      );

      if (!connection.targetHandle) return;
      //Remove input value if is present on connection
      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [nodes, setEdges, updateNodeData]
  );

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    //no self connection allowed
    if(connection.source===connection.target)
    {
        return false
    }
    //same taskParam type connection
    const source=nodes.find(node=>node.id ===connection.source)
     const target=nodes.find(node=>node.id ===connection.target)
     if(!source||!target)return false

     const sourceTask =TaskRegistry[source.data.type]
     const targetTask= TaskRegistry[target.data.type]
     
     const output = sourceTask.outputs.find((o)=> o.name=== connection.sourceHandle)
     const input=targetTask.inputs.find((o)=> o.name===connection.targetHandle)
     if(input?.type!==output?.type)
     {
        return false
     }
    const hasCycle = (node: ScrapeNode, visited = new Set()) => {
            if(visited.has(node.id))return false
            visited.add(node.id)
            for(const outgoer of getOutgoers(node,nodes,edges)){
                if(outgoer.id===connection.source)return true
                if( hasCycle(outgoer,visited)) return true
            }
    };
    const detectedCycle=hasCycle(target)
    return !detectedCycle
  }, [edges, nodes]);

  return (
    <main className="h-full w-full relative ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgeChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      ></ReactFlow>
      <Controls
        position="top-left"
        fitViewOptions={fitViewOptions}
        className="z-20"
      />

      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </main>
  );
}
export default FlowEditor;
