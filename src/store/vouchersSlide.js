import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToTimestamp } from "../helper/convertTimestamp";

import {
  addVoucher,
  deleteVoucher,
  getAllVoucherRestaurant,
  updateVoucher,
} from "../services/voucher";

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
  },
);

export const createVoucher = createAsyncThunk(
  "voucher/createVoucher",
  async ({ voucher, restaurantId }) => {
    const result = await addVoucher(voucher, restaurantId);
    return result;
  },
);
export const editVoucher = createAsyncThunk(
  "voucher/editVoucher",
  async ({ voucherId, voucher, restaurantId }) => {
    await updateVoucher(voucherId, voucher, restaurantId);
    return voucher;
  },
);
export const removeVoucher = createAsyncThunk(
  "voucher/deleteVoucher",
  async ({ voucherId, restaurantId }) => {
    await deleteVoucher(voucherId, restaurantId);
    return voucherId;
  },
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
      .addCase(removeVoucher.fulfilled, (state, action) => {
        state.voucher = state.voucher.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(editVoucher.fulfilled, (state, action) => {
        state.voucher = state.voucher.map((voucher) =>
          voucher.id === action.payload.id ? action.payload : voucher,
        );
      });
  },
});
export const { setVoucher } = voucherSlice.actions;

export default voucherSlice.reducer;
