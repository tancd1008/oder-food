import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import AuthLayout from "./components/Layout/AuthLayout";
import Layout from "./components/Layout/Layout";
import PrivateRote from "./helper/PrivateRote";
import { authenticationRoutes, privateRoutes, publicRoutes } from "./routes/Routers";

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
        <Route path="admin" element={<PrivateRote page={"ADMIN"}><AdminLayout /></PrivateRote> } >
          {user && privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        <Route path="auth" element={<PrivateRote page={"LOGIN"}><AuthLayout /></PrivateRote> }>
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
