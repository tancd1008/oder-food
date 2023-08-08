import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";
import {
  addFood,
  deleteFood,
  getAllFoodInRestaurant,
  updateFood,
} from "../services/food";

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
    console.log(foodsList);
    return foodsList.map((restaurant) => ({
      ...restaurant,
      createdAt: convertToTimestamp(restaurant.createdAt), // Convert to UNIX timestamp in milliseconds
    }));
  }
);
export const removeFood = createAsyncThunk(
  "foods/removeFood",
  async ({ foodId, restaurantId }) => {
    await deleteFood(foodId, restaurantId);
    return foodId;
  }
);
export const createFood = createAsyncThunk(
  "foods/createFood",
  async ({ food, restaurantId }) => {
    const result = await addFood(food, restaurantId);
    return result;
  }
);
export const editFood = createAsyncThunk(
  "foods/editFood",
  async ({ foodId, food, restaurantId }) => {
    const result = await updateFood(foodId, food, restaurantId);
    return result;
  }
);

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    setFoods: (state) => {
      state.foods = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodByRestaurant.fulfilled, (state, action) => {
        state.foods = action.payload;
      })
      .addCase(removeFood.fulfilled, (state, action) => {
        state.foods = state.foods.filter((item) => item.id !== action.payload);
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.foods.push(action.payload);
      })
      .addCase(editFood.fulfilled, (state, action) => {
        state.foods = state.foods.map((food) =>
          food.id === action.payload.id ? action.payload : food
        );
      });
  },
});
export const { setFoods } = foodsSlice.actions;

export default foodsSlice.reducer;
