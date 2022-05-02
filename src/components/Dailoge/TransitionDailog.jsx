import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import PublicIcon from "@mui/icons-material/Public";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@material-ui/core";
import { Trans } from "@lingui/react";
import { Skeleton, Stack, TextField } from "@mui/material";
import "./dailog.scss";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "src/hooks/web3Context";
import { buyOption, changeApproval, loadOptionDetails } from "src/slices/OptionSlice";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";

function TransitionDailog({ isOpen, handleClose, type }) {
  const { connect, address, hasCachedProvider, provider, chainID, connected, uri } = useWeb3Context();
  const primaryColor = "#2042B3";
  const greyColor = "#cfcccc";
  const [optionValue, setOptionValue] = useState(100);
  const dispatch = useDispatch();
  const option = useSelector(({ optioning: { allOptions, selectedOption } }) => allOptions[selectedOption]);
  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });

  const ROI = (option?.underlyingAmt * option?.priceUnderlying) / (option?.swapAssetAmt * option?.priceSwapAsset) - 1;

  const hasAllowance = useCallback(
    token => {
      console.log(
        "🚀 ~ file: TransitionDailog.jsx ~ line 38 ~ TransitionDailog ~ option?.purchaseAllowance",
        option?.purchaseAllowance,
        option?.exerciseAllowance,
        type,
      );
      if (type == "Purchase") {
        return option?.purchaseAllowance > 0;
      } else if (type == "Exercise") {
        return option?.exerciseAllowance > 0;
      }
      return false;
    },
    [option],
  );

  const onSeekApproval = async () => {
    console.log("🚀 ~ file: TransitionDailog.jsx ~ line 54 ~ onSeekApproval ~ type", type);
    dispatch(changeApproval({ address, type, option, provider, networkID: chainID }));
  };

  const onBuyOption = async () => {
    dispatch(buyOption({ address, type, optionValue, option, provider, networkID: chainID }));
  };

  return (
    <Dialog open={isOpen} keepMounted={true} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
      <DialogTitle sx={{ display: "flex" }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
            marginRight: 10,
          }}
        >
          <Typography variant="h6">{type}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent className="dailog-content">
        <Box className="dailog-item">
          <Stack className="item" direction="row">
            <img src={option?.option.OptionDailogIcon} alt="" className="logo-img" />
            <Typography className="icon-text">rDAP</Typography>
          </Stack>
          <Stack className="item min-w">
            <Typography className="p">Total Available</Typography>
            <Typography className="amount-value">
              {type == "Purchase" ? option?.optionAvailableBalance : option?.optionUserBalance}{" "}
              {option?.optionERC20Symbol}
            </Typography>
          </Stack>
          <Stack className="item">
            <Typography className="p">Market Price</Typography>
            <Typography className="amount-value">$ {option?.marketPrice}</Typography>
          </Stack>
        </Box>
        <div className="top-row">
          <Typography className="name">Number of Options</Typography>

          <TextField
            type="number"
            inputProps={{ style: { textAlign: "center", padding: 2, margin: 0 } }}
            value={optionValue}
            onChange={e => setOptionValue(e.target.value)}
            variant="outlined"
          />
        </div>
        <div className="slider-div">
          <Slider
            defaultValue={0.1}
            aria-label="Default"
            step={0.01}
            valueLabelDisplay="auto"
            min={0}
            max={type == "Purchase" ? option?.optionAvailableBalance : option?.optionUserBalance}
            value={optionValue}
            onChange={e => setOptionValue(parseInt(e.target.value))}
            sx={{
              width: "85%",
              marginLeft: 0.6,
              color: primaryColor,
              "& .MuiSlider-rail": {
                height: "10px",
              },
              ".MuiSlider-track": {
                height: "10px",
              },
            }}
          />
        </div>
        {type == "Purchase" ? (
          <>
            <div className="data-row">
              <Typography className="name">Underlying Amount</Typography>
              <Typography className="value">
                {option?.underlyingAmt} {option?.underlyingSymbol}
              </Typography>
            </div>
            <div className="data-row">
              <Typography className="name">Amount due on execution</Typography>
              <Typography className="value">
                {optionValue * (option?.swapAssetAmt / option?.underlyingAmt)} {option?.swapSymbol}
              </Typography>
            </div>
            <div className="data-row">
              <Typography className="name">Strike Price</Typography>
              <Typography className="value">$ {option?.swapAssetAmt / option?.underlyingAmt}</Typography>
            </div>
            <div className="data-row">
              <Typography className="name">Market Price</Typography>
              <Typography className="value">$ {option?.marketPrice}</Typography>
            </div>
            <div className="data-row">
              <Typography className="name">ROI</Typography>
              <Typography className="value">{ROI} %</Typography>
            </div>
            <div className="data-row">
              <Typography className="name">Time to expiry</Typography>
              <Typography className="value">{option?.expiryTime}</Typography>
            </div>
          </>
        ) : (
          <>
            <div className="data-row">
              <Typography className="name">You Will Get</Typography>
              <Typography className="value">
                {optionValue * (option?.swapAssetAmt / option?.underlyingAmt)}
                {option?.underlyingSymbol}
              </Typography>
            </div>
            <div className="data-row">
              <Typography className="name">You Will Give</Typography>
              <Typography className="value">
                {optionValue * (option?.swapAssetAmt / option?.underlyingAmt)} {option?.swapSymbol}
              </Typography>
            </div>
            <div className="data-row">
              <Typography className="name">ROI</Typography>
              <Typography className="value">{ROI} %</Typography>
            </div>
            <div className="data-row">
              <Typography className="name">Time to expire</Typography>
              <Typography className="value">{option?.expiryTime}</Typography>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: 3, paddingBottom: 3 }}>
        {hasAllowance(type) ? (
          <Button
            fullWidth
            variant="contained"
            style={{
              background: isPendingTxn(pendingTransactions, "approve_" + option?.option?.name)
                ? greyColor
                : primaryColor,
              color: "#fff",
              textTransform: "none",
              borderRadius: 8,
            }}
            onClick={onBuyOption}
          >
            {txnButtonText(pendingTransactions, "approve_" + option?.option?.name, `${type} Options`)}
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            style={{
              background: isPendingTxn(pendingTransactions, "approve_" + option?.option?.name)
                ? greyColor
                : primaryColor,
              color: "#fff",
              textTransform: "none",
              borderRadius: 8,
            }}
            onClick={onSeekApproval}
          >
            {txnButtonText(
              pendingTransactions,
              "approve_" + option?.option?.name,
              hasAllowance(type) ? `Approved` : `Approve`,
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default TransitionDailog;
