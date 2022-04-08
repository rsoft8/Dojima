import { ThemeProvider } from "@material-ui/core/styles";
import { useEffect, useState, useMemo } from "react";
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

const drawerWidth = 280;
const transitionDuration = 969;

const useStyles = makeStyles((theme) => ({
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
  const isSmallerScreen = useMediaQuery("(max-width: 980px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const [theme, toggleTheme, mounted] = useTheme();
  let themeMode = lightTheme;
  useEffect(() => {
    themeMode = lightTheme;
  }, [theme]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <div
        className={`app ${isSmallerScreen && "tablet"} ${
          isSmallScreen && "mobile"
        } ${theme}`}
      >
        <TopBar
          theme={theme}
          toggleTheme={toggleTheme}
          handleDrawerToggle={handleDrawerToggle}
        />
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
