import React from 'react'
import { Outlet } from 'react-router-dom'
import OrganizationNavbar from './OrganizationNavbar'
import Organ_SideBar from './Organ_SideBar'
function Layout() {
  return (
    <div>
        <Organ_SideBar />
        <OrganizationNavbar />
        
        <Outlet/>
    </div>
  )
}

export default Layout