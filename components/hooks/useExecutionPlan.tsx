import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/executionPlan"
import { ScrapeNode } from "@/types/appNode"
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react"
import useFlowValidation from "./useFlowValidation"
import { toast } from "sonner"

const useExecutionPlan=()=>{
const {setInvalidInputs, clearErrors}=useFlowValidation()
const handleError = useCallback((error: any) => {
  console.log("Execution error:", error)

  switch (error?.type) {
    case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
      toast.error("No entry point found")
      break

    case FlowToExecutionPlanValidationError.INVALID_INPUTS:
      toast.error("Not all input values are set")
      setInvalidInputs(error.invalidElements)
      break

    default:
      toast.error("something went wrong")
      break
  }
}, [setInvalidInputs])

const {toObject}=useReactFlow()

const generateExecutionPlan=useCallback(()=>{
    const {nodes,edges}= toObject()
    const {executionPlan,error}= FlowToExecutionPlan(nodes as ScrapeNode[],edges)

    if(error){
        handleError(error)
        return null
    }
    clearErrors()

    return executionPlan

},[toObject, clearErrors, handleError])
return generateExecutionPlan
}

export default useExecutionPlan