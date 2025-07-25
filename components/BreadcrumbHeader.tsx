"use client"

import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbSeparator } from './ui/breadcrumb'

import { usePathname } from 'next/navigation'
import React from 'react'
import { MobileSidebar } from './Sidebar'

const BreadcrumbHeader = () => {
    const pathName=usePathname()
    const paths=pathName==="/"?[""]:pathName?.split("/")

  return (
    <div className='flex items-center flex-start'>
        <MobileSidebar/>
      <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index)=>(
            <React.Fragment key={index}>
            <BreadcrumbItem>    
            <BreadcrumbLink className="capitalize" href={`/${path}`}>{path===""?'home':path}</BreadcrumbLink>
            
            </BreadcrumbItem>
            </React.Fragment>
        ))}
      
      </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadcrumbHeader
