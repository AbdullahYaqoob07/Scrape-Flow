import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, GlobeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask={ 
      type: TaskType.PAGE_TO_HTML,
    label: "Get html from page",
    icon: (props:LucideProps)=>(<CodeIcon className="stroke-rose-400 "{...props}/>),
    isEntryPoint:false,
     credits:2,
    inputs:[{
        name:"WebPage",
        type:TaskParamType.BROWSER_INSTANCE, 
        required: true,
       
    }],
    outputs:[{
        name:"Html",
        type:TaskParamType.STRING
    },
    {
        name:"Webpage",
        type:TaskParamType.BROWSER_INSTANCE
    }
]
}satisfies WorkflowTask
