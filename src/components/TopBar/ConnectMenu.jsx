import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  SvgIcon,
  Typography,
  Popper,
  Paper,
  Divider,
  Link,
  Slide,
  Fade,
} from "@material-ui/core";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as CaretDownIcon } from "../../assets/icons/caret-down.svg";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import { Trans } from "@lingui/macro";
import Coins from "./coin.png";
function ConnectMenu() {
  const address = useAddress();
  const { connect, disconnect, connected, web3, chainID } = useWeb3Context();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isConnected, setConnected] = useState(connected);
  const [isHovering, setIsHovering] = useState(false);

  const pendingTransactions = useSelector((state) => {
    return state.pendingTransactions;
  });

  let buttonText = <Trans>Connect Wallet</Trans>;
  let clickFunc = connect;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const shorten = (str) => {
    if (str.length < 10) return str;
    return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
  };
  if (isConnected) {
    buttonText = (
      <Trans>
        <span>
          <img src={Coins} alt="" className="symbolcoin" />
        </span>
        {address && (
          <div className="wallet-link">
            <Link
              href={`https://ftmscan.com/address/${address}`}
              target="_blank"
            >
              {shorten(address)}
            </Link>
          </div>
        )}
      </Trans>
    );
    clickFunc = disconnect;
  }

  if (pendingTransactions && pendingTransactions.length > 0) {
    buttonText = <Trans>In progress</Trans>;
    clickFunc = handleClick;
  }

  const open = Boolean(anchorEl);
  const id = open ? "ohm-popper-pending" : undefined;

  const primaryColor = "#292EBA";

  const getEtherscanUrl = (txnHash) => {
    return chainID === 4
      ? "https://rinkeby.etherscan.io/tx/" + txnHash
      : "https://etherscan.io/tx/" + txnHash;
  };

  useEffect(() => {
    if (pendingTransactions.length === 0) {
      setAnchorEl(null);
    }
  }, [pendingTransactions]);

  useEffect(() => {
    setConnected(connected);
  }, [web3, connected]);

  return (
    <div
      onMouseEnter={(e) =>
        pendingTransactions && pendingTransactions.length > 0
          ? handleClick(e)
          : null
      }
      onMouseLeave={(e) =>
        pendingTransactions && pendingTransactions.length > 0
          ? handleClick(e)
          : null
      }
      className="wallet-menu"
      id="wallet-menu"
    >
      <Button
        className="connect-btn"
        variant="outlined"
        style={
          pendingTransactions.length > 0
            ? {
                color: primaryColor,
                borderColor: primaryColor,
                textTransform: "none",
              }
            : { borderColor: primaryColor, textTransform: "none" }
        }
        onClick={clickFunc}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {buttonText}
        {pendingTransactions.length > 0 && (
          <Slide direction="left" in={isHovering} {...{ timeout: 333 }}>
            <SvgIcon
              className="caret-down"
              component={CaretDownIcon}
              htmlColor={primaryColor}
            />
          </Slide>
        )}
      </Button>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="ohm-menu" elevation={1}>
                {pendingTransactions.map((x, i) => (
                  <Box key={i} fullWidth>
                    <Link
                      key={x.txnHash}
                      href={getEtherscanUrl(x.txnHash)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                      >
                        <Typography align="left" component="p">
                          {x.text} <SvgIcon component={ArrowUpIcon} />
                        </Typography>
                      </Button>
                    </Link>
                  </Box>
                ))}
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </div>
  );
}

export default ConnectMenu;
