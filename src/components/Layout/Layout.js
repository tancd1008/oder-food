import React from "react";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    <div>
      <Header />

      {showCart && <Carts />}

      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
