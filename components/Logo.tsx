import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import { SquareDashedMousePointer } from 'lucide-react'
const Logo = ({
    fontsize="2xl",
    iconSize=20

}:{
    fontsize?:string,
    iconSize?:number
}) => {
  return (
   <Link href="/" className={cn("text-2xl font-extrabold flex items-center gap-2",fontsize)}>
    <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <SquareDashedMousePointer size={iconSize} className="stroke-white"/>
        </div>
        <div>
            <span className='bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent'>
                Flow
            </span>
            <span className='text-stone-700 dark:text-stone-300'>Scrape</span>
        </div>
   </Link>
  )
}

export default Logo
