import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlide";
import foodsReducer from "./foodsSlice";
import restaurantsReducer from "./restaurantSlice";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import optionsReducer from "./optionsSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    restaurants: restaurantsReducer,
    categories: categoriesReducer,
    options: optionsReducer,
    foods: foodsReducer,
  },
});

export default store;
