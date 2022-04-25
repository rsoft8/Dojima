import { addresses } from "src/constants";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Option } from "src/lib/Option";

export enum NetworkID {
  Mainnet = 250,
  Testnet = 4002,
}

export interface IBaseAsyncThunk {
  readonly networkID: NetworkID;
  readonly provider: StaticJsonRpcProvider | JsonRpcProvider;
}
export interface IBaseOptionAsyncThunk extends IBaseAsyncThunk {
  readonly option: any;
}

export interface ICalcOptionDetailsAsyncThunk extends IBaseOptionAsyncThunk {
  readonly address: string;
}
export interface IOptionDetailsAsyncThunk extends IBaseOptionAsyncThunk {
  readonly value: string;
}
export interface IChangeApprovalAsyncThunk extends IBaseAsyncThunk {
  readonly token: string;
  readonly address: string;
}
export interface IJsonRPCError {
  readonly message: string;
  readonly code: number;
  readonly data: {
    readonly message: string;
  };
}
export interface IApproveOptionAsyncThunk extends IBaseOptionAsyncThunk {
  readonly address: string;
  readonly token: string;
}
export interface IABuyOptionAsyncThunk extends IBaseOptionAsyncThunk {
  readonly type: string;
  readonly optionValue: string;
}
