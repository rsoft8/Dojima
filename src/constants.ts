export const BLOCK_RATE_SECONDS = 1;
export const MARKET_PRICE_API = `https://api.robo-vault.com/prices`;
interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  250: {
    OPTION_ER: "0x8a8749c2FD74EB3ee4bF0B5fda6Edc862ce8653F",
    OPTION_CONTAINER: "0x8b14890ad25be9ac2bf9ef47130a0adb890bcebf",
    SALES_CONTRACT: "0xde8ce1dbdccb4a2fd9615cb7c49981f993107286",
  },

  4002: {
    OPTION_ER: "0x8a8749c2FD74EB3ee4bF0B5fda6Edc862ce8653F",
    OPTION_CONTAINER: "0x8b14890ad25be9ac2bf9ef47130a0adb890bcebf",
    SALES_CONTRACT: "0xde8ce1dbdccb4a2fd9615cb7c49981f993107286",
  },
  //0x48a22058710f18a954fC1cAd8Da4fDeC2D593B67
};
