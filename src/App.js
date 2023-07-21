import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import Layout from "./components/Layout/Layout";
import { privateRoutes, publicRoutes } from "./routes/Routers";
import { createRestaurant } from "./services/restaurents";
import { getUserIdByEmail } from "./services/users";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // createUser({
    //   email:"orderfood333@gmail.com",
    //   role:"ADMIN",
    //   imageUrl:"",
    //   isActive:true,
    //   createAt:"",
    //   idRestaurant:"",
    //   refRestaurant:"",
    //   name:"ADMIN"
    // })
    getUserIdByEmail("orderfood333@gmail.com")
    createRestaurant({
      address:"test",
      name:"nha hang 1",
      createAt:"",
      userId:""
    },"orderfood333@gmail.com")
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
