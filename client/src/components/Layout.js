import React from 'react'
import  Headers from "./Headers"

import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
  <main>
    <Headers/>
    
     <Outlet/>
  </main>
  )
}

export default Layout