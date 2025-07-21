import { ScrapeNodeMissingInputs } from "@/types/appNode"
import { Dispatch, ReactNode, SetStateAction, useState, createContext } from "react"

type FlowValidationContextType={
    invalidInputs: ScrapeNodeMissingInputs[]
    setInvalidInputs: Dispatch<SetStateAction<ScrapeNodeMissingInputs[]>>
    clearErrors:()=>void
}

export const FlowValidationContext=createContext<FlowValidationContextType | null>(null)
export function FlowValidationContextProvider({
    children
}:{
    children:ReactNode
}){
    const [invalidInputs,setInvalidInputs]=useState<ScrapeNodeMissingInputs[]>([])
    const clearErrors=()=>{
        setInvalidInputs([])
    }
    return(
        <FlowValidationContext.Provider value={{
            invalidInputs,
            setInvalidInputs,
            clearErrors
        }}>
            {children}
        </FlowValidationContext.Provider>
    )
}