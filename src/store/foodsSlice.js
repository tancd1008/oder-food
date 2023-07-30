import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";
import { getAllFoodInRestaurant } from "../services/food";

const initialState = {
  foods: null,
  status: "idle",
  check: null,
  error: null,
};
export const fetchFoodByRestaurant = createAsyncThunk(
  "foods/fetchFoodByRestaurant",
  async ({ restaurantId }) => {
    const foodsList = await getAllFoodInRestaurant(restaurantId);
    return foodsList.map((restaurant) => ({
      ...restaurant,
      createdAt: convertToTimestamp(restaurant.createdAt), // Convert to UNIX timestamp in milliseconds
    }));
  }
);

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFoodByRestaurant.fulfilled, (state, action) => {
      state.foods = action.payload
    });
  },
});
export default foodsSlice.reducer;
