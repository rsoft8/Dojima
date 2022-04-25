import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { setAll } from "../helpers";
import { RootState } from "src/store";
const initialState = {
  loading: false,
  options: {},
  balances: { busd: "", ohm: "", sohm: "" },
  staking: { ohmStake: 0, ohmUnstake: 0 },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {},
});

export interface IUserOptionDetails {
  allowance: number;
  interestDue: number;
  optionMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
