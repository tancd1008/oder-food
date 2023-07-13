
import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/admin/Dashboard";
import AddProduct from "../pages/admin/AddProduct";
import ListProducts from "../pages/admin/ListProducts";
import AddCategory from "../pages/admin/AddCategory";



const publicRoutes = [
  {
    path: "",
    component: Home,
  },
  { path: "foods", component: AllFoods, },
  { path: "foods/:id", component: FoodDetails, },
  { path: "cart", component: Cart },
  { path: "checkout", component: Checkout },
];
const privateRoutes = [
  {
    path: "",
    component: Dashboard,
  },
  {
    path: "list",
    component: ListProducts,
  },
  {
    path: "products/add",
    component: AddProduct,
  },
  {
    path: "category/add",
    component: AddCategory,
  },
];
const authenticationRoutes = [
  {
    path: "login",
    component: Login,
  },
  {
    path: "register",
    component: Register,
  },
];
export { authenticationRoutes, privateRoutes, publicRoutes };
