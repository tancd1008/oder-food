import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import Layout from "./components/Layout/Layout";
import { authenticationRoutes, privateRoutes, publicRoutes } from "./routes/Routers";
import AuthLayout from "./components/Layout/AuthLayout";

function App() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
   
  }, []);
    console.log(user)
  return (
    <div className="App " style={{minHeight:"100vh"}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        <Route path="admin" element={user ? <AdminLayout /> : <Navigate to="/auth/login" />} >
          {user && privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          {authenticationRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
