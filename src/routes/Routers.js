
import UploadImage from "../components/UploadImage";
import AllFoods from "../pages/AllFoods";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import FoodDetails from "../pages/FoodDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import Register from "../pages/Register";
import AddCategory from "../pages/admin/AddCategory";
import AddProduct from "../pages/admin/AddProduct";
import Dashboard from "../pages/admin/Dashboard";
import ListProducts from "../pages/admin/ListProducts";



const publicRoutes = [
  {
    path: "",
    component: Home,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
  { path: "foods", component: AllFoods, },
  { path: "foods/:id", component: FoodDetails, },
  { path: "cart", component: Cart },
  { path: "checkout", component: Checkout },
  { path: "upload-image", component: UploadImage },
];
const privateRoutes = [
  {
    path: "",
    component: Dashboard,
  },
  {
    path: "*",
    component: NotFoundPage,
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

