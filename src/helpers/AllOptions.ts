import { StableOption, NetworkID } from "src/lib/Option";
import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
// import { ReactComponent as Option1Icon } from "src/helpers/optionAssets/item-icon.svg";
import { abi as optionABI } from "src/abi/OptionERC20.json";
import { abi as optionContainerABI } from "src/abi/OptionContainer.json";
import Option1Icon from "src/assets/tokens/FTO-ETH.png";
import Option1DailogIcon from "src/assets/tokens/FTO-ETH-DAI.png";
// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a option

export const fto = new StableOption({
  name: "fto",
  optionId: 1,
  optionName: "FTO-ETH",
  optionIcon: Option1Icon,
  OptionDailogIcon: Option1DailogIcon,
  underlyingAsset: "FTO",
  isRef: true,
  optionHelper: false,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  optionIconSvg: DaiImg,
  optionABI: optionABI,
  optionContainerABI: optionContainerABI,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      optionContact: "0x8a8749c2FD74EB3ee4bF0B5fda6Edc862ce8653F",
      optionContainer: "0x8b14890ad25be9ac2bf9ef47130a0adb890bcebf",
    },
    [NetworkID.Testnet]: {
      optionContact: "0x8a8749c2FD74EB3ee4bF0B5fda6Edc862ce8653F", //OptionERC20
      optionContainer: "0x8b14890ad25be9ac2bf9ef47130a0adb890bcebf", //OptionContainer
    },
  },
});
export const fto1 = new StableOption({
  name: "fto1",
  optionId: 2,
  optionName: "FTO-ETH",
  optionIcon: Option1Icon,
  OptionDailogIcon: Option1DailogIcon,
  underlyingAsset: "FTO",
  isRef: true,
  optionHelper: false,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  optionIconSvg: DaiImg,
  optionABI: optionABI,
  optionContainerABI: optionContainerABI,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      optionContact: "0x94c69f765624DD3FB79B3fd1D9d984E2F1143359",
      optionContainer: "0xcaA758d5459c721AEb60e2c2168aeb6F4560FcC7",
    },
    [NetworkID.Testnet]: {
      optionContact: "0x94c69f765624DD3FB79B3fd1D9d984E2F1143359", //OptionERC20
      optionContainer: "0xcaA758d5459c721AEb60e2c2168aeb6F4560FcC7", //OptionContainer
    },
  },
});
export const fto2 = new StableOption({
  name: "fto1",
  optionId: 3,
  optionName: "FTO-ETH",
  optionIcon: Option1Icon,
  OptionDailogIcon: Option1DailogIcon,
  underlyingAsset: "FTO",
  isRef: true,
  optionHelper: false,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  optionIconSvg: DaiImg,
  optionABI: optionABI,
  optionContainerABI: optionContainerABI,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      optionContact: "0x8a8749c2FD74EB3ee4bF0B5fda6Edc862ce8653F",
      optionContainer: "0x8b14890ad25be9ac2bf9ef47130a0adb890bcebf",
    },
    [NetworkID.Testnet]: {
      optionContact: "0x8a8749c2FD74EB3ee4bF0B5fda6Edc862ce8653F", //OptionERC20
      optionContainer: "0x8b14890ad25be9ac2bf9ef47130a0adb890bcebf", //OptionContainer
    },
  },
});

//! The below is the only option for the production and the above options are for testing in mainnet
export const allOptions = [fto1];

// // TODO (appleseed-expiredOptions): there may be a smarter way to refactor this
export const allExpiredOptions = [];
// export const allOptionsMap = allOptions.reduce((prevVal, option) => {
//   if (option) return { ...prevVal, [option.name]: option };
//   return { ...prevVal };
// }, {});

// // Debug Log
// // console.log(allOptionsMap);
export default allOptions;
