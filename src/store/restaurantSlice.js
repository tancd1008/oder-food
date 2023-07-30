import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";
import { getAllRestaurants } from "../services/restaurants";

const initialState = {
  restaurants: null,
  restaurantId: null,
  status: "idle",
  check: null,
  error: null,
};
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    const restaurantList = await getAllRestaurants();
    return restaurantList.map((restaurant) => ({
      ...restaurant,
      createdAt: convertToTimestamp(restaurant.createdAt), // Convert to UNIX timestamp in milliseconds
    }));
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurantId: (state, action) => {
      console.log("pay load", action.payload);
      state.restaurantId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurants.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
  },
});
export const { setRestaurantId } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
