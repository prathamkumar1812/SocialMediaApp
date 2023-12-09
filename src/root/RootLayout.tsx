import Bottombar from '@/components/shared/Bottombar'
import LeftSideBar from '@/components/shared/LeftSideBar'
import Loader from '@/components/shared/Loader'
import Topbar from '@/components/shared/Topbar'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {
 
  return (
    <div className='w-full md:flex'>
      <Topbar/>
      <LeftSideBar/>
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      <Bottombar/>
    </div>
  )
}

export default RootLayout