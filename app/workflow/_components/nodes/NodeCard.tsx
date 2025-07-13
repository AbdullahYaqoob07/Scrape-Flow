import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
import React from 'react'

const NodeCard = ({
    children,
     nodeId,
     isSelected

}:{
    nodeId:string ,
    children:React.ReactNode
    isSelected:boolean
}) => {

    const {getNode}=useReactFlow()

  return (
    <div 
    onDoubleClick={()=>{
        const node=getNode(nodeId)
        if(!node)return
        const{position,measured}=node


    }}
    
    className= {cn(
    'rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col',
    isSelected && "border-primary"
    )}>
      {children}
    </div>
  )
}

export default NodeCard
