import { useEffect, useState } from "react";
import { Box, Button, Divider, makeStyles, Paper, SvgIcon, Typography } from "@material-ui/core";
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

import { CardHeader, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "src/hooks/web3Context";
import useOptions from "src/hooks/Options";
import { setSelected } from "src/slices/OptionSlice";
function Home() {
  const primaryColor = "#2042B3";
  const { chainID, connect, connected } = useWeb3Context();
  const dispatch = useDispatch();
  const { options } = useOptions(chainID);
  const [exerciseDialoge, setExerciseDialoge] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState(false);
  const allOptions = useSelector(({ optioning: { allOptions } }) =>
    Object.keys(allOptions).map(key => allOptions[key]),
  );

  const tableHeader = {
    fontSize: 12,
    paddingY: 1,
    paddingX: 3,
  };
  const tableValue = {
    fontSize: 12,
    padding: 1,
  };

  const handleClick = (id, type) => {
    if (connected) {
      dispatch(setSelected(id));
      if (type == "Purchase") setPurchaseOption(true);
      else setExerciseDialoge(true);
    } else {
      connect();
    }
  };

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
              {allOptions.length == options.length
                ? allOptions?.map(item => (
                    <TableRow
                      key={item.optionID}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                          paddingBottom: 3,
                        },
                      }}
                    >
                      <TableCell sx={tableValue} align="center">
                        <img src={item.option.optionIcon} className="item-image" />
                        {item.option.optionName}
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        <img src={item.option.optionIcon} className="item-image" />
                        {item.underlyingSymbol}
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        {item.swapAssetAmt / item.underlyingAmt} $
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        {item.marketPrice} $
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        {item.optionAvailableBalance} / {item.optionTotalBalance}
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        {item.optionPrice}
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        {item.expiryTime}
                      </TableCell>
                      <TableCell className="row-btn" component="th" scope="row" align="center">
                        <Button
                          variant="contained"
                          style={{
                            background: primaryColor,
                            color: "#fff",
                            textTransform: "none",
                            borderRadius: 8,
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                          onClick={() => handleClick(item.optionID, "Purchase")}
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
                            paddingTop: 0,
                            paddingBottom: 0,
                            marginRight: 5,
                          }}
                          onClick={() => handleClick(item.optionID, "Exercise")}
                        >
                          <p className="row-btn-text"> Exercise Option</p>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : options.map(item => (
                    <TableRow
                      key={item.optionId}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                          paddingBottom: 3,
                        },
                      }}
                    >
                      <TableCell sx={tableValue} align="center">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        <Skeleton variant="rectangular" width={100} height={20} />
                        {item.underlyingSymbol}
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </TableCell>
                      <TableCell sx={tableValue} align="center">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </TableCell>
                      <TableCell className="row-btn" component="th" scope="row" align="center">
                        <Skeleton variant="rectangular" width={100} height={30} />
                      </TableCell>
                      <TableCell className="row-btn" align="center">
                        <Skeleton variant="rectangular" width={100} height={30} />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Box>
        <Box className="mobile-card">
          {allOptions.length == options.length ? (
            <>
              {allOptions?.map(item => (
                <Card className="main-card" elevation={10} key={item.optionID}>
                  <Box className="card-header">
                    <Typography variant="h6"> {item.option.optionName}</Typography>
                    <Typography variant="h6">{item.underlyingSymbol}</Typography>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="p">Strike Price - {item.swapAssetAmt / item.underlyingAmt} $</Typography>
                      <Typography variant="p">Market Price - {item.marketPrice} $</Typography>
                    </Box>
                    <Box className="card-block">
                      <Typography variant="p" className="bold-text">
                        <b>Amount Available</b>
                      </Typography>
                      <Typography variant="p">
                        {item.optionAvailableBalance} / {item.optionTotalBalance}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                      <Box className="card-block">
                        <Typography variant="p" className="bold-text">
                          <b> {item.optionPrice}</b>
                        </Typography>
                        <Typography variant="p">100</Typography>
                      </Box>
                      <Box className="card-block">
                        <Typography variant="p" className="bold-text">
                          <b>Time to expiry</b>
                        </Typography>
                        <Typography variant="p"> {item.expiryTime}</Typography>
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
                      onClick={() => handleClick(item.optionID, "Purchase")}
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
                      onClick={() => handleClick(item.optionID, "Exercise")}
                    >
                      <p className="row-btn-text"> Exercise Option</p>
                    </Button>
                  </Box>
                </Card>
              ))}
            </>
          ) : (
            <>
              {options?.map(item => (
                <Card className="main-card" elevation={10} key={item.optionId}>
                  <Box className="card-header card-pb">
                    <Typography variant="h6">
                      <Skeleton variant="rectangular" width={100} height={20} />
                    </Typography>
                    <Typography variant="h6">
                      <Skeleton variant="rectangular" width={100} height={20} />
                    </Typography>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="p" className="card-pb">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </Typography>
                      <Typography variant="p">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </Typography>
                    </Box>
                    <Box className="card-block">
                      <Typography variant="p">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                      <Box className="card-block">
                        <Skeleton variant="rectangular" width={100} height={20} />
                      </Box>
                      <Box className="card-block">
                        <Typography variant="p">
                          <Skeleton variant="rectangular" width={100} height={20} />
                        </Typography>
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
                    >
                      <p className="row-btn-text"> Exercise Option</p>
                    </Button>
                  </Box>
                </Card>
              ))}
            </>
          )}
        </Box>
      </Box>
      <TransitionDailog
        isOpen={purchaseOption}
        type="Purchase"
        handleClose={() => {
          setPurchaseOption(false);
        }}
      />
      <TransitionDailog
        isOpen={exerciseDialoge}
        type="Exercise"
        handleClose={() => {
          setExerciseDialoge(false);
        }}
      />
    </div>
  );
}

export default Home;
