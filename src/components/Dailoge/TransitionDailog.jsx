import * as React from "react";
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
import { Skeleton, Stack } from "@mui/material";
import "./dailog.scss";
import WalletIcon from "./walletIcon.png";
function TransitionDailog({ isOpen, handleClose, type }) {
  const [numPlayers, setNumPlayers] = React.useState(0);
  return (
    <Dialog
      open={isOpen}
      keepMounted={true}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {type}
      </DialogTitle>
      <DialogContent className="dailog-content">
        <Box className="dailog-item">
          <Stack className="item" direction="row">
            <img src={WalletIcon} alt="" />
            <Typography className="h6">rDAP</Typography>
          </Stack>
          <Stack className="item">
            <Typography className="p">Total Available</Typography>
            <Typography className="h6">274.52 KPR</Typography>
          </Stack>
          <Stack className="item">
            <Typography className="p">Total Available</Typography>
            <Typography className="h6">274.52 KPR</Typography>
          </Stack>
        </Box>
        <div className="data-row">
          <Typography className="name">Number of Options</Typography>
          <Typography className="value">
            {false ? <Skeleton width="80px" /> : <>{numPlayers}</>}
          </Typography>
        </div>
        <Slider
          defaultValue={0.1}
          aria-label="Default"
          step={0.01}
          valueLabelDisplay="auto"
          min={0}
          max={374.52}
          value={numPlayers}
          onChange={(e) => setNumPlayers(e.target.value)}
          sx={{
            width: "95%",
            color: "rgb(41, 46, 186)",
            "& .MuiSlider-rail": {
              height: "10px",
            },
            ".MuiSlider-track": {
              height: "10px",
            },
          }}
        />
        <div className="data-row">
          <Typography className="name">Underlying Amount</Typography>
          <Typography className="value">
            {false ? <Skeleton width="80px" /> : <>{"343 KPR"}</>}
          </Typography>
        </div>
        <div className="data-row">
          <Typography className="name">Amount due on execution</Typography>
          <Typography className="value">
            {false ? <Skeleton width="80px" /> : <>{"20 USDC"}</>}
          </Typography>
        </div>
        <div className="data-row">
          <Typography className="name">Strike Price</Typography>
          <Typography className="value">
            {false ? <Skeleton width="80px" /> : <>{"$11"}</>}
          </Typography>
        </div>
        <div className="data-row">
          <Typography className="name">Market Price</Typography>
          <Typography className="value">
            {false ? <Skeleton width="80px" /> : <>{"$3439"}</>}
          </Typography>
        </div>
        <div className="data-row">
          <Typography className="name">ROI</Typography>
          <Typography className="value">
            {false ? <Skeleton width="80px" /> : <>{"3%"}</>}
          </Typography>
        </div>
        <div className="data-row">
          <Typography className="name">Time to expiry</Typography>
          <Typography className="value">
            {false ? <Skeleton width="80px" /> : <>{"3 days"}</>}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions sx={{ padding: 3, paddingBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ display: "flex", flex: 1, minWidth: 180 }}
          onClick={handleClose}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ display: "flex", flex: 1, minWidth: 200 }}
          onClick={handleClose}
        >
          {type} Options
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TransitionDailog;
