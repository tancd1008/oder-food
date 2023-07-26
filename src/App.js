import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import Layout from "./components/Layout/Layout";
import { authenticationRoutes, privateRoutes, publicRoutes } from "./routes/Routers";
import { loginAndFetchUserData } from "./services/users";
import AuthLayout from "./components/Layout/AuthLayout";

function App() {
  const [products] = useState([]);

  useEffect(() => {
    // const getProducts = async () => {
    //   const db = getDatabase();
    //   const productRef = ref(db, "products/");
    //   onValue(productRef, (snapshot) => {
    //     var newData = []
    //     snapshot.forEach((item)=>{
    //       newData.push(item.val())
    //     })
    //     setProducts(newData)
    //   });

    // };
    // getProducts();
    // loginAndFetchUserData("lythatda@gmail.com","Aa@12345")
  }, []);

  return (
    <div className="App " style={{minHeight:"100vh"}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          {privateRoutes.map((route, index) => {
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
