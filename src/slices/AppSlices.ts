import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addresses } from "src/constants";
import { IBaseAsyncThunk } from "./interface";
import { abi as optionER_ABI } from "../abi/OptionERC20.json";
import { abi as SalesContract } from "../abi/SalesContract.json";
import multicall from "src/helpers/multicall";
import { ethers } from "ethers";
import { setAll } from "src/helpers";

interface IAppData {
  readonly saleNumber: number;
}

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch }) => {
    const salesCall = new ethers.Contract(addresses[networkID].SALES_CONTRACT, SalesContract, provider);
    const saleNumber = Number(await salesCall.saleNumber());
    console.log("🚀 ~ file: AppSlices.ts ~ line 26 ~ salesCall", saleNumber);
    return { saleNumber } as IAppData;
  },
);
const initialState = {
  loading: false,
  saleNumber: 0,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

export default appSlice.reducer;
