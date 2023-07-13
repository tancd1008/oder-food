import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import { publicRoutes } from "./routes/Routers";
import { useState } from "react";
import { useEffect } from "react";
import { ref, child, get } from "firebase/database";
import database from "./firebase-config";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const dbRef = ref(database);
      get(child(dbRef, `products`))
        .then((snapshot) => {
          if (snapshot.val() !== null) {
           
            setProducts([...snapshot.val()]);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getProducts();
  }, []);
  console.log(products)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          {/* {privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })} */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
