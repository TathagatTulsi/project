import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import SideBar from './SideBar'

function Layout() {
  return (
    <div>
      <SideBar />
      <AdminNavbar />

      <Outlet />
    </div>
  )
}

export default Layout