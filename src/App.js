import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import Layout from "./components/Layout/Layout";
import { privateRoutes, publicRoutes } from "./routes/Routers";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const db = getDatabase();
      const productRef = ref(db, "products/");
      onValue(productRef, (snapshot) => {
        var newData = []
        snapshot.forEach((item)=>{
          newData.push(item.val())
        })
        setProducts(newData)
      });

    };
    getProducts();
  }, []);
  console.log(products);

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
      </Routes>
    </div>
  );
}

export default App;
