"use client"


import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog"
import { Layers2Icon } from 'lucide-react'

const CreateWorkflowDialog = ({triggerText}:{triggerText?:String}) => {
    const [open,setOpen]= useState(false)
 return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button>{triggerText?? "Create Workflow"}</Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
            {/* <CustomDialogHeader icon={Layers2Icon} title="Create workflow" subTitle="Start building your workflow"/> */}
        </DialogContent>
 </Dialog>
}

export default CreateWorkflowDialog
