import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";

import {
  addOpitons,
  deleteOptions,
  getAllOptionsRestaurant,
  updateOptions,
} from "../services/options";

const initialState = {
  options: null,
  status: "idle",
  check: null,
  error: null,
};
export const fetchOptionsRestaurant = createAsyncThunk(
  "options/fetchOptionsRestaurant",
  async ({ restaurantId }) => {
    const optionsList = await getAllOptionsRestaurant(restaurantId);
    return optionsList.map((restaurant) => ({
      ...restaurant,
      createdAt: convertToTimestamp(restaurant.createdAt), // Convert to UNIX timestamp in milliseconds
    }));
  },
);
export const removeOptions = createAsyncThunk(
  "options/deleteOptions",
  async ({ optionsId, restaurantId }) => {
    await deleteOptions(optionsId, restaurantId);
    return optionsId;
  },
);
export const createOptions = createAsyncThunk(
  "options/createOptions",
  async ({ options, restaurantId }) => {
    const result = await addOpitons(options, restaurantId);
    return result;
  },
);
export const editOptions = createAsyncThunk(
  "options/editOptions",
  async ({ optionsId, options, restaurantId }) => {
    await updateOptions(optionsId, options, restaurantId);
    return options;
  },
);

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setoptions: (state) => {
      state.options = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptionsRestaurant.fulfilled, (state, action) => {
        state.options = action.payload;
      })
      .addCase(removeOptions.fulfilled, (state, action) => {
        state.options = state.options.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(createOptions.fulfilled, (state, action) => {
        state.options.push(action.payload);
      })
      .addCase(editOptions.fulfilled, (state, action) => {
        state.options = state.options.map((options) =>
          options.id === action.payload.id ? action.payload : options,
        );
      });
  },
});
export const { setOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
