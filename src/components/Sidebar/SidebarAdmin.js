import React from "react";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  // const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", path: "" },
    { title: "Danh sách sản phẩm", path: "list" },
    { title: "Thêm mới sản phẩm", path: "products/add" },
    { title: "Thêm mới danh mục", path: "category/add" },
    { title: "Thống kê", path: "add" },
  ];

  return (
    <div className="vh-100 d-flex">

    <div className="sidebar" style={{minHeight:"100vh"}}>
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
          <div className="sidebar-brand-text   mx-3">
            SB Admin <sup>2</sup>
          </div>
        </a>
        {Menus.map((Menu, index) => (
          <li key={index}>
            <Link to={Menu.path} className="sidebar-link text-light">
              <span>{Menu.title}</span>
            </Link>
          </li>
        ))}

        
        {/* Sidebar Message */}
      </ul>
    </div>
    </div>
  );
};

export default SidebarAdmin;
