"use client"

import { workflow } from '@prisma/client'
import React from 'react'
import FlowEditor from './FlowEditor'
import {ReactFlowProvider}from "@xyflow/react"

const Editor = ({workflow}:{workflow:workflow}) => {
  return (
    <ReactFlowProvider>
    <div className='flex flex-col h-full w-full overflow-hidden'>
      <section className='flex h-full overflow-auto'>
        <FlowEditor workflow={workflow}/>
      </section>
    </div>
  
    </ReactFlowProvider>
  )
}

export default Editor
