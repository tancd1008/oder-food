
import UploadImage from "../components/UploadImage";
import AllFoods from "../pages/client/AllFoods";
import Cart from "../pages/client/Cart";
import Checkout from "../pages/client/Checkout";
import FoodDetails from "../pages/client/FoodDetails";
import Home from "../pages/client/Home";
import Login from "../pages/admin/auth/Login";
import NotFoundPage from "../pages/client/NotFoundPage";
import Register from "../pages/client/Register";
import AddCategory from "../pages/admin/categories/AddCategory";
import AddProduct from "../pages/admin/products/AddProduct";
import Dashboard from "../pages/admin/Dashboard";
import EditProduct from "../pages/admin/products/EditProduct";
import ListProducts from "../pages/admin/products/ListProducts";
import AddRestaurant from "../pages/admin/restaurants/AddRestaurant";
import ListRestaurants from "../pages/admin/restaurants/ListRestaurants";
import ListCategories from "../pages/admin/categories/ListCategories";
import EditCategory from "../pages/admin/categories/EditCategory";



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
    path: "product/list",
    component: ListProducts,
  },
  {
    path: "product/add",
    component: AddProduct,
  },
  {
    path: "products/edit/:id",
    component: EditProduct,
  },
  {
    path: "category/list",
    component: ListCategories,
  },
  {
    path: "category/add",
    component: AddCategory,
  },
  {
    path: "category/edit/:restaurantId/:categoryId",
    component: EditCategory,
  },
  {
    path: "restaurant/add",
    component: AddRestaurant,
  },
  {
    path: "restaurant/list",
    component: ListRestaurants,
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

