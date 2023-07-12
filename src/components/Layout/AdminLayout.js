import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

const AdminLayout = () => {
  console.log(`Alo`);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <SidebarAdmin />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
