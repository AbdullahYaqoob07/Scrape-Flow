'use client'
import React from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"




const AppProviders = ({children}:{children:React.ReactNode}) => {

  const [queryClient]=useState(()=>new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme='light' enableSystem>{children}

    </ThemeProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default AppProviders
