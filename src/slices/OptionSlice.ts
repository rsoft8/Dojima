import { NetworkAddresses } from "./../lib/Option";
import { Option } from "src/lib/Option";
import { BigNumber, ethers } from "ethers";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IABuyOptionAsyncThunk,
  IApproveOptionAsyncThunk,
  ICalcOptionDetailsAsyncThunk,
  IJsonRPCError,
} from "./interface";
import { prettifySeconds, secondsUntilBlock } from "src/helpers";
import { addresses, MARKET_PRICE_API } from "src/constants";
import { error, info } from "./MessagesSlice";
import { clearPendingTxn, fetchPendingTxns } from "./PendingTxnsSlice";

export interface IOptionDetails {
  optionID: number;
  option: Option;
  marketPrice: number;
  swapAssetAmt: number;
  optionTotalBalance: number;
  optionAvailableBalance: number;
  optionUserBalance: number;
  priceSwapAsset: number;
  priceUnderlying: number;
  optionPrice: number;
  expiryTime: string;
  underlyingAmt: number;
  purchaseAllowance: number;
  exerciseAllowance: number;
  optionERC20Symbol: string;
  underlyingSymbol: string;
  swapSymbol: string;
}

interface IUAData {
  address: string;
  value: string;
  approved: boolean;
  txHash: string | null;
  type: string | null;
}
export const calcOptionDetails = createAsyncThunk(
  "optioning/calcOptionDetails",
  async (
    { option, provider, networkID, address }: ICalcOptionDetailsAsyncThunk,
    { dispatch, getState },
  ): Promise<IOptionDetails> => {
    console.log("🚀 ~ file: OptionSlice.ts ~ line 50 ~ option", option);
    try {
      const optionID = option.optionId;
      const salesAddress = addresses[networkID].SALES_CONTRACT;
      const optionContainer = option.getContainerContract(networkID, provider);
      const optionERC20Contract = option.getERC20Contract(networkID, provider);
      console.log("🚀 ~ file: OptionSlice.ts ~ line 54 ~ optionERC20Contract", optionERC20Contract);
      const salesContract = option.getSalesContract(salesAddress, provider);

      const call = await axios.get(MARKET_PRICE_API);
      const deadline = await optionContainer.deadline();
      const swapAsset = await optionContainer.swapAsset();
      const underlyingAsset = await optionContainer.underlyingAsset();
      console.log("🚀 ~ file: OptionSlice.ts ~ line 60 ~ underlyingAsset", underlyingAsset);
      const currentBlock = await provider.getBlockNumber();
      const optionERC20Symbol = await optionERC20Contract.symbol();

      const underlyingContract = option.getUnderlyingContract(underlyingAsset, provider);
      console.log("🚀 ~ file: OptionSlice.ts ~ line 64 ~ underlyingContract", underlyingContract);
      const swapContract = option.getSwapContract(swapAsset, provider);

      const underlyingSymbol = await underlyingContract.symbol();
      const swapSymbol = await swapContract.symbol();
      // const minPurchase = await swapContract.symbol();
      // const maxPurchase = await swapContract.symbol();

      const swapAssetAmt = Number(ethers.utils.formatUnits(await optionContainer.swapAssetAmt(), "ether"));
      const underlyingAmt = Number(ethers.utils.formatUnits(await optionContainer.underlyingAmt(), "ether"));
      const optionTotalBalance = Number(
        ethers.utils.formatUnits(await salesContract.getAmountOffered(optionID), "ether"),
      );
      const optionAvailableBalance = Number(
        ethers.utils.formatUnits(await salesContract.amountUnsold(optionID), "ether"),
      );
      const expireIn = Number(deadline.toString()) - secondsUntilBlock(Number(currentBlock), deadline);
      const expiryTime = prettifySeconds(expireIn, "day");

      const marketPrice = call.data[optionERC20Symbol] ?? 1;
      const optionPrice = call.data[optionERC20Symbol] ?? 1;
      const priceSwapAsset = call.data[swapSymbol] ?? 1;
      const priceUnderlying = call.data[underlyingSymbol] ?? 1;

      let purchaseAllowance = 0;
      let exerciseAllowance = 0;
      let underlyingBalance = 0;
      let swapBalance = 0;
      let optionUserBalance = 0;

      const buyTokenAddress = await salesContract.sales(optionID);
      const buyTokenContract = option.getSwapContract(buyTokenAddress.buyToken, provider);

      if (address) {
        try {
          exerciseAllowance = Number(
            (await buyTokenContract.allowance(address, option.networkAddrs[networkID].optionContact)).toString(),
          );

          purchaseAllowance = Number((await swapContract.allowance(address, salesAddress)).toString());
          console.log("🚀 ~ file: OptionSlice.ts ~ line 102 ~ 11 purchaseAllowance", exerciseAllowance);

          underlyingBalance = Number(
            ethers.utils.formatUnits(BigNumber.from(await underlyingContract.balanceOf(address)), "ether"),
          );
          swapBalance = Number(
            ethers.utils.formatUnits(BigNumber.from(await swapContract.balanceOf(address)), "ether"),
          );
          optionUserBalance = Number(
            ethers.utils.formatUnits(BigNumber.from(await optionERC20Contract.balanceOf(address)), "ether"),
          );
          console.log("🚀 ~ file: OptionSlice.ts ~ line 112 ~ optionUserBalance", optionAvailableBalance);
        } catch (e) {
          console.log("🚀 ~ file: OptionSlice.ts ~ line 85 ~ e", e);
        }
      }

      console.log("🚀 ~ file: OptionSlice.ts ~ line 102 ~ optionAvailableBalance", optionAvailableBalance);
      return {
        optionID,
        option,
        marketPrice,
        optionPrice,
        priceSwapAsset,
        priceUnderlying,
        expiryTime,
        swapAssetAmt,
        underlyingAmt,
        optionTotalBalance,
        optionAvailableBalance,
        optionUserBalance,
        purchaseAllowance,
        exerciseAllowance,
        optionERC20Symbol,
        underlyingSymbol,
        swapSymbol,
      };
    } catch (e) {
      console.log("🚀 ~ file: OptionSlice.ts ~ line 129 ~ e", e);
    }
    return {
      optionID: 0,
      option,
      marketPrice: 0,
      optionPrice: 0,
      priceSwapAsset: 0,
      priceUnderlying: 0,
      expiryTime: "",
      swapAssetAmt: 0,
      underlyingAmt: 0,
      optionTotalBalance: 0,
      optionAvailableBalance: 0,
      optionUserBalance: 0,
      purchaseAllowance: 0,
      exerciseAllowance: 0,
      optionERC20Symbol: "",
      underlyingSymbol: "",
      swapSymbol: "",
    };
  },
);
export interface ISelectedOption {
  option: any;
}
export const setSelected = createAsyncThunk("optioning/setSelected", async (value: any): Promise<ISelectedOption> => {
  return value;
});

