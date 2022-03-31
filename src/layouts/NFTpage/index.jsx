import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ButtonPurchase from "./purchaseButton";
import "./style.css";

const NFTpage = () => {
  const [open, setOpen] = useState();
  const [option, setOptionChange] = useState(true);

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

  const openModal = () => {
    setOpen(true);
  };
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
  };
  const optionExciseChange = () => {
    setOptionChange(false);
  };
  const optionPurchuseChange = () => {
    setOptionChange(true);
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
              <p>0.1</p>
            </div>
            <div className="slider-bar">
              <Slider
                defaultValue={1}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{
                  width: "100%",
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
                <div className="coin-flex-bar">
                  <p id="font-gray">You Will Get</p>
                  <p>343 KPR</p>
                </div>
                <div className="coin-flex-bar">
                  <p id="font-gray">You Will Give</p>
                  <p>20 USDC</p>
                </div>
                <div className="coin-flex-bar">
                  <p id="font-gray">ROI</p>
                  <p>3%</p>
                </div>
                <div className="coin-flex-bar">
                  <p id="font-gray">Time to expiry</p>
                  <p>3 Days</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="coin-flex-bar">
                  <p id="font-gray">Underlying Amount</p>
                  <p>343 KPR</p>
                </div>
                <div className="coin-flex-bar">
                  <p id="font-gray">Amount due on execution</p>
                  <p>20 USDC</p>
                </div>
                <div className="coin-flex-bar">
                  <p id="font-gray">Stake Price</p>
                  <p>$11</p>
                </div>
                <div className="coin-flex-bar">
                  <p id="font-gray">Market Price</p>
                  <p>$3439</p>
                </div>
                <div className="coin-flex-bar">
                  <p id="font-gray">ROI</p>
                  <p>3%</p>
                </div>
                <div className="coin-flex-bar">
                  <p id="font-gray">Time to expiry</p>
                  <p>3 Days</p>
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
      <div className="wallet-position">
        <button className="main-blue-outline wallet">Connect Wallet</button>
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
                  <ButtonPurchase onClick={optionPurchuseChange}></ButtonPurchase>
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
