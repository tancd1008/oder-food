import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";

import { addOpitons, deleteOptions, getAllOptionsRestaurant, updateOptions } from "../services/options";

const initialState = {
  categories: null,
  status: "idle",
  check: null,
  error: null,
};
export const fetchOptionsRestaurant = createAsyncThunk(
  "categories/fetchOptionsRestaurant",
  async ({ restaurantId }) => {
    const optionsList = await getAllOptionsRestaurant(restaurantId);
    return optionsList.map((restaurant) => ({
      ...restaurant,
      createdAt: convertToTimestamp(restaurant.createdAt), // Convert to UNIX timestamp in milliseconds
    }));
  }
);
export const removeOptions = createAsyncThunk(
  "categories/deleteOptions",
  async ({ optionsId, restaurantId }) => {
    await deleteOptions(optionsId, restaurantId);
    return optionsId;
  }
);
export const createOptions = createAsyncThunk(
  "categories/createOptions",
  async ({ options, restaurantId }) => {
    const result = await addOpitons(options, restaurantId);
    return result;
  }
);
export const editOptions = createAsyncThunk(
  "categories/editOptions",
  async ({ optionsId, options, restaurantId }) => {
    await updateOptions(optionsId, options, restaurantId);
    return options;
  }
);

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setCategories: (state) => {
      state.categories = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptionsRestaurant.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(removeOptions.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(createOptions.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(editOptions.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        );
      });
  },
});
export const { setCategories } = optionsSlice.actions;

export default optionsSlice.reducer;
