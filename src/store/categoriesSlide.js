import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";
import {
  addCategory,
  deleteCategory,
  getAllCategoriesInRestaurant,
  updateCategory,
} from "../services/category";

const initialState = {
  categories: null,
  status: "idle",
  check: null,
  error: null,
};
export const fetchCategoriesByRestaurant = createAsyncThunk(
  "categories/fetchCategoriesByRestaurant",
  async ({ restaurantId }) => {
    console.log(restaurantId);
    const categoriesList = await getAllCategoriesInRestaurant(restaurantId);
    console.log(categoriesList);
    return categoriesList.map((restaurant) => ({
      ...restaurant,
      createdAt: convertToTimestamp(restaurant.createdAt), // Convert to UNIX timestamp in milliseconds
    }));
  }
);
export const removeCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({ categoryId, restaurantId }) => {
    await deleteCategory(categoryId, restaurantId);
    return categoryId;
  }
);
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ category, restaurantId }) => {
    const result = await addCategory(category, restaurantId);
    return result;
  }
);
export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ categoryId, category, restaurantId }) => {
    await updateCategory(categoryId, category, restaurantId);
    return category;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state) => {
      state.categories = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesByRestaurant.fulfilled, (state, action) => {
        console.log(action.payload);
        state.categories = action.payload;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        );
      });
  },
});
export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
