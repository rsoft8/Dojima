/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface EthContractInterface extends utils.Interface {
  functions: {
    "DAO()": FunctionFragment;
    "RA()": FunctionFragment;
    "adjustment()": FunctionFragment;
    "assetPrice()": FunctionFragment;
    "optionInfo(address)": FunctionFragment;
    "optionPrice()": FunctionFragment;
    "optionPriceInUSD()": FunctionFragment;
    "currentDebt()": FunctionFragment;
    "debtDecay()": FunctionFragment;
    "debtRatio()": FunctionFragment;
    "deposit(uint256,uint256,address)": FunctionFragment;
    "initializeOptionTerms(uint256,uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "lastDecay()": FunctionFragment;
    "maxPayout()": FunctionFragment;
    "payoutFor(uint256)": FunctionFragment;
    "pendingPayoutFor(address)": FunctionFragment;
    "percentVestedFor(address)": FunctionFragment;
    "policy()": FunctionFragment;
    "principle()": FunctionFragment;
    "pullManagement()": FunctionFragment;
    "pushManagement(address)": FunctionFragment;
    "recoverLostToken(address)": FunctionFragment;
    "redeem(address,bool)": FunctionFragment;
    "referrerShare()": FunctionFragment;
    "renounceManagement()": FunctionFragment;
    "setAdjustment(bool,uint256,uint256,uint256)": FunctionFragment;
    "setOptionTerms(uint8,uint256)": FunctionFragment;
    "setReferralShare(uint256)": FunctionFragment;
    "setStaking(address,bool)": FunctionFragment;
    "staking()": FunctionFragment;
    "stakingHelper()": FunctionFragment;
    "standardizedDebtRatio()": FunctionFragment;
    "terms()": FunctionFragment;
    "totalDebt()": FunctionFragment;
    "treasury()": FunctionFragment;
    "useHelper()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "DAO", values?: undefined): string;
  encodeFunctionData(functionFragment: "RA", values?: undefined): string;
  encodeFunctionData(functionFragment: "adjustment", values?: undefined): string;
  encodeFunctionData(functionFragment: "assetPrice", values?: undefined): string;
  encodeFunctionData(functionFragment: "optionInfo", values: [string]): string;
  encodeFunctionData(functionFragment: "optionPrice", values?: undefined): string;
  encodeFunctionData(functionFragment: "optionPriceInUSD", values?: undefined): string;
  encodeFunctionData(functionFragment: "currentDebt", values?: undefined): string;
  encodeFunctionData(functionFragment: "debtDecay", values?: undefined): string;
  encodeFunctionData(functionFragment: "debtRatio", values?: undefined): string;
  encodeFunctionData(functionFragment: "deposit", values: [BigNumberish, BigNumberish, string]): string;
  encodeFunctionData(
    functionFragment: "initializeOptionTerms",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "lastDecay", values?: undefined): string;
  encodeFunctionData(functionFragment: "maxPayout", values?: undefined): string;
  encodeFunctionData(functionFragment: "payoutFor", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "pendingPayoutFor", values: [string]): string;
  encodeFunctionData(functionFragment: "percentVestedFor", values: [string]): string;
  encodeFunctionData(functionFragment: "policy", values?: undefined): string;
  encodeFunctionData(functionFragment: "principle", values?: undefined): string;
  encodeFunctionData(functionFragment: "pullManagement", values?: undefined): string;
  encodeFunctionData(functionFragment: "pushManagement", values: [string]): string;
  encodeFunctionData(functionFragment: "recoverLostToken", values: [string]): string;
  encodeFunctionData(functionFragment: "redeem", values: [string, boolean]): string;
  encodeFunctionData(functionFragment: "referrerShare", values?: undefined): string;
  encodeFunctionData(functionFragment: "renounceManagement", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setAdjustment",
    values: [boolean, BigNumberish, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "setOptionTerms", values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: "setReferralShare", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "setStaking", values: [string, boolean]): string;
  encodeFunctionData(functionFragment: "staking", values?: undefined): string;
  encodeFunctionData(functionFragment: "stakingHelper", values?: undefined): string;
  encodeFunctionData(functionFragment: "standardizedDebtRatio", values?: undefined): string;
  encodeFunctionData(functionFragment: "terms", values?: undefined): string;
  encodeFunctionData(functionFragment: "totalDebt", values?: undefined): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(functionFragment: "useHelper", values?: undefined): string;

  decodeFunctionResult(functionFragment: "DAO", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "RA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "adjustment", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "assetPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "optionInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "optionPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "optionPriceInUSD", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "currentDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "debtDecay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "debtRatio", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initializeOptionTerms", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lastDecay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxPayout", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "payoutFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pendingPayoutFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "percentVestedFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "policy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "principle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pullManagement", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pushManagement", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "recoverLostToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "referrerShare", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "renounceManagement", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setAdjustment", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setOptionTerms", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setReferralShare", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setStaking", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "staking", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakingHelper", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "standardizedDebtRatio", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "terms", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "useHelper", data: BytesLike): Result;

  events: {
    "OptionCreated(uint256,uint256,uint256,uint256)": EventFragment;
    "OptionPriceChanged(uint256,uint256,uint256)": EventFragment;
    "OptionRedeemed(address,uint256,uint256)": EventFragment;
    "ControlVariableAdjustment(uint256,uint256,uint256,bool)": EventFragment;
    "OwnershipPulled(address,address)": EventFragment;
    "OwnershipPushed(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OptionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OptionPriceChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OptionRedeemed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ControlVariableAdjustment"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipPulled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipPushed"): EventFragment;
}

export type OptionCreatedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  {
    deposit: BigNumber;
    payout: BigNumber;
    expires: BigNumber;
    priceInUSD: BigNumber;
  }
>;

export type OptionCreatedEventFilter = TypedEventFilter<OptionCreatedEvent>;

export type OptionPriceChangedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { priceInUSD: BigNumber; internalPrice: BigNumber; debtRatio: BigNumber }
>;

export type OptionPriceChangedEventFilter = TypedEventFilter<OptionPriceChangedEvent>;

export type OptionRedeemedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { recipient: string; payout: BigNumber; remaining: BigNumber }
>;

export type OptionRedeemedEventFilter = TypedEventFilter<OptionRedeemedEvent>;

export type ControlVariableAdjustmentEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, boolean],
  {
    initialBCV: BigNumber;
    newBCV: BigNumber;
    adjustment: BigNumber;
    addition: boolean;
  }
>;

export type ControlVariableAdjustmentEventFilter = TypedEventFilter<ControlVariableAdjustmentEvent>;

export type OwnershipPulledEvent = TypedEvent<[string, string], { previousOwner: string; newOwner: string }>;

export type OwnershipPulledEventFilter = TypedEventFilter<OwnershipPulledEvent>;

export type OwnershipPushedEvent = TypedEvent<[string, string], { previousOwner: string; newOwner: string }>;

export type OwnershipPushedEventFilter = TypedEventFilter<OwnershipPushedEvent>;

export interface EthContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EthContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DAO(overrides?: CallOverrides): Promise<[string]>;

    RA(overrides?: CallOverrides): Promise<[string]>;

    adjustment(overrides?: CallOverrides): Promise<
      [boolean, BigNumber, BigNumber, BigNumber, BigNumber] & {
        add: boolean;
        rate: BigNumber;
        target: BigNumber;
        buffer: BigNumber;
        lastBlock: BigNumber;
      }
    >;

    assetPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    optionInfo(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        payout: BigNumber;
        vesting: BigNumber;
        lastBlock: BigNumber;
        pricePaid: BigNumber;
      }
    >;

    optionPrice(overrides?: CallOverrides): Promise<[BigNumber] & { price_: BigNumber }>;

    optionPriceInUSD(overrides?: CallOverrides): Promise<[BigNumber] & { price_: BigNumber }>;

    currentDebt(overrides?: CallOverrides): Promise<[BigNumber]>;

    debtDecay(overrides?: CallOverrides): Promise<[BigNumber] & { decay_: BigNumber }>;

    debtRatio(overrides?: CallOverrides): Promise<[BigNumber] & { debtRatio_: BigNumber }>;

    deposit(
      _amount: BigNumberish,
      _maxPrice: BigNumberish,
      _depositor: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    initializeOptionTerms(
      _controlVariable: BigNumberish,
      _vestingTerm: BigNumberish,
      _minimumPrice: BigNumberish,
      _maxPayout: BigNumberish,
      _maxDebt: BigNumberish,
      _initialDebt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    lastDecay(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxPayout(overrides?: CallOverrides): Promise<[BigNumber]>;

    payoutFor(_value: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    pendingPayoutFor(
      _depositor: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber] & { pendingPayout_: BigNumber }>;

    percentVestedFor(
      _depositor: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber] & { percentVested_: BigNumber }>;

    policy(overrides?: CallOverrides): Promise<[string]>;

    principle(overrides?: CallOverrides): Promise<[string]>;

    pullManagement(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    pushManagement(
      newOwner_: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    recoverLostToken(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    redeem(
      _recipient: string,
      _stake: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    referrerShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceManagement(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    setAdjustment(
      _addition: boolean,
      _increment: BigNumberish,
      _target: BigNumberish,
      _buffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    setOptionTerms(
      _parameter: BigNumberish,
      _input: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    setReferralShare(
      _referrerShare: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    setStaking(
      _staking: string,
      _helper: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    staking(overrides?: CallOverrides): Promise<[string]>;

    stakingHelper(overrides?: CallOverrides): Promise<[string]>;

    standardizedDebtRatio(overrides?: CallOverrides): Promise<[BigNumber]>;

    terms(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        controlVariable: BigNumber;
        vestingTerm: BigNumber;
        minimumPrice: BigNumber;
        maxPayout: BigNumber;
        maxDebt: BigNumber;
      }
    >;

    totalDebt(overrides?: CallOverrides): Promise<[BigNumber]>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    useHelper(overrides?: CallOverrides): Promise<[boolean]>;
  };

  DAO(overrides?: CallOverrides): Promise<string>;

  RA(overrides?: CallOverrides): Promise<string>;

  adjustment(overrides?: CallOverrides): Promise<
    [boolean, BigNumber, BigNumber, BigNumber, BigNumber] & {
      add: boolean;
      rate: BigNumber;
      target: BigNumber;
      buffer: BigNumber;
      lastBlock: BigNumber;
    }
  >;

  assetPrice(overrides?: CallOverrides): Promise<BigNumber>;

  optionInfo(
    arg0: string,
    overrides?: CallOverrides,
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      payout: BigNumber;
      vesting: BigNumber;
      lastBlock: BigNumber;
      pricePaid: BigNumber;
    }
  >;

  optionPrice(overrides?: CallOverrides): Promise<BigNumber>;

  optionPriceInUSD(overrides?: CallOverrides): Promise<BigNumber>;

  currentDebt(overrides?: CallOverrides): Promise<BigNumber>;

  debtDecay(overrides?: CallOverrides): Promise<BigNumber>;

  debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

  deposit(
    _amount: BigNumberish,
    _maxPrice: BigNumberish,
    _depositor: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  initializeOptionTerms(
    _controlVariable: BigNumberish,
    _vestingTerm: BigNumberish,
    _minimumPrice: BigNumberish,
    _maxPayout: BigNumberish,
    _maxDebt: BigNumberish,
    _initialDebt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  lastDecay(overrides?: CallOverrides): Promise<BigNumber>;

  maxPayout(overrides?: CallOverrides): Promise<BigNumber>;

  payoutFor(_value: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  pendingPayoutFor(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;

  percentVestedFor(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;

  policy(overrides?: CallOverrides): Promise<string>;

  principle(overrides?: CallOverrides): Promise<string>;

  pullManagement(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  pushManagement(
    newOwner_: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  recoverLostToken(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  //TODO: Option Contract change : Below in old contracts there were recipient address that were being passed and in new one they are not passed
  redeem(
    // _recipient: string,
    _stake: boolean,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  referrerShare(overrides?: CallOverrides): Promise<BigNumber>;

  renounceManagement(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  setAdjustment(
    _addition: boolean,
    _increment: BigNumberish,
    _target: BigNumberish,
    _buffer: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  setOptionTerms(
    _parameter: BigNumberish,
    _input: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  setReferralShare(
    _referrerShare: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  setStaking(
    _staking: string,
    _helper: boolean,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  staking(overrides?: CallOverrides): Promise<string>;

  stakingHelper(overrides?: CallOverrides): Promise<string>;

  standardizedDebtRatio(overrides?: CallOverrides): Promise<BigNumber>;

  terms(overrides?: CallOverrides): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      controlVariable: BigNumber;
      vestingTerm: BigNumber;
      minimumPrice: BigNumber;
      maxPayout: BigNumber;
      maxDebt: BigNumber;
    }
  >;

  totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

  treasury(overrides?: CallOverrides): Promise<string>;

  useHelper(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    DAO(overrides?: CallOverrides): Promise<string>;

    RA(overrides?: CallOverrides): Promise<string>;

    adjustment(overrides?: CallOverrides): Promise<
      [boolean, BigNumber, BigNumber, BigNumber, BigNumber] & {
        add: boolean;
        rate: BigNumber;
        target: BigNumber;
        buffer: BigNumber;
        lastBlock: BigNumber;
      }
    >;

    assetPrice(overrides?: CallOverrides): Promise<BigNumber>;

    optionInfo(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        payout: BigNumber;
        vesting: BigNumber;
        lastBlock: BigNumber;
        pricePaid: BigNumber;
      }
    >;

    optionPrice(overrides?: CallOverrides): Promise<BigNumber>;

    optionPriceInUSD(overrides?: CallOverrides): Promise<BigNumber>;

    currentDebt(overrides?: CallOverrides): Promise<BigNumber>;

    debtDecay(overrides?: CallOverrides): Promise<BigNumber>;

    debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      _amount: BigNumberish,
      _maxPrice: BigNumberish,
      _depositor: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    initializeOptionTerms(
      _controlVariable: BigNumberish,
      _vestingTerm: BigNumberish,
      _minimumPrice: BigNumberish,
      _maxPayout: BigNumberish,
      _maxDebt: BigNumberish,
      _initialDebt: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    lastDecay(overrides?: CallOverrides): Promise<BigNumber>;

    maxPayout(overrides?: CallOverrides): Promise<BigNumber>;

    payoutFor(_value: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    pendingPayoutFor(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;

    percentVestedFor(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;

    policy(overrides?: CallOverrides): Promise<string>;

    principle(overrides?: CallOverrides): Promise<string>;

    pullManagement(overrides?: CallOverrides): Promise<void>;

    pushManagement(newOwner_: string, overrides?: CallOverrides): Promise<void>;

    recoverLostToken(_token: string, overrides?: CallOverrides): Promise<boolean>;

    redeem(_recipient: string, _stake: boolean, overrides?: CallOverrides): Promise<BigNumber>;

    referrerShare(overrides?: CallOverrides): Promise<BigNumber>;

    renounceManagement(overrides?: CallOverrides): Promise<void>;

    setAdjustment(
      _addition: boolean,
      _increment: BigNumberish,
      _target: BigNumberish,
      _buffer: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    setOptionTerms(_parameter: BigNumberish, _input: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setReferralShare(_referrerShare: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setStaking(_staking: string, _helper: boolean, overrides?: CallOverrides): Promise<void>;

    staking(overrides?: CallOverrides): Promise<string>;

    stakingHelper(overrides?: CallOverrides): Promise<string>;

    standardizedDebtRatio(overrides?: CallOverrides): Promise<BigNumber>;

    terms(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        controlVariable: BigNumber;
        vestingTerm: BigNumber;
        minimumPrice: BigNumber;
        maxPayout: BigNumber;
        maxDebt: BigNumber;
      }
    >;

    totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<string>;

    useHelper(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    "OptionCreated(uint256,uint256,uint256,uint256)"(
      deposit?: null,
      payout?: BigNumberish | null,
      expires?: BigNumberish | null,
      priceInUSD?: BigNumberish | null,
    ): OptionCreatedEventFilter;
    OptionCreated(
      deposit?: null,
      payout?: BigNumberish | null,
      expires?: BigNumberish | null,
      priceInUSD?: BigNumberish | null,
    ): OptionCreatedEventFilter;

    "OptionPriceChanged(uint256,uint256,uint256)"(
      priceInUSD?: BigNumberish | null,
      internalPrice?: BigNumberish | null,
      debtRatio?: BigNumberish | null,
    ): OptionPriceChangedEventFilter;
    OptionPriceChanged(
      priceInUSD?: BigNumberish | null,
      internalPrice?: BigNumberish | null,
      debtRatio?: BigNumberish | null,
    ): OptionPriceChangedEventFilter;

    "OptionRedeemed(address,uint256,uint256)"(
      recipient?: string | null,
      payout?: null,
      remaining?: null,
    ): OptionRedeemedEventFilter;
    OptionRedeemed(recipient?: string | null, payout?: null, remaining?: null): OptionRedeemedEventFilter;

    "ControlVariableAdjustment(uint256,uint256,uint256,bool)"(
      initialBCV?: null,
      newBCV?: null,
      adjustment?: null,
      addition?: null,
    ): ControlVariableAdjustmentEventFilter;
    ControlVariableAdjustment(
      initialBCV?: null,
      newBCV?: null,
      adjustment?: null,
      addition?: null,
    ): ControlVariableAdjustmentEventFilter;

    "OwnershipPulled(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipPulledEventFilter;
    OwnershipPulled(previousOwner?: string | null, newOwner?: string | null): OwnershipPulledEventFilter;

    "OwnershipPushed(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipPushedEventFilter;
    OwnershipPushed(previousOwner?: string | null, newOwner?: string | null): OwnershipPushedEventFilter;
  };

  estimateGas: {
    DAO(overrides?: CallOverrides): Promise<BigNumber>;

    RA(overrides?: CallOverrides): Promise<BigNumber>;

    adjustment(overrides?: CallOverrides): Promise<BigNumber>;

    assetPrice(overrides?: CallOverrides): Promise<BigNumber>;

    optionInfo(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    optionPrice(overrides?: CallOverrides): Promise<BigNumber>;

    optionPriceInUSD(overrides?: CallOverrides): Promise<BigNumber>;

    currentDebt(overrides?: CallOverrides): Promise<BigNumber>;

    debtDecay(overrides?: CallOverrides): Promise<BigNumber>;

    debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      _amount: BigNumberish,
      _maxPrice: BigNumberish,
      _depositor: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    initializeOptionTerms(
      _controlVariable: BigNumberish,
      _vestingTerm: BigNumberish,
      _minimumPrice: BigNumberish,
      _maxPayout: BigNumberish,
      _maxDebt: BigNumberish,
      _initialDebt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    lastDecay(overrides?: CallOverrides): Promise<BigNumber>;

    maxPayout(overrides?: CallOverrides): Promise<BigNumber>;

    payoutFor(_value: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    pendingPayoutFor(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;

    percentVestedFor(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;

    policy(overrides?: CallOverrides): Promise<BigNumber>;

    principle(overrides?: CallOverrides): Promise<BigNumber>;

    pullManagement(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    pushManagement(newOwner_: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    recoverLostToken(_token: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    redeem(
      _recipient: string,
      _stake: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    referrerShare(overrides?: CallOverrides): Promise<BigNumber>;

    renounceManagement(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    setAdjustment(
      _addition: boolean,
      _increment: BigNumberish,
      _target: BigNumberish,
      _buffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    setOptionTerms(
      _parameter: BigNumberish,
      _input: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    setReferralShare(
      _referrerShare: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    setStaking(
      _staking: string,
      _helper: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    staking(overrides?: CallOverrides): Promise<BigNumber>;

    stakingHelper(overrides?: CallOverrides): Promise<BigNumber>;

    standardizedDebtRatio(overrides?: CallOverrides): Promise<BigNumber>;

    terms(overrides?: CallOverrides): Promise<BigNumber>;

    totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    useHelper(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    DAO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    RA(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    adjustment(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    assetPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    optionInfo(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    optionPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    optionPriceInUSD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentDebt(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    debtDecay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    debtRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      _amount: BigNumberish,
      _maxPrice: BigNumberish,
      _depositor: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    initializeOptionTerms(
      _controlVariable: BigNumberish,
      _vestingTerm: BigNumberish,
      _minimumPrice: BigNumberish,
      _maxPayout: BigNumberish,
      _maxDebt: BigNumberish,
      _initialDebt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    lastDecay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxPayout(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payoutFor(_value: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingPayoutFor(_depositor: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    percentVestedFor(_depositor: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    policy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    principle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pullManagement(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    pushManagement(
      newOwner_: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    recoverLostToken(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    redeem(
      _recipient: string,
      _stake: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    referrerShare(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceManagement(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    setAdjustment(
      _addition: boolean,
      _increment: BigNumberish,
      _target: BigNumberish,
      _buffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    setOptionTerms(
      _parameter: BigNumberish,
      _input: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    setReferralShare(
      _referrerShare: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    setStaking(
      _staking: string,
      _helper: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    staking(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakingHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    standardizedDebtRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    terms(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalDebt(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    useHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}