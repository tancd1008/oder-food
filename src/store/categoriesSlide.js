import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";
import { getAllCategoriesInRestaurant } from "../services/category";

const initialState = {
  categories: null,
  status: "idle",
  check: null,
  error: null,
};
export const fetchCategoriesByRestaurant = createAsyncThunk(
  "categories/fetchCategoriesByRestaurant",
  async ({ restaurantId }) => {
    const categoriesList = await getAllCategoriesInRestaurant(restaurantId);
    return categoriesList.map((restaurant) => ({
      ...restaurant,
      createdAt: convertToTimestamp(restaurant.createdAt), // Convert to UNIX timestamp in milliseconds
    }));
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesByRestaurant.fulfilled, (state, action) => {
      state.categories = action.payload
    });
  },
});
export default categoriesSlice.reducer;
