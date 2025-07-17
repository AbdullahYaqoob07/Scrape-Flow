import React from 'react'


import {Accordion, 
  AccordionContent,
  AccordionItem,
  AccordionTrigger,

}from  "@/components/ui/accordion"
import { TaskType } from '@/types/task'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { Button } from '@/components/ui/button'

const TaskMenu = () => {
  return (
   <aside className='w-[340px] min-w-[340px] max-w-[340px] border-separate h-full border-r-2 p-2 px-4 overflow-auto bg-background'>

    <Accordion type="multiple" className="w-full " defaultValue={["extraction"]}>
      <AccordionItem value="extraction">
        <AccordionTrigger className="font-bold">
          Data Extraction
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn tasktype={TaskType.PAGE_TO_HTML}/>
             <TaskMenuBtn tasktype={TaskType.EXTRACT_TEXT_FROM_ELEMENT}/>
           </AccordionContent>
      </AccordionItem>
    </Accordion>
   </aside>
  )
}


function TaskMenuBtn({tasktype}:{tasktype:TaskType}){
const task= TaskRegistry[tasktype]
const onDragStart=(event:React.DragEvent,type:TaskType)=>{
  event.dataTransfer.setData("application/reactflow",type)
  event.dataTransfer.effectAllowed="move"
}

return(
  <Button variant={"secondary"} className='flex justify-between items-center gap-2 border w-full '
  draggable={true}
  onDragStart={e=>onDragStart(e,tasktype)}
  >
  
  <div className='flex gap-2'>
    <task.icon size={20}/>
    {task.label}
    </div>
  </Button>
)

}

export default TaskMenu