interface IOptionSlice {
  status: string;
  [key: string]: any;
}
const initialState: IOptionSlice = {
  status: "idle",
  allOptions: {},
  selectedOption: undefined,
};

export const changeApproval = createAsyncThunk(
  "option/changeApproval",
  async ({ address, type, option, provider, networkID }: IApproveOptionAsyncThunk, { dispatch }) => {
    const subOption = option?.option;
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    let tokenContract;
    console.log("🚀 ~ file: OptionSlice.ts ~ line 186 ~ token", type);
    let approveTx;
    try {
      const salesAddress = addresses[networkID].SALES_CONTRACT;
      if (type == "Purchase") {
        try {
          const salesContract = subOption.getSalesContract(salesAddress, provider);
          const buyTokenAddress = await salesContract.sales(subOption.optionId);
          tokenContract = subOption.getSwapContract(buyTokenAddress.buyToken, provider.getSigner());
          console.log("🚀 ~ file: OptionSlice.ts ~ line 204 ~ tokenContract", tokenContract);
          console.log("🚀 ~ file: OptionSlice.ts ~ line 204 ~ buyTokenAddress.buyToken", buyTokenAddress.buyToken);

          // const optionContainer = subOption.getContainerContract(networkID, provider);
          // const swapAsset = await optionContainer.swapAsset();
          // tokenContract = subOption.getUnderlyingContract(swapAsset, provider.getSigner());
          approveTx = await tokenContract.approve(
            salesAddress,
            ethers.utils.parseUnits("100000000000", "ether").toString(),
          );
        } catch (e) {
          console.log("🚀 ~ file: OptionSlice.ts ~ line 145 ~ e", e);
        }
      } else {
        const optionContainer = subOption.getContainerContract(networkID, provider);
        const swapAsset = await optionContainer.swapAsset();
        tokenContract = subOption.getSwapContract(swapAsset, provider.getSigner());
        approveTx = await tokenContract.approve(
          subOption.networkAddrs[networkID].optionContact,
          ethers.utils.parseUnits("100000000000", "ether").toString(),
        );
        // tokenContract = subOption.getERC20Contract(networkID, provider.getSigner());
      }
      console.log("🚀 ~ file: OptionSlice.ts ~ line 142 ~ tokenContract", tokenContract);

      // let purchaseAllowance = await tokenContract.allowance(address, salesAddress);
      // console.log("🚀 ~ file: OptionSlice.ts ~ line 199 ~ purchaseAllowance", purchaseAllowance);
      // if (purchaseAllowance.gt(BigNumber.from("0"))) {
      //   console.log("🚀 ~ file: OptionSlice.ts ~ line 200 ~ purchaseAllowance", purchaseAllowance);
      //   dispatch(info("Approval completed."));
      //   return;
      // }

      dispatch(
        fetchPendingTxns({
          txnHash: approveTx.hash,
          text: "Approving " + subOption.optionName,
          type: "approve_" + subOption.name,
        }),
      );
      await approveTx.wait();
    } catch (e: unknown) {
      console.log("🚀 ~ file: OptionSlice.ts ~ line 224 ~ e", e);
      dispatch(error((e as IJsonRPCError).message));
    } finally {
      if (approveTx) {
        dispatch(
          calcOptionDetails({
            option: subOption,
            provider,
            networkID,
            address,
          }),
        );
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }
  },
);

export const buyOption = createAsyncThunk(
  "option/buyOption",
  async ({ address, type, optionValue, option, provider, networkID }: IABuyOptionAsyncThunk, { dispatch }) => {
    // const value = BigInt(+optionValue * 10 ** 18);
    // console.log("🚀 ~ file: OptionSlice.ts ~ line 246 ~ value", value);
    const signer = provider.getSigner();
    const subOption = option?.option;
    let buyOptionTxt;

    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    console.log(
      "🚀 ~ file: OptionSlice.ts ~ line 268 ~ ",
      type,
      ethers.utils.parseUnits(optionValue.toString(), "ether").toString(),
    );
    try {
      if (type == "Purchase") {
        const salesContract = await subOption?.getSalesContract(addresses[networkID].SALES_CONTRACT, signer);
        buyOptionTxt = await salesContract.purchaseTokens(
          subOption.optionId.toString(),
          ethers.utils.parseUnits(optionValue.toString(), "ether").toString(),
        );
        console.log("🚀 ~ file: OptionSlice.ts ~ line 265 ~ buyOptionTxt", buyOptionTxt);
      } else {
        const erc20Contract = await subOption?.getERC20Contract(networkID, signer);
        buyOptionTxt = await erc20Contract.excerciseOptions(
          ethers.utils.parseUnits(optionValue.toString(), "ether").toString(),
        );
      }
    } catch (e: any) {
      console.log("🚀 ~ file: OptionSlice.ts ~ line 270 ~ e", e);
      dispatch(error(e?.data.message));
    } finally {
      if (buyOptionTxt) {
        dispatch(
          calcOptionDetails({
            option: subOption,
            provider,
            networkID,
            address,
          }),
        );
        dispatch(clearPendingTxn(buyOptionTxt.hash));
      }
    }
  },
);
const setOptionState = async (state: IOptionSlice, payload: any) => {
  const option = payload.option;
  const newState = { ...state[option], ...payload };
  state[option] = newState;
  state.allOptions = { ...state.allOptions, [option.optionId]: { ...newState } };
  state.loading = false;
};

const optioningSlice = createSlice({
  name: "optioning",
  initialState,
  reducers: {
    fetchOptionSuccess(state, action) {
      state[action.payload.option] = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(calcOptionDetails.pending, state => {
        state.loading = true;
      })
      .addCase(calcOptionDetails.fulfilled, (state, action) => {
        setOptionState(state, action.payload);
        state.loading = false;
      })
      .addCase(setSelected.fulfilled, (state, action) => {
        state.selectedOption = action.payload;
        state.loading = false;
      })
      .addCase(calcOptionDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error("OPTION ERROR => ", error);
      });
  },
});
// export const changeOptionPurchase = createAsyncThunk(
//   "wrap/changeWrap",
//   async ({ action, value, provider, address, networkID }: IActionValueAsyncThunk, { dispatch }) => {
//     if (!provider) {
//       dispatch(error("Please connect your wallet!"));
//       return;
//     }

//     const signer = provider.getSigner();
//     const wsmushContract = new ethers.Contract(addresses[networkID].WSMUSH_ADDRESS as string, wsOHM, signer) as WsOHM;
//     console.log(`🚀 - value`, value);
//     try {
//       console.log("🚀 - value" + "DONE");
//       console.log(`🚀 - value`, ethers.utils.parseUnits(value, 18));
//     } catch (e) {
//       console.log("🚀 - value" + e);
//     }
//     let wrapTx;
//     let uaData: IUAData = {
//       address: address,
//       value: value,
//       approved: true,
//       txHash: null,
//       type: null,
//     };

//     try {
//       if (action === "wrap") {
//         uaData.type = "wrap";
//         wrapTx = await wsmushContract.wrap(ethers.utils.parseUnits(value, "gwei"));
//       } else {
//         uaData.type = "unwrap";
//         wrapTx = await wsmushContract.unwrap(ethers.utils.parseUnits(value, 18));
//       }
//       const pendingTxnType = action === "wrap" ? "wrapping" : "unwrapping";
//       uaData.txHash = wrapTx.hash;
//       dispatch(fetchPendingTxns({ txnHash: wrapTx.hash, text: getWrappingTypeText(action), type: pendingTxnType }));
//       await wrapTx.wait();
//     } catch (e: unknown) {
//       console.log(`🚀 - value`, e);
//       uaData.approved = false;
//       const rpcError = e as IJsonRPCError;
//       if (rpcError.code === -32603 && rpcError.message.indexOf("ds-math-sub-underflow") >= 0) {
//         dispatch(
//           error("You may be trying to wrap more than your balance! Error code: 32603. Message: ds-math-sub-underflow"),
//         );
//       } else {
//         dispatch(error(rpcError.message));
//       }
//       return;
//     } finally {
//       if (wrapTx) {
//         // segmentUA(uaData);

//         dispatch(clearPendingTxn(wrapTx.hash));
//       }
//     }
//     dispatch(getBalances({ address, networkID, provider }));
//   },
// );

export default optioningSlice.reducer;
