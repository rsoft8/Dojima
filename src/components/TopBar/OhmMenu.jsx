import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Link,
  SvgIcon,
  Popper,
  Button,
  Paper,
  Typography,
  Divider,
  Box,
  Fade,
  Slide,
} from "@material-ui/core";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as sMUSHTokenImg } from "../../assets/tokens/sBDAO.svg";
import { ReactComponent as MUSHTokenImg } from "../../assets/tokens/BDAO.svg";

import "./ohmmenu.scss";
import { Trans } from "@lingui/macro";
import { useWeb3Context } from "../../hooks/web3Context";

import MUSHImg from "src/assets/tokens/BDAO.svg";
import SMUSHImg from "src/assets/tokens/sBDAO.svg";

const addTokenToWallet = (tokenSymbol, tokenAddress, address) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    let tokenPath;

    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: 9, //tokenDecimals
            image: imageURL,
          },
        },
      });
      let uaData = {
        address: address,
        type: "Add Token",
        tokenName: tokenSymbol,
      };
      // segmentUA(uaData);
    } catch (error) {
      console.log(error);
    }
  }
};

function OhmMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const { chainID, address } = useWeb3Context();

  const networkID = chainID;
  console.log(networkID);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = "ohm-popper";
  const busdAddress = "";
  return (
    <Box
      component="div"
      onMouseEnter={(e) => handleClick(e)}
      onMouseLeave={(e) => handleClick(e)}
      id="ohm-menu-button-hover"
    >
      <Button
        id="ohm-menu-button"
        size="large"
        variant="outlined"
        color="primary"
        title="BDAO"
        aria-describedby={id}
      >
        Buy $MAGIC2
      </Button>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="ohm-menu" elevation={1}>
                <Box component="div" className="buy-tokens">
                  <Link target="_blank" rel="noreferrer" disable={true}>
                    <Button
                      size="large"
                      variant="outlined"
                      color="secondary"
                      enabled={false}
                      fullWidth
                    >
                      <Typography align="left" component="p">
                        <Trans>Buy on {new String("SpookySwap")}</Trans>
                        <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>

                  {isEthereumAPIAvailable ? (
                    <Box className="add-tokens">
                      <Divider color="secondary" />
                      <p>
                        <Trans>ADD TOKEN TO WALLET</Trans>
                      </p>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                      ></Box>
                    </Box>
                  ) : null}
                </Box>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </Box>
  );
}

export default OhmMenu;
