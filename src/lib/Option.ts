import { StaticJsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";
import { addresses } from "src/constants";
import { getTokenPrice } from "src/helpers";
import { EthContract, PairContract } from "src/typechain";
import React from "react";
import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { abi as SalesContractABI } from "src/abi/SalesContract.json";
import { abi as underlyingAssetABI } from "src/abi/underlyingAsset.json";
import { abi as swapAssetABI } from "src/abi/swapAsset.json";
export enum NetworkID {
  Mainnet = 250,
  Testnet = 4002,
}

export enum OptionType {
  StableAsset,
  LP,
}

export interface OptionAddresses {
  optionContact: string;
  optionContainer: string;
}

export interface NetworkAddresses {
  [NetworkID.Mainnet]: OptionAddresses;
  [NetworkID.Testnet]: OptionAddresses;
}

export interface Available {
  [NetworkID.Mainnet]?: boolean;
  [NetworkID.Testnet]?: boolean;
}

interface OptionOpts {
  name: string; // Internal name used for references
  optionId: number; // optionName on UI
  optionName: string; // optionName on UI
  optionIcon: React.ReactNode; // optionName on UI
  OptionDailogIcon: React.ReactNode; // optionName on UI
  isAvailable: Available; // set false to hide
  isRef: boolean;
  optionHelper: boolean;
  optionIconSvg: React.ReactNode; //  SVG path for icons
  optionABI: ethers.ContractInterface; // ABI for contract
  optionContainerABI: ethers.ContractInterface; // ABI for contract
  networkAddrs: NetworkAddresses; // Mapping of network --> Addresses
  underlyingAsset: string; // Unused, but native token to buy the option.
}

export abstract class Option {
  // Standard Option fields regardless of LP options or stable options.
  readonly name: string;
  readonly optionId: number;
  readonly optionName: string;
  readonly type: OptionType;
  readonly isAvailable: Available;
  readonly isRef: Boolean;
  readonly optionHelper: Boolean;
  readonly optionIconSvg: React.ReactNode;
  readonly optionContainerABI: ethers.ContractInterface; // Option ABI
  readonly optionABI: ethers.ContractInterface; // Option ABI
  readonly networkAddrs: NetworkAddresses;
  readonly underlyingAsset: string;
  readonly optionIcon: React.ReactNode;
  readonly OptionDailogIcon: React.ReactNode;

  // The following two fields will differ on how they are set depending on option type
  abstract isLP: Boolean;
  abstract reserveContract: ethers.ContractInterface; // Token ABI
  abstract displayUnits: string;

  // Async method that returns a Promise
  abstract getTreasuryBalance(networkID: NetworkID, provider: StaticJsonRpcProvider): Promise<number>;

  constructor(type: OptionType, optionOpts: OptionOpts) {
    this.name = optionOpts.name;
    this.optionName = optionOpts.optionName;
    this.optionId = optionOpts.optionId;
    this.type = type;
    this.isAvailable = optionOpts.isAvailable;
    this.isRef = optionOpts.isRef;
    this.optionHelper = optionOpts.optionHelper;
    this.optionIconSvg = optionOpts.optionIconSvg;
    this.optionABI = optionOpts.optionABI;
    this.optionContainerABI = optionOpts.optionContainerABI;
    this.networkAddrs = optionOpts.networkAddrs;
    this.underlyingAsset = optionOpts.underlyingAsset;
    this.optionIcon = optionOpts.optionIcon;
    this.OptionDailogIcon = optionOpts.OptionDailogIcon;
  }

  /**
   * makes isAvailable accessible within Options.ts
   * @param networkID
   * @returns boolean
   */
  getAvailability(networkID: NetworkID) {
    return this.isAvailable[networkID];
  }

  getAddressForOption(networkID: NetworkID) {
    return this.networkAddrs[networkID].optionContainer;
  }
  getContractForOption(networkID: NetworkID, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    const optionAddress = this.getAddressForOption(networkID);
    return new ethers.Contract(optionAddress, this.optionABI, provider);
  }
  getContainerContract(networkID: NetworkID, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    const optionAddress = this.getAddressForOption(networkID);
    return new ethers.Contract(optionAddress, this.optionContainerABI, provider);
  }

  getOptionContract(networkID: NetworkID) {
    console.log(this.networkAddrs, networkID, "net---");
    return this.networkAddrs[networkID].optionContact;
  }
  getERC20Contract(networkID: NetworkID, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    const optionAddress = this.getOptionContract(networkID);
    return new ethers.Contract(optionAddress, this.optionABI, provider) as PairContract;
  }
  getUnderlyingContract(optionAddress: any,   provider: StaticJsonRpcProvider | JsonRpcSigner) {
    return new ethers.Contract(optionAddress, underlyingAssetABI, provider) as PairContract;
  }
  getSalesContract(salesAddress: any, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    return new ethers.Contract(salesAddress, SalesContractABI, provider) as PairContract;
  }
  getSwapContract(swapAddress: any, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    return new ethers.Contract(swapAddress, swapAssetABI, provider) as PairContract;
  }

  // TODO (appleseed): improve this logic
  async getOptionReservePrice(networkID: NetworkID, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    let marketPrice: number;
    if (this.isLP) {
      const pairContract = this.getERC20Contract(networkID, provider);
      const reserves = await pairContract.getReserves();
      marketPrice = Number(reserves[1].toString()) / Number(reserves[0].toString()) / 10 ** 9;
    } else {
      marketPrice = await getTokenPrice("convex-finance");
    }
    return marketPrice;
  }
}

export interface StableOptionOpts extends OptionOpts {}

export class StableOption extends Option {
  readonly isLP = false;
  readonly isRef: Boolean;
  readonly optionHelper: Boolean;
  readonly reserveContract: ethers.ContractInterface;
  readonly displayUnits: string;

  constructor(stableOptionOpts: StableOptionOpts) {
    super(OptionType.StableAsset, stableOptionOpts);
    // For stable options the display units are the same as the actual token
    this.displayUnits = stableOptionOpts.optionName;
    this.reserveContract = ierc20Abi; // The Standard ierc20Abi since they're normal tokens
    this.isRef = stableOptionOpts.isRef;
    this.optionHelper = stableOptionOpts.optionHelper;
  }

  async getTreasuryBalance(networkID: NetworkID, provider: StaticJsonRpcProvider) {
    console.log(`TOKEN`);

    let token = this.getERC20Contract(networkID, provider);
    console.log(`erre`, token);
    let tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    return Number(tokenAmount.toString()) / Math.pow(10, 18);
  }
}
