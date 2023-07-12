import React from 'react'
import HeaderAdmin from '../Header/HeaderAdmin'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  console.log(`Alo`)
  return (
    <div  className="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
      <HeaderAdmin/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout
