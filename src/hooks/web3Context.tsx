import React, { useState, ReactElement, useContext, useEffect, useMemo, useCallback } from "react";
import Web3Modal from "web3modal";
import { StaticJsonRpcProvider, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import { EnvHelper } from "../helpers/Environment";
import { NodeHelper } from "src/helpers/NodeHelper";

export enum NetworkID {
  // Mainnet = 56,
  // Testnet = 97,

  Mainnet = 250,
  Testnet = 4002,
}

/**
 * kept as function to mimic `getMainnetURI()`
 * @returns string
 */
function getTestnetURI() {
  return EnvHelper.alchemyTestnetURI;
}

/**
 * determine if in IFrame for Ledger Live
 */
function isIframe() {
  return false; //window.location !== window.parent.location;
}

const ALL_URIs = NodeHelper.getNodesUris();

/**
 * "intelligently" loadbalances production API Keys
 * @returns string
 */
function getMainnetURI(): string {
  // Shuffles the URIs for "intelligent" loadbalancing
  const allURIs = ALL_URIs.sort(() => Math.random() - 0.5);

  // There is no lightweight way to test each URL. so just return a random one.
  // if (workingURI !== undefined || workingURI !== "") return workingURI as string;
  const randomIndex = Math.floor(Math.random() * allURIs.length);
  return allURIs[randomIndex];
}

/*
  Types
*/
type onChainProvider = {
  connect: () => Promise<Web3Provider | undefined>;
  disconnect: () => void;
  hasCachedProvider: () => boolean;
  address: string;
  chainID: number;
  connected: boolean;
  provider: JsonRpcProvider;
  uri: string;
  web3Modal: Web3Modal;
};

export type Web3ContextData = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.",
    );
  }
  const { onChainProvider } = web3Context;
  return useMemo<onChainProvider>(() => {
    return { ...onChainProvider };
  }, [web3Context]);
};

export const useAddress = () => {
  const { address } = useWeb3Context();
  return address;
};

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  // NOTE (appleseed): if you are testing on rinkeby you need to set chainId === 4 as the default for non-connected wallet testing...
  // ... you also need to set getTestnetURI() as the default uri state below
  const [chainID, setChainID] = useState(NetworkID["Testnet"]);
  console.log("🚀 ~ file: web3Context.tsx ~ line 106 ~ NetworkID", NetworkID["Testnet"], chainID);
  const [address, setAddress] = useState("");

  // const [uri, setUri] = chainID === NetworkID["Testnet"] ? useState(getTestnetURI()) : useState(getMainnetURI());
  const [uri, setUri] =  useState(getTestnetURI());
  console.log("🚀 ~ file: web3Context.tsx ~ line 101 ~ uri", chainID, uri);
  const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider(uri));
  console.log("🚀 ~ file: web3Context.tsx ~ line 98 ~ provider 12", provider);

  const [web3Modal, setWeb3Modal] = useState<Web3Modal>(
    new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              250: getMainnetURI(),
              4002: getTestnetURI(),
            },
          },
        },
      },
    }),
  );

  const hasCachedProvider = (): boolean => {
    if (!web3Modal) return false;
    if (!web3Modal.cachedProvider) return false;
    return true;
  };

  // NOTE (appleseed): none of these listeners are needed for Backend API Providers
  // ... so I changed these listeners so that they only apply to walletProviders, eliminating
  // ... polling to the backend providers for network changes
  const _initListeners = useCallback(
    rawProvider => {
      if (!rawProvider.on) {
        return;
      }
      console.log("🚀 ~ file: web3Context.tsx ~ line 98 ~ provider1", provider);
      rawProvider.on("accountsChanged", async (accounts: string[]) => {
        console.log("🚀 ~ file: web3Context.tsx ~ line 139 ~ rawProvider.on ~ change 1");
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on("chainChanged", async (chain: number) => {
        _checkNetwork(chain);
        console.log("🚀 ~ file: web3Context.tsx ~ line 139 ~ rawProvider.on ~ change 2");
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on("network", (_newNetwork: any, oldNetwork: any) => {
        console.log("🚀 ~ file: web3Context.tsx ~ line 139 ~ rawProvider.on ~ change 3");
        if (!oldNetwork) return;
        window.location.reload();
      });
    },
    [provider],
  );

  /**
   * throws an error if networkID is not 1 (mainnet) or 4 (rinkeby)
   */
  const _checkNetwork = (otherChainID: number): boolean => {
    if (chainID !== otherChainID) {
      console.warn("You are switching networks");
      // if (otherChainID === 56 || otherChainID === 97) {
      //   setChainID(otherChainID);
      //   otherChainID === 56 ? setUri(getMainnetURI()) : setUri(getTestnetURI());
      //   return true;
      // }
      if (otherChainID === 250 || otherChainID === 4002) {
        setChainID(otherChainID);
        otherChainID === 250 ? setUri(getMainnetURI()) : setUri(getTestnetURI());
        return true;
      }
      return false;
    }
    return true;
  };

  // connect - only runs for WalletProviders
  const connect = useCallback(async () => {
    // handling Ledger Live;
    let rawProvider;
    console.log(`🚀 - connect - isIframe()`, isIframe());
    if (isIframe()) {
      rawProvider = new IFrameEthereumProvider();
    } else {
      rawProvider = await web3Modal.connect();
    }
    console.log("🚀 ~ file: web3Context.tsx ~ line 98 ~ provider 3", provider);

    // new _initListeners implementation matches Web3Modal Docs
    // ... see here: https://github.com/Web3Modal/web3modal/blob/2ff929d0e99df5edf6bb9e88cff338ba6d8a3991/example/src/App.tsx#L185
    _initListeners(rawProvider);
    const connectedProvider = new Web3Provider(rawProvider, "any");
    const chainId = await connectedProvider.getNetwork().then(network => network.chainId);
    const connectedAddress = await connectedProvider.getSigner().getAddress();
    const validNetwork = _checkNetwork(chainId);
    if (!validNetwork) {
      console.error("Wrong network, please switch to FANTOM mainnet");
      // console.error("Wrong network, please switch to BSC mainnet");
      return;
    }
    // Save everything after we've validated the right network.
    // Eventually we'll be fine without doing network validations.
    setAddress(connectedAddress);
    setProvider(connectedProvider);
    console.log("🚀 ~ file: web3Context.tsx ~ line 201 ~ connect ~ connectedProvider", connectedProvider);

    // Keep this at the bottom of the method, to ensure any repaints have the data we need
    setConnected(true);
    // window.location.reload();
    console.log("🚀 ~ file: web3Context.tsx ~ line 206 ~ connect ~ true", true);

    return connectedProvider;
  }, [provider, web3Modal, connected]);

  const disconnect = useCallback(async () => {
    console.log("disconnecting");
    web3Modal.clearCachedProvider();
    console.log("🚀 ~ file: web3Context.tsx ~ line 98 ~ provider 4", provider);
    setConnected(false);

    setTimeout(() => {
      window.location.reload();
    }, 1);
  }, [provider, web3Modal, connected]);

  const onChainProvider = useMemo<onChainProvider>(
    () => ({
      connect,
      disconnect,
      hasCachedProvider,
      provider,
      connected,
      address,
      chainID,
      web3Modal,
      uri,
    }),
    [connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal, uri],
  );

  useEffect(() => {
    // logs non-functioning nodes && returns an array of working mainnet nodes
    NodeHelper.checkAllNodesStatus().then((validNodes: any) => {
      validNodes = validNodes.filter((url: boolean | string) => url !== false);
      if (!validNodes.includes(uri) && NodeHelper.retryOnInvalid()) {
        // force new provider...
        setTimeout(() => {
          console.log("🚀 ~ file: web3Context.tsx ~ line 139 ~ rawProvider.on  5");
          window.location.reload();
        }, 1);
      }
    });
  }, []);

  return <Web3Context.Provider value={{ onChainProvider }}>{children}</Web3Context.Provider>;
};
