import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import externalUrls from "./externalUrls";
import StakeIcon from "../../assets/icons/stake.png";
import GlobeIcon from "../../assets/icons/globe.png";
import OptionIcon from "../../assets/icons/option.png";
import DashboardIcon from "../../assets/icons/dashboard.png";
import SpookyswapIcon from "../../assets/icons/spookyswap.png";
import WrapIcon from "../../assets/icons/wrap.png";

import { Trans } from "@lingui/macro";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import { Paper, Link, Box, Typography, Chip, useMediaQuery } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";
import AppLogo from "./app_logo.svg";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { chainID } = useWeb3Context();

  const isSmallerScreen = useMediaQuery("(max-width: 980px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("ido") >= 0 && page === "ido") {
      return true;
    }
    if (currentPath.indexOf("wrap") >= 0 && page === "wrap") {
      return true;
    }
    if (currentPath.indexOf("home") >= 0 && page === "home") {
      return true;
    }
    if (currentPath.indexOf("claim") >= 0 && page === "claim") {
      return true;
    }
    if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
      return true;
    }
    if ((currentPath.indexOf("options") >= 0 || currentPath.indexOf("choose_option") >= 0) && page === "options") {
      return true;
    }
    if (currentPath === "" || page === "home") {
      return true;
    }
    return false;
  }, []);
  return (
    <Paper className={`dapp-sidebar ${isSmallerScreen && "tablet"} ${isSmallScreen && "mobile"}`}>
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            {/* <Link href="https://olympusdao.finance" target="_blank">
              <SvgIcon
                color="primary"
                component={OlympusIcon}
                viewBox="0 0 151 100"
                style={{ minWdth: "151px", minHeight: "98px", width: "151px" }}
              />
            </Link> */}
            <Link className="logo" component={NavLink} to="/">
              <img src={AppLogo} />
              <Typography variant="h5">
                ROBO<span>VAULT</span>
              </Typography>
            </Link>

            {address && (
              <div className="wallet-link">
                <Link href={`https://ftmscan.com/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="stake-nav"
                to="/home"
                isActive={(match, location) => {
                  return checkPage(match, location, "home");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography component="span" variant="button">
                  <img src={StakeIcon} alt="Home" />
                  {/* <SvgIcon color="primary" component={StakeIcon} viewBox="0 0 23 23" /> */}
                  <Trans>Home</Trans>
                </Typography>
              </Link>
              <Link
                id="dash-nav"
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
                href="https://spookyswap.finance/add/0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E/0x59a1BffBbb1d7b5bd21A3495b0C85027C888cE78"
                //* To activate the link remove the onClick function
                onClick={e => e.preventDefault()}
                target="_blank"
              >
                <Typography component="span" variant="button">
                  <img src={SpookyswapIcon} alt="Buy" />
                  {/* <SvgIcon color="primary" component={BuyIcon} viewBox="0 0 22 20" /> */}
                  <Trans>Buy on SpookySwap</Trans>
                </Typography>
              </Link>
              <Link
                component={NavLink}
                id="claim-nav"
                to="/claim"
                isActive={(match, location) => {
                  return checkPage(match, location, "claim");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography component="span" variant="button">
                  <img src={StakeIcon} alt="Stake" />
                  {/* <SvgIcon color="primary" component={StakeIcon} viewBox="0 0 23 23" /> */}
                  <Trans>Claim</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="wrap-nav"
                to="/wrap"
                isActive={(match, location) => {
                  return checkPage(match, location, "wrap");
                }}
                //* To activate the link remove the onClick function
                onClick={e => e.preventDefault()}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography component="span" variant="button">
                  <img src={WrapIcon} alt="Wrap" />
                  {/* <SvgIcon color="primary" component={WrapIcon} viewBox="0 0 22 20" /> */}
                  <Trans>Wrap</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="option-nav"
                to="/options"
                isActive={(match, location) => {
                  return checkPage(match, location, "options");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography component="span" variant="button">
                  <img src={OptionIcon} alt="Option" />

                  {/* <SvgIcon color="primary" component={OptionIcon} viewBox="0 0 26 17" /> */}

                  <Trans>Option</Trans>
                  <Chip label="Discount" color="secondary" size="small" />
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="calc-nav"
                to="/calculator"
                isActive={(match, location) => {
                  return checkPage(match, location, "calculator");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography component="span" variant="button">
                  <img src={GlobeIcon} alt="Calculator" />
                  {/* <SvgIcon color="primary" component={GlobeIcon} viewBox="0 0 18 18" /> */}
                  <Trans>Calculator</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="ido-nav"
                to="/ido"
                isActive={(match, location) => {
                  return checkPage(match, location, "ido");
                }}
                //* To activate the link remove the onClick function
                onClick={e => e.preventDefault()}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <img src={WrapIcon} alt="Wrap" />

                <Typography component="span" variant="button">
                  <Trans>IDO</Trans>
                </Typography>
              </Link>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {Object.keys(externalUrls).map((link, i) => {
              return (
                <Link key={i} href={`${externalUrls[link].url}`} target="_blank">
                  <Typography component="span" color="textSecondary" variant="button">
                    {externalUrls[link].icon}
                  </Typography>
                  <Typography component="span" color="textSecondary" variant="button">
                    {externalUrls[link].title}
                  </Typography>
                </Link>
              );
            })}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;
