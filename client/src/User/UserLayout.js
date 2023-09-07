import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavBar from './UserNavbar'
import User_Sidebar from './User_Sidebar'

function UserLayout() {
  return (
    <div>
        <User_Sidebar />
        <UserNavBar />
        
        <Outlet/>
    </div>
  )
}

export default UserLayout