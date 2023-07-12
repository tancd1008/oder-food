import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import { publicRoutes } from "./routes/Routers";


function App() {
  return <div className="App">
    <Routes>
    <Route path="/" element={<Layout />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        <Route path="admin" element={<AdminLayout/>}>
          {/* {privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })} */}
        </Route>
    </Routes>
  </div>;
}

export default App;
