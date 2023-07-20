import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../Header/HeaderAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import "./../../styles/sb-admin.css";
import "./../../styles/sb-admin.min.css";

const AdminLayout = () => {
  // const [open, setOpen] = useState(true);
  // const Menus = [
  //   { title: "Dashboard", path: "" },
  //   { title: "Danh sách sản phẩm", path: "list" },
  //   { title: "Thêm mới sản phẩm", path: "products/add" },
  //   { title: "Thêm mới danh mục", path: "category/add" },
  //   { title: "Thống kê", path: "add" },
  // ];
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen ">
    //    <div className="flex w-full">
    //   {/* <div
    //     className={` ${
    //       open ? "w-72" : "w-20 "
    //     } bg-indigo-500 h-screen p-5  pt-8 relative duration-300`}
    //   >
    //     <img
    //       src="./src/assets/control.png"
    //       className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
    //        border-2 rounded-full  ${!open && "rotate-180"}`}
    //       onClick={() => setOpen(!open)}
    //       alt=''
    //     />
    //     <div className="flex gap-x-4 items-center">
    //       <img
    //         src="./src/assets/logo.png"
    //         className={`cursor-pointer duration-500 ${
    //           open && "rotate-[360deg]"
    //         }`}
    //         alt=''
    //       />
    //       <h1
    //         className={`text-white origin-left font-medium text-xl duration-200 ${
    //           !open && "scale-0"
    //         }`}
    //       >
    //         ATPOST
    //       </h1>
    //     </div>
    //     <ul className="pt-6">
    //       {Menus.map((Menu, index) => (
    //         <li
    //           key={index}
    //           className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
    //           ${Menu.gap ? "mt-9" : "mt-2"} ${
    //             index === 0 && "bg-light-white"
    //           } `}
    //         >
    //           <Link to={Menu.path}>
    //           <span className={`${!open && "hidden"} origin-left duration-200`}>
    //             {Menu.title}
    //           </span>
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div> */}
    //   <div className=" bg-slate-700 h-screen px-5  pt-8 relative duration-300">

    //   <SidebarAdmin/>
    //   </div>
    //   <div className="h-screen flex-1 p-7">
    //     <Outlet/>
    //   </div>
    //   </div>
    // </div>

    <div id="wrapper" className="vh-100 flex-rơw" style={{minHeight:"100vh", gap:"4px"}}>
      <div className="w-100" style={{ minHeight: "100%", maxWidth:"220px", width:"220px"}}>
        <SidebarAdmin />
      </div>
      <div className="d-flex flex-column" style={{maxWidth:"calc(100% - 220px)"}}>
        <div id="content">
          <HeaderAdmin />
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
