import Logo from '@/components/Logo'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex flex-col w-full h-screen '>
        {children}
      <Separator/>
      <footer className='flex items-center justify-between p-2 bg-background'>
        <Logo iconSize={16} fontsize='text-xl'/>
        <ModeToggle/>
      </footer>
    </div>
  )
}

export default layout
