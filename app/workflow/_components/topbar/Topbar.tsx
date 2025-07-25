import TooltipWrapper from '@/components/TooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SaveBtn from './SaveBtn'
import ExecuteBtn from './ExecuteBtn'


interface Props{
    title: string,
    subtitle?:string
    workflowId:string 
}


export default function Topbar({ title, subtitle,workflowId}: Props) {
    const router = useRouter()
    return (
       <div className='flex p-2 border border-gray-300 justify-between w-full h-[60px] top-0 bg-background z-10 '>

            <div className="flex gap-1 flex-1 ">
                <TooltipWrapper content="Back">
                    <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
                        <ChevronLeft size={20} />
                    </Button>
                </TooltipWrapper>
                <div>
                    <p className='font-bold text-ellipsis truncate'>{title}</p>
                   {subtitle && (
                    <p className='text-xs text-muted-foreground truncate text-ellipsis'>
                        {subtitle}
                    </p>
                   )}
                </div>
            </div>

            <div className="flex gap-1 flex-1 justify-end">
                <ExecuteBtn workflowId={workflowId}/>
                <SaveBtn workflowId={workflowId}/>
            </div>
        </div>
    )
}