"use server"

import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"



export async function DeleteWorkflow(id:string) {
    const{userId} = auth()
    console.log("UserId",userId)
    console.log("WorkflowId",id)
    if(!userId)
    {
        throw new Error("unauthenticated user")
    }
    await prisma.workflow.delete({
        where:{
            id,userId
        },
    })
    revalidatePath("/workflows")
}