"use server";

import prisma from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  try {
    const parsed = createWorkflowSchema.safeParse(form);
    if (!parsed.success) {
      throw new Error("Invalid form data");
    }

    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated user");
    }

    const result = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: "TODO",
        ...parsed.data,
      },
    });

    if (!result) {
      throw new Error("Failed to create the workflow");
    }

    // ✅ return instead of redirect
    return { id: result.id };

  } catch (error) {
    console.error("CreateWorkflow error:", error);
    throw new Error("Something went wrong while creating the workflow");
  }
}
