import { ThemeProvider } from "@material-ui/core/styles";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useTheme from "./hooks/useTheme";
import { Home } from "./views";
import TopBar from "./components/TopBar/TopBar.jsx";
import Messages from "./components/Messages/Messages";
import NotFound from "./views/404/NotFound";
import { light as lightTheme } from "./themes/light.js";
import "./App.scss";
import NavDrawer from "./components/Sidebar/NavDrawer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useAddress, useWeb3Context } from "./hooks/web3Context";
import { useDispatch } from "react-redux";
import { loadAppDetails } from "./slices/AppSlices";
import useOptions from "./hooks/Options";
import { calcOptionDetails } from "./slices/OptionSlice";
import { shouldTriggerSafetyCheck } from "./helpers";
import { info } from "./slices/MessagesSlice";

const drawerWidth = 280;
const transitionDuration = 969;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: transitionDuration,
    }),
    height: "100%",
    overflow: "auto",
    marginLeft: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: transitionDuration,
    }),
    marginLeft: 0,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const [walletChecked, setWalletChecked] = useState(false);
  const isSmallerScreen = useMediaQuery("(max-width: 980px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const [theme, toggleTheme, mounted] = useTheme();
  const { connect, hasCachedProvider, provider, chainID, connected, uri } = useWeb3Context();
  console.log("🚀 ~ file: App.tsx ~ line 74 ~ App ~ provider", connected);
  const address = useAddress();
  const { options, expiredOptions } = useOptions(chainID);
  let themeMode = lightTheme;
  useEffect(() => {
    themeMode = lightTheme;
  }, [theme]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (hasCachedProvider()) {
      // then user DOES have a wallet
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      // then user DOES NOT have a wallet
      setWalletChecked(true);
    }
    if (shouldTriggerSafetyCheck()) {
      dispatch(info("Safety Check: Always verify you're on Fantom Dao!"));
    }
  }, []);

  async function loadDetails(whichDetails: string) {
    // NOTE (unbanksy): If you encounter the following error:
    // Unhandled Rejection (Error): call revert exception (method="balanceOf(address)", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.4.0)
    // it's because the initial provider loaded always starts with chainID=1. This causes
    // address lookup on the wrong chain which then throws the error. To properly resolve this,
    // we shouldn't be initializing to chainID=1 in web3Context without first listening for the
    // network. To actually test rinkeby, change setChainID equal to 4 before testing.

    // loadProvider._network.chainId = 250;

    if (whichDetails === "app") {
      loadApp(provider);
    }
  }

  useEffect(() => {
    if (connected) loadDetails("app");
  }, [connected, walletChecked]);

  const loadApp = useCallback(
    loadProvider => {
      console.log("🚀 ~ file: App.tsx ~ line 133 ~ App ~ loadProvider", loadProvider);
      dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));

      options.map((option: any) => {
        dispatch(
          calcOptionDetails({
            option,
            provider: loadProvider,
            networkID: chainID,
            address,
          }),
        );
      });
    },
    [connected],
  );

  return (
    <>
      <div className={`app ${isSmallerScreen && "tablet"} ${isSmallScreen && "mobile"} ${theme}`}>
        <Messages />
        <TopBar theme={theme} toggleTheme={toggleTheme} handleDrawerToggle={handleDrawerToggle} />
        {/* <nav className={classes.drawer}>
          {isSmallerScreen ? (
            <NavDrawer
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          ) : (
            <></> //<Sidebar />
          )}
        </nav> */}
        <div>
          <div className="app-content__container">
            <Switch>
              <Redirect from="/" to="/home" exact />
              <Route exact path="/home">
                <Home />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
