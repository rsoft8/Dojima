import { AppBar, Toolbar, Box, Button, SvgIcon, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import ConnectMenu from "./ConnectMenu.jsx";
import "./topbar.scss";
import green from "@material-ui/core/colors/green";
const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    height: "70px",
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("981")]: {
      display: "none",
    },
  },
}));

function TopBar({ theme, toggleTheme, handleDrawerToggle }) {
  const classes = useStyles();
  const isVerySmallScreen = useMediaQuery("(max-width: 355px)");
  return (
    <AppBar position="fixed" className={`${classes.appBar} white-bg`} elevation={0}>
      <Toolbar disableGutters className="dapp-topbar">
        <Box sx={{ flexGrow: 1 }} />
        <Box display="flex">
          <ConnectMenu theme={theme} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
