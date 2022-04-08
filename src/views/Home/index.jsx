import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./style.scss";
import RoboImg from "./robot.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TransitionDailog from "src/components/Dailoge/TransitionDailog";

import { CardHeader } from "@mui/material";
function Home() {
  const array = [1, 1, 1, 1, 1, 1];
  const primaryColor = "#2042B3";
  const [purchaseDialoge, setPurchaseDialoge] = useState(false);
  const [exerciseDialoge, setExerciseDialoge] = useState(false);
  const tableHeader = {
    fontSize: 16,
    paddingY: 2,
    paddingX: 3,
  };
  const tableValue = { fontSize: 16, padding: 0 };
  return (
    <div id="home-view">
      <Box className="container">
        <img src={RoboImg} />
        <Typography variant="p" className="welcome-massage">
          Welcome Message
        </Typography>
        <Box className="value-container">
          <Typography variant="p" className="total-liquidity">
            Total Liquidity
          </Typography>
          <Typography variant="p" className="total-cost">
            $946745313
          </Typography>
        </Box>
        <Box className="ohm-card">
          <Table sx={{ minWidth: 650, fontSize: 5 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeader} align="center">
                  Option
                </TableCell>
                <TableCell sx={tableHeader} align="center">
                  Andelrying Asset
                </TableCell>
                <TableCell sx={tableHeader} align="center">
                  Strike Price
                </TableCell>
                <TableCell sx={tableHeader} align="center">
                  Market Price
                </TableCell>
                <TableCell sx={tableHeader} align="center">
                  Amount Available
                </TableCell>
                <TableCell sx={tableHeader} align="center">
                  Option Price
                </TableCell>
                <TableCell sx={tableHeader} align="center">
                  Time to expiry
                </TableCell>
                <TableCell>
                  <Box width={65} />
                </TableCell>
                <TableCell>
                  <Box width={65} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={tableValue} align="center">
                    FTO-ETH
                  </TableCell>
                  <TableCell sx={tableValue} align="center">
                    FTO
                  </TableCell>
                  <TableCell sx={tableValue} align="center">
                    5 $
                  </TableCell>
                  <TableCell sx={tableValue} align="center">
                    500 $
                  </TableCell>
                  <TableCell sx={tableValue} align="center">
                    1000/10,000
                  </TableCell>
                  <TableCell sx={tableValue} align="center">
                    100
                  </TableCell>
                  <TableCell sx={tableValue} align="center">
                    30 Days
                  </TableCell>
                  <TableCell
                    className="row-btn"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <Button
                      variant="contained"
                      style={{
                        background: primaryColor,
                        color: "#fff",
                        textTransform: "none",
                        borderRadius: 8,
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                      onClick={() => {
                        setPurchaseDialoge(!purchaseDialoge);
                      }}
                    >
                      <p className="row-btn-text">Purchanse Options</p>
                    </Button>
                  </TableCell>
                  <TableCell className="row-btn" align="center">
                    <Button
                      variant="outlined"
                      style={{
                        borderColor: "#AFAFAF",
                        color: "#AFAFAF",
                        textTransform: "none",
                        borderRadius: 8,
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                      onClick={() => {
                        setExerciseDialoge(!exerciseDialoge);
                      }}
                    >
                      <p className="row-btn-text"> Exercise Option</p>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box className="mobile-card">
          {array.map((row) => (
            <Card className="main-card" elevation={10}>
              <Box className="card-header">
                <Typography variant="h6">FOT - ETH2</Typography>
                <Typography variant="h6">FOT</Typography>
              </Box>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="p">Strike Price - 5$ </Typography>
                  <Typography variant="p">Market Price - 5$ </Typography>
                </Box>
                <Box className="card-block">
                  <Typography variant="p" className="bold-text">
                    <b>Amount Available</b>
                  </Typography>
                  <Typography variant="p">1000 / 10,000</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Box className="card-block">
                    <Typography variant="p" className="bold-text">
                      <b>Option Price</b>
                    </Typography>
                    <Typography variant="p">100</Typography>
                  </Box>
                  <Box className="card-block">
                    <Typography variant="p" className="bold-text">
                      <b>Time to expiry</b>
                    </Typography>
                    <Typography variant="p">30 Days</Typography>
                  </Box>
                </Box>
              </CardContent>
              <Box className="card-action">
                <Button
                  variant="contained"
                  style={{
                    background: primaryColor,
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: 8,
                  }}
                  onClick={() => {
                    setPurchaseDialoge(!purchaseDialoge);
                  }}
                >
                  <p className="row-btn-text">Purchanse Options</p>
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    borderColor: "#AFAFAF",
                    color: "#AFAFAF",
                    textTransform: "none",
                    borderRadius: 8,
                  }}
                  onClick={() => {
                    setExerciseDialoge(!exerciseDialoge);
                  }}
                >
                  <p className="row-btn-text"> Exercise Option</p>
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
      <TransitionDailog
        isOpen={purchaseDialoge}
        type="Purchase"
        handleClose={() => {
          setPurchaseDialoge(!purchaseDialoge);
        }}
        handlePurchase={() => {
          setPurchaseDialoge(!purchaseDialoge);
          setExerciseDialoge(!exerciseDialoge);
        }}
      />
      <TransitionDailog
        isOpen={exerciseDialoge}
        type="Exercise"
        handleClose={() => {
          setExerciseDialoge(!exerciseDialoge);
        }}
        handlePurchase={() => {
          setExerciseDialoge(!exerciseDialoge);
        }}
      />
    </div>
  );
}

export default Home;
