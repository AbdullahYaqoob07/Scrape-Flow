"use client"

import { workflow } from '@prisma/client'
import React from 'react'
import FlowEditor from './FlowEditor'
import {ReactFlowProvider}from "@xyflow/react"
import Topbar from '@/app/workflow/_components/topbar/Topbar'
import TaskMenu from './TaskMenu'
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext'
const Editor = ({workflow}:{workflow:workflow}) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className='flex flex-col h-full  w-full overflow-hidden'>
          <Topbar title="Workflow Editor" subtitle={workflow.name} workflowId={workflow.id}/>
          <section className='flex flex-1 overflow-auto'>
            <TaskMenu/>
            <FlowEditor workflow={workflow}/>
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
    
  )
}

export default Editor
