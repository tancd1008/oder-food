import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";

import {  addVoucher, getAllVoucherRestaurant, updateVoucher } from "../services/voucher";

const initialState = {
  voucher: null,
  status: "idle",
  check: null,
  error: null,
};
export const fetchVoucherRestaurant = createAsyncThunk(
  "voucher/fetchVoucherRestaurant",
  async ({ restaurantId }) => {
    const voucherList = await getAllVoucherRestaurant(restaurantId);
    return voucherList.map((restaurant) => ({
      ...restaurant,
      createdAt: convertToTimestamp(restaurant.createdAt), // Convert to UNIX timestamp in milliseconds
    }));
  }
);

export const createVoucher = createAsyncThunk(
  "voucher/createVoucher",
  async ({ voucher, restaurantId }) => {
    const result = await addVoucher(voucher, restaurantId);
    return result;
  }
);
export const editVoucher = createAsyncThunk(
  "voucher/editVoucher",
  async ({ voucherId, voucher, restaurantId }) => {
    await updateVoucher(voucherId, voucher, restaurantId);
    return voucher;
  }
);


const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    setVoucher: (state) => {
      state.voucher = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVoucherRestaurant.fulfilled, (state, action) => {
        state.voucher = action.payload;
      })
    
      .addCase(createVoucher.fulfilled, (state, action) => {
        console.log(action.payload);
        state.voucher.push(action.payload);
      })
      
  },
});
export const { setVoucher } = voucherSlice.actions;

export default voucherSlice.reducer;
