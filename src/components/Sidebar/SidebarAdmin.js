import React from "react";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  // const [open, setOpen] = useState(true);
  const userRole = JSON.parse(sessionStorage.getItem("user")).role;
  console.log(userRole);
  const Menus = [
    { title: "Dashboard", path: "" },
    { title: "Danh sách nhà hàng", path: "restaurant/list", show: userRole ==="ADMIN" },
    { title: "Danh sách danh mục", path: "category/list",show: userRole ==="USER" || userRole ==="ADMIN" },
    { title: "Danh sách sản phẩm", path: "food/list",show: userRole ==="USER" || userRole ==="ADMIN" },
  ];

  return (
    <div className="sidebar" style={{minHeight:"100%", position:"fixed",maxWidth:"100%"}}>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
        style={{minHeight:"100vh"}}
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">
            ATPOS
          </div>
        </a>
        {Menus.map((Menu, index) => (
          Menu.show ? (
          <li key={index}>
            <Link to={Menu.path} className="sidebar-link text-light">
              <span>{Menu.title}</span>
            </Link>
          </li>
          ) : null
        ))}

        
        {/* Sidebar Message */}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
