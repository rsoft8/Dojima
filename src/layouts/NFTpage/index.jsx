import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import PurchaseOption from "./purchaseOptionButton";
import "./style.css";

const NFTpage = () => {
  const [open, setOpen] = useState();
  const [walletOpen, setWalletOption] = useState();
  const [option, setOptionChange] = useState(true);
  const [numPlayers, setNumPlayers] = useState(0);
  const [optionAddress, setOptionAddress] = useState(false);
  const tableData = [
    {
      option: "FTO-ETH",
      andelrying: "FTO",
      price: 5,
      mPrice: 500,
      amount: {
        pre: 1000,
        lat: 10000,
      },
      oPrice: 100,
      time: 30,
    },
    {
      option: "FTO-ETH",
      andelrying: "FTO",
      price: 5,
      mPrice: 500,
      amount: {
        pre: 1000,
        lat: 10000,
      },
      oPrice: 100,
      time: 30,
    },
    {
      option: "FTO-ETH",
      andelrying: "FTO",
      price: 5,
      mPrice: 500,
      amount: {
        pre: 1000,
        lat: 10000,
      },
      oPrice: 100,
      time: 30,
    },
    {
      option: "FTO-ETH",
      andelrying: "FTO",
      price: 5,
      mPrice: 500,
      amount: {
        pre: 1000,
        lat: 10000,
      },
      oPrice: 100,
      time: 30,
    },
    {
      option: "FTO-ETH",
      andelrying: "FTO",
      price: 5,
      mPrice: 500,
      amount: {
        pre: 1000,
        lat: 10000,
      },
      oPrice: 100,
      time: 30,
    },
    {
      option: "FTO-ETH",
      andelrying: "FTO",
      price: 5,
      mPrice: 500,
      amount: {
        pre: 1000,
        lat: 10000,
      },
      oPrice: 100,
      time: 30,
    },
  ];
  const walletExerciseInfo = [
    {
      GetMoney: "343 KPR",
      GiveMoney: "20USDC",
      ROI: "3%",
      TimeExpiry: "3 Days",
    },
  ];
  const walletPurchaseInfo = {
    UnderlyingAmount: "343 KPR",
    DueExecution: "20 USDC",
    StakePrice: "$11",
    MarketPrice: "$3439",
    ROI: "3%",
    TimeExpiry: "3 Days",
  };

  const openModal = () => {
    setOpen(true);
    setOptionChange(true)
  };
  const openPurchaseNumber = () => {
    setOpen(true);
    setOptionChange(false)
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleClose = () => {
    setOpen(false);
    setWalletOption(false);
  };
  const optionExciseChange = () => {
    setOptionChange(false);
  };
  const optionPurchuseChange = () => {
    setOptionChange(true);
  };
  const handlePlayersChange = (e) => {
    console.log(e.target.value);
    setNumPlayers(e.target.value);
  };
  const walletOption = () => {
    setWalletOption(true);
  };
  const metaMaskConnect = () => {
    setOptionAddress(true);
    handleClose();
  };
  const WalletConnect = () => {
    setOptionAddress(true);
    handleClose();
  };
  const mountedStyle = { animation: "inAnimation 250ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards",
  };

  return (
    <div
      className="main-container"
      style={option ? mountedStyle : unmountedStyle}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, padding: "15px" }}>
          <div>
            {option === true ? (
              <h4 id="child-modal-title" className="text-center">
                Exercise
              </h4>
            ) : (
              <h4 id="child-modal-title" className="text-center">
                Purchase
              </h4>
            )}
            <span class="close" onClick={handleClose}>
              &times;
            </span>
            <div className="market-status">
              <div className="market-status-left">
                <img src="./walletIcon.png" alt="" />
                <span className="coin-type">rDAP</span>
              </div>
              <div className="market-status-middle">
                <p className="coin-header mb-1" id="font-gray">
                  Total Available
                </p>
                <h5 className="text-center mb-0">374.52KPR</h5>
              </div>
              <div className="market-status-right">
                <p className="coin-header mb-1" id="font-gray">
                  Market Price
                </p>
                <h5 className="text-center mb-0">$374.52</h5>
              </div>
            </div>
            <div className="coin-increase">
              <p id="font-gray">Number to Exercise</p>
              <p>{numPlayers}</p>
            </div>
            <div className="slider-bar">
              <Slider
                defaultValue={0.1}
                aria-label="Default"
                step={0.01}
                valueLabelDisplay="auto"
                min={0}
                max={374.52}
                value={numPlayers}
                onChange={(e) => handlePlayersChange(e)}
                sx={{
                  width: "335px",
                  color: "rgb(41, 46, 186)",
                  "& .MuiSlider-rail": {
                    height: "10px",
                  },
                  ".MuiSlider-track": {
                    height: "10px",
                  },
                }}
              />
            </div>
            {option === true ? (
              <div>
                {walletExerciseInfo.map((item) => (
                  <div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">You Will Get</p>
                      <p id="font-money">{item.GetMoney}</p>
                    </div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">You Will Give</p>
                      <p id="font-money">{item.GiveMoney}</p>
                    </div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">ROI</p>
                      <p id="font-money">{item.ROI}</p>
                    </div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">Time to expiry</p>
                      <p id="font-money">{item.TimeExpiry}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">Underlying Amount</p>
                      <p id="font-money">{walletPurchaseInfo.UnderlyingAmount}</p>
                    </div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">Amount due on execution</p>
                      <p id="font-money">{walletPurchaseInfo.DueExecution}</p>
                    </div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">Stake Price</p>
                      <p id="font-money">{walletPurchaseInfo.StakePrice}</p>
                    </div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">Market Price</p>
                      <p id="font-money">{walletPurchaseInfo.MarketPrice}</p>
                    </div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">ROI</p>
                      <p id="font-money">{walletPurchaseInfo.ROI}</p>
                    </div>
                    <div className="coin-flex-bar">
                      <p id="font-gray">Time to expiry</p>
                      <p id="font-money">{walletPurchaseInfo.TimeExpiry}</p>
                    </div>
              </div>
            )}

            <div className="coin-flex-button">
              <button className="main-blue">Approve</button>
              {option === true ? (
                <button
                  className="main-outline"
                  style={option ? mountedStyle : unmountedStyle}
                  onClick={optionExciseChange}
                  id="font-gray"
                >
                  Exercise Option
                </button>
              ) : (
                <button className="main-outline" onClick={optionPurchuseChange}>
                  Purchase Option
                </button>
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={walletOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, padding: "0" }} id="walletModal">
          <div className="HomeWallet" onClick={metaMaskConnect}>
            <img src="./fox.png" alt="" />
            <h3 className="walletNameTop">Injected</h3>
            <p className="walletBottom">Home-BrowserWallet</p>
          </div>
          <hr className="hrcustomize" />
          <div className="HomeWallet" onClick={WalletConnect}>
            <img src="./walletflow.png" alt="" />
            <h3 className="walletNameTop">WalletConnect</h3>
            <p className="walletBottom">Scan with WalletConnect to connect</p>
          </div>
        </Box>
      </Modal>
      <div className="wallet-position">
        {optionAddress === false ? (
          <button className="main-blue-outline wallet" onClick={walletOption}>
            Connect wallet
          </button>
        ) : (
          <button className="main-blue-outline wallet" onClick={walletOption}>
            <span>
              <img src="./coin.png" alt="" className="symbolcoin" />
            </span>
            &nbsp; <span>0xA8...060f</span>
          </button>
        )}
      </div>
      <div className="robot-position">
        <img src="./robot.png" alt="robot" />
        <p className="welcome-massage">Welcome Massage</p>
        <br />
        <p className="total-liquidity">Total Liquidity</p>
        <p className="total-cost">$493360034</p>
      </div>
      <div className="container">
        <table className="table-responsive">
          <thead>
          <tr>
            <th>Option</th>
            <th>Andelying assets</th>
            <th>Strike Price</th>
            <th>Market Price</th>
            <th>Amount Available</th>
            <th>Option Price</th>
            <th>Time to expiry</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {tableData.map((item) => {
            return (
              <tr>
                <td>{item.option}</td>
                <td>{item.andelrying}</td>
                <td>{item.price}$</td>
                <td>{item.mPrice}$</td>
                <td>
                  {item.amount.pre} / {item.amount.lat}
                </td>
                <td>{item.oPrice}</td>
                <td>{item.time}days</td>
                <td className="table-flex">
                  <button className="main-blue" onClick={() => openPurchaseNumber()}>Purchase Option</button>
                  <button className="main-outline" onClick={() => openModal()}>
                    Exercise option
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default NFTpage;
