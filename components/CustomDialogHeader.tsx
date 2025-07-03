"use client"

import React from 'react'
import {DialogHeader,DialogTitle} from "@/components/ui/dialog"

interface Props{
    title?:string
    subTitle?:string
    icon?:string

    iconClassName?:string
    titleClassName?:string
    subtitleClassName?:string
}


const CustomDialogHeader = (props:Props) => {
  return (
    <div>
      CustomDialogHeader
    </div>
  )
}

export default CustomDialogHeader
