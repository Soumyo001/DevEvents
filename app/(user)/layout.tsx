import React from 'react'
import NavBar from '@/components/navbar'
import { USERNAVBARITEM } from '@/lib/data/constants'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full flex flex-col'>
        <NavBar
          items={USERNAVBARITEM}
        />
        <div className='container mx-auto mt-20 max-sm:px-5 px-10 py-4'>
          {children}
        </div>
    </div>
  )
}

export default Layout