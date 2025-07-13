"use client"

import {z} from  "zod"
import React,{useCallback, useState} from 'react'
import { Button } from '@/components/ui/button'
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog"
import { Layers2Icon, Loader2 } from 'lucide-react'
import CustomDialogHeader from '@/components/CustomDialogHeader'
import { useForm } from 'react-hook-form'
import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflow'
import {zodResolver} from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormLabel,FormItem,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { CreateWorkflow } from "@/actions/workflows/createWorkflow"
import { toast } from "sonner"
import { useRouter } from "next/navigation"





const CreateWorkflowDialog = ({triggerText}:{triggerText?:String}) => {

    const router =useRouter()
    const [open,setOpen]= useState(false)
    const{mutate, isPending}=useMutation(
    {
        mutationFn: CreateWorkflow,
        onSuccess:(data)=>{
            toast.success("Workflow created", {id:"create-workflow"})
              router.push(`/workflow/editor/${data.id}`); // ✅ Redirect safely here
        },
        onError:()=>{
            toast.error("Failed to create workflow",{id:"create-workflow"})
        }
    })
    const onSumbit=useCallback((values:createWorkflowSchemaType)=>{
        toast.loading("Creating workflow...", {id:"create-workflow"})
        mutate(values)

    },[mutate])

    


    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues:{},

    })
 return (
 <Dialog   open={open} onOpenChange={(open)=>{
    form.reset()
    setOpen(open)
 }}>
        <DialogTrigger asChild>
        <Button>{triggerText?? "Create Workflow"}</Button>
        </DialogTrigger>
        <DialogContent  className="pt-4 pb-4 mt-2">
            <CustomDialogHeader icon={Layers2Icon} title="Create workflow" subTitle="Start building your workflow"/>

            <div className="p-6">
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-8 w-full">
    
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex gap-1 items-center">
            Name <p className="text-xs text-primary">(required)</p>
          </FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>
            Choose a descriptive and unique name
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex gap-1 items-center">
            Description{" "}
            <p className="text-xs text-muted-foreground">(optional)</p>
          </FormLabel>
          <FormControl>
            <Textarea className="resize-none" {...field} />
          </FormControl>
          <FormDescription>
            Provide a brief about what your workflow does.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <Button type="submit" className="w-full" disabled={isPending}>
      {!isPending && "Proceed"}
      {isPending && <Loader2 className="animate-spin" />}
    </Button>
  </form>
</Form>

            </div>


        </DialogContent>

 </Dialog>
 )
}

export default CreateWorkflowDialog
