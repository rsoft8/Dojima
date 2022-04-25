import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import allOptions, { allExpiredOptions } from "src/helpers/AllOptions";
import { IUserOptionDetails } from "src/slices/AccountSlice";
import { Option } from "src/lib/Option";
import { IOptionDetails } from "src/slices/OptionSlice";

interface IOptioningStateView {
  account: {
    options: {
      [key: string]: IUserOptionDetails;
    };
  };
  optioning: {
    loading: Boolean;
    [key: string]: any;
  };
}

// Smash all the interfaces together to get the OptionData Type
interface IAllOptionData extends Option, IOptionDetails, IUserOptionDetails {}

const initialOptionArray = allOptions;
const initialExpiredArray = allExpiredOptions;
// Slaps together option data within the account & optioning states
function useOptions(chainID: number) {
  const optionLoading = useSelector((state: IOptioningStateView) => !state.optioning.loading);
  const optionState = useSelector((state: IOptioningStateView) => state.optioning);
  const accountOptionsState = useSelector((state: IOptioningStateView) => state.account.options);
  const [options, setOptions] = useState<Option[] | IAllOptionData[]>(initialOptionArray);
  const [expiredOptions, setExpiredOptions] = useState<Option[] | IAllOptionData[]>(initialExpiredArray);

  useEffect(() => {
    let optionDetails: IAllOptionData[];
    optionDetails = allOptions
      .flatMap(option => {
        if (optionState[option.name] && optionState[option.name].optionDiscount) {
          return Object.assign(option, optionState[option.name]); // Keeps the object type
        }
        return option;
      })
      .flatMap(option => {
        if (accountOptionsState[option.name]) {
          return Object.assign(option, accountOptionsState[option.name]);
        }
        return option;
      });

    const mostProfitableOptions = optionDetails.concat().sort((a, b) => {
      if (a.getAvailability(chainID) === false) return 1;
      if (b.getAvailability(chainID) === false) return -1;
      return a["optionPrice"] > b["optionPrice"] ? -1 : b["optionPrice"] > a["optionPrice"] ? 1 : 0;
    });
    setOptions(mostProfitableOptions);

    // TODO (appleseed-expiredOptions): there may be a smarter way to refactor this
    // let expiredDetails: IAllOptionData[];
    // expiredDetails = allExpiredOptions
    //   .flatMap(option => {
    //     if (optionState[option.name] && optionState[option.name].optionDiscount) {
    //       return Object.assign(option, optionState[option.name]); // Keeps the object type
    //     }
    //     return option;
    //   })
    //   .flatMap(option => {
    //     if (accountOptionsState[option.name]) {
    //       return Object.assign(option, accountOptionsState[option.name]);
    //     }
    //     return option;
    //   });
    // setExpiredOptions(expiredDetails);
  }, [optionState, accountOptionsState, optionLoading]);

  // Debug Log:
  // console.log(options);
  return { options, loading: optionLoading, expiredOptions };
}

export default useOptions;
