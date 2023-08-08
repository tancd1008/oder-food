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
import Dashboard from "../pages/admin/Dashboard";
import AddRestaurant from "../pages/admin/restaurants/AddRestaurant";
import ListRestaurants from "../pages/admin/restaurants/ListRestaurants";
import ListCategories from "../pages/admin/categories/ListCategories";
import EditCategory from "../pages/admin/categories/EditCategory";
import ListFood from "../pages/admin/food/ListFood";
import AddFood from "../pages/admin/food/AddFood";
import EditFood from "../pages/admin/food/EditFood";
import ListOptions from "../pages/admin/options/ListOptions";
import AddOptions from "../pages/admin/options/AddOptions";
import EditOptions from "../pages/admin/options/EditOptions";
import ListVoucher from "../pages/admin/voucher/ListVoucher";
import AddVoucher from "../pages/admin/voucher/AddVoucher";
import EditVoucher from "../pages/admin/voucher/EditVoucher";
import ChooseRestaurant from "../pages/client/ChooseRestaurant";

const publicRoutes = [
  {
    path: "",
    component: ChooseRestaurant,
  },
  {
    path: "/:nameRestaurant",
    component: Home,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
  { path: "foods", component: AllFoods },
  { path: "foods/:id", component: FoodDetails },
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
    path: "food/list",
    component: ListFood,
  },
  {
    path: "food/add",
    component: AddFood,
  },
  {
    path: "food/edit/:restaurantId/:foodId",
    component: EditFood,
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
  {
    path: "options/list",
    component: ListOptions,
  },
  {
    path: "options/add",
    component: AddOptions,
  },
  {
    path: "options/edit/:restaurantId/:optionsId",
    component: EditOptions,
  },
  {
    path: "voucher/list",
    component: ListVoucher,
  },
  {
    path: "voucher/add",
    component: AddVoucher,
  },
  {
    path: "voucher/edit/:restaurantId/:voucherId",
    component: EditVoucher,
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
