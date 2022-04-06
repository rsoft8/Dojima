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
  const [purchaseDialoge, setPurchaseDialoge] = useState(false);
  const [exerciseDialoge, setExerciseDialoge] = useState(false);
  const tableHeader = {
    fontSize: 13,
    fontWeight: "bold",
    paddingY: 2,
    paddingX: 1,
  };
  const tableValue = { fontSize: 14, padding: 2 };
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
                  <TableCell component="th" scope="row" align="center">
                    <Button
                      variant="contained"
                      className="row-btn"
                      color="primary"
                      onClick={() => {
                        setPurchaseDialoge(!purchaseDialoge);
                      }}
                    >
                      <p className="row-btn-text">Purchanse Options</p>
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
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
          {/* {array.map((row) => ( */}
          {/* <Card sx={{ margin: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 8,
                borderBottom: 3,
                borderColor: "#000",
              }}
            >
              <Typography variant="h6">FOT - ETH2</Typography>
              <Typography variant="h6">FOT</Typography>
            </Box>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="p">Strike Price - 5$ </Typography>
                <Typography variant="p">Market Price - 5$ </Typography>
                <Typography variant="p" sx={{ marginTop: 10 }}>
                  Amount Available
                </Typography>
                <Typography variant="p">1000 / 10,000</Typography>
              </Box>
            </CardContent>
          </Card> */}
          {/* ))} */}
        </Box>
      </Box>
      <TransitionDailog
        isOpen={purchaseDialoge}
        type="Purchase"
        handleClose={() => {
          setPurchaseDialoge(!purchaseDialoge);
        }}
      />
      <TransitionDailog
        isOpen={exerciseDialoge}
        type="Exercise"
        handleClose={() => {
          setExerciseDialoge(!exerciseDialoge);
        }}
      />
    </div>
  );
}

export default Home;
