/*
  Warnings:

  - Added the required column `workflowExcutionId` to the `ExecutionPhase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExecutionPhase" ADD COLUMN     "creditsCost" INTEGER,
ADD COLUMN     "outputs" TEXT,
ADD COLUMN     "workflowExcutionId" TEXT NOT NULL,
ALTER COLUMN "inputs" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ExecutionPhase" ADD CONSTRAINT "ExecutionPhase_workflowExcutionId_fkey" FOREIGN KEY ("workflowExcutionId") REFERENCES "WorkflowExecution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
