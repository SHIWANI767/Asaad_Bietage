import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { borderRadius, styled, width } from "@mui/system";
import { Box, Button, Divider, Grid } from "@mui/material";
import { ExchangeLogo, fixDecimal } from "@/utils";
import Image from "next/image";
import Tooltiphover from "@/components/ToolTiphover";
import Popup from "@/components/DynamicModel";
import axios from "axios";
import { api_configs } from "@/api-services";
import toast from "react-hot-toast";

const DirectCardPaper = styled(Box)(({ theme, ExecuteButtonType }) => ({
  "& .submitButton": {
    borderRadius: "12px !important",
  },
  "& h6": {
    fontSize: "14px",
    color: "#21C763",
  },
  "& .traclLiveButtonBox": {
    background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
    "@media(max-width:767px)": {
      top: "41px!important",
      right: "10px!important",
      padding: "5px !important",
    },
  },
  "& .graytext": {
    // color: "rgba(255, 255, 255, 0.6)",
    textAlign: "right",
    width: "100%",
  },
  "& .MuiAccordion-root.Mui-expanded": {
    margin: "0px !important",
  },
  "& .MuiAccordionSummary-root": {
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(228.52deg, rgba(21, 21, 20, 0.88) -63.21%, rgba(22, 22, 20, 0.83) 116.99%) !important"
        : "rgb(57 47 47 / 5%) !important",
    padding: "0px 13px",
    minHeight: "24px",
    borderRadius: "12px !important",
    margin: "0px 0 5px",
    width: "100%",
    border: `1px solid ${
      theme.palette.mode === "dark" ? "rgba(29, 30, 29, 0.71)" : "#191d1312"
    }`,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
    fontSize: "17px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "0px 0 !important",
  },
  "& .MuiCollapse-wrapperInner": {
    paddingLeft: "0px",
  },
  "& .MuiAccordion-rounded:last-child": {
    borderRadius: "0px",
    "@media(max-width:767px)": {
      padding: "0px",
    },
  },
  "& .MuiAccordionSummary-content.Mui-expanded ": {
    margin: "0px 0 !important",
  },
  "& .MuiAccordionSummary-root.Mui-expanded ": {
    minHeight: "29px",
  },
  "& .trackbutton": {
    color: "#fff",
  },
  "& .MuiDivider-root": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "& .mainClass": {
    padding: "8px 0",
    // borderBottom: "1px solid #8080804a",
    borderRadius: "0px",
    marginTop: "0px",
  },
  "& .MuiPaper-root.MuiAccordion-root:before": {
    position: "absolute",
    left: 0,
    top: "-1px",
    right: 0,
    height: "1px",
    content: '""',
    opacity: 1,
    backgroundColor: "transparent",
  },
  "& .arbitrageBox": {
    position: "relative",
    marginTop: "8px",
  },
  "& .MuiPaper-root": {
    borderRadius: ExecuteButtonType && 0,
    boxShadow: ExecuteButtonType && "none",
    backgroundImage: ExecuteButtonType && "none",
    backgroundColor: ExecuteButtonType && "transparent",
    padding: ExecuteButtonType ? 0 : "15px",
  },
  "& .mainPaperBox": {
    border: ExecuteButtonType
      ? "none" // No border when ExecuteButtonType is true
      : `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(28, 28, 28, 1)" // Dark theme border color
            : "transparent" // Light theme border color
        }`, // Conditional border color when ExecuteButtonType is false
  },
}));

const DetailsComponent = ({ data, ExecuteButtonType, setIsOpenTrade }) => {
  const [isExchaneLogout, setIsExchangeLogout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = window.localStorage.getItem("user_token");

  const tradeProfitPathsDirectHandler = async (value) => {
    try {
      setIsProcessing(true);
      const dataToSend = {
        base: value.base,
        pair: value.pair,
        buy: value.buy,
        exchange1_price: value.exchange1_price,
        sell: value.sell,
        exchange2_price: value.exchange2_price,
        capital: value.baseCapital,
        capitalInUSDT: value.capital,
      };
      const apiEndPointCheck = "tradeProfitPathsDirectArb";
      const response = await axios({
        method: "POST",
        url: api_configs[apiEndPointCheck],
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.status == 200) {
        toast.success(response.data.responseMessage);
        setIsExchangeLogout(false);
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <DirectCardPaper ExecuteButtonType={ExecuteButtonType}>
      <Paper elevation={2} className="mainPaperBox">
        <Box className="mainClass">
          <Box>
            <Box className="displaySpacebetween">
              <Box className="displayStart">
                <Image
                  height={25}
                  width={25}
                  quality={100}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src={
                    ExchangeLogo.find(
                      (d) => d.title.toLowerCase() === data.buy.toLowerCase()
                    )?.img
                  }
                  alt=""
                  style={{ height: "25px", width: "25px" }}
                />
                <Box ml={2} align="left">
                  <Typography variant="body2 " style={{ fontSize: "11px" }}>
                    {" "}
                    {data.buy}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="secondary"
                    className="smallBold"
                  >
                    <Tooltiphover
                      amount={data.exchange1_price}
                      title={`Price on ${data.buy}`}
                      isTop={true}
                      symbol={data.pair}
                    />{" "}
                    &nbsp;&nbsp;
                    <span style={{ fontSize: "10px" }}>{data.pair}</span>
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6">BUY</Typography>
                <Typography variant="subTitle1" color="secondary" mt={1}>
                  {data.base}
                </Typography>
              </Box>
            </Box>

            <Accordion
              style={{
                background: "transparent",
                padding: "10px 0",
                boxShadow: "none",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <AccordionSummary
                  style={{
                    background: "transparent",
                    padding: "10px",
                    boxShadow: "none",
                  }}
                  expandIcon={<ExpandMoreIcon color="fff" />}
                >
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    className="smallBold"
                  >
                    <Tooltiphover
                      amount={data.receiveExchange1}
                      title={"Receive Amount"}
                      symbol={data.base}
                    />{" "}
                    {data.base}
                  </Typography>
                </AccordionSummary>
              </Box>
              <AccordionDetails
                style={{ padding: "0px", boxShadow: "none", display: "block" }}
              >
                <Divider />
                <Box mt={1} mb={1}>
                  <div className="displayCenter">
                    <Typography
                      variant="subTitle1"
                      color="primary"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      Withdraw Fee :
                    </Typography>
                    <Typography
                      variant="subTitle1"
                      color="secondary"
                      whiteSpace={"pre"}
                    >
                      {`${fixDecimal(data?.withdrawFee1)} ${data?.base} `}
                    </Typography>
                  </div>
                  <div
                    className="displayCenter"
                    style={{ marginTop: "3px", marginBottom: "3px" }}
                  >
                    <Typography
                      variant="subTitle1"
                      color="primary"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      Receive Amount :
                    </Typography>
                    <Typography
                      variant="subTitle1"
                      color="secondary"
                      className="graytext"
                    >
                      {`${fixDecimal(data?.receiveExchange1)}`}
                      {/* <Tooltiphover
                      amount={data.receiveExchange1}
                      title={"Receive Amount"}
                    /> */}{" "}
                      {data?.base}
                    </Typography>
                  </div>
                  <div className="displayCenter">
                    <Typography
                      variant="subTitle1"
                      color="primary"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      Volume :
                    </Typography>
                    <Typography
                      variant="subTitle1"
                      color="secondary"
                      className="graytext"
                    >
                      {`${fixDecimal(data?.volume1)}`}
                      {/* <Tooltiphover amount={data.volume1} title={"Volume"} /> */}{" "}
                      {data?.base}
                    </Typography>
                  </div>
                  <div className="displayCenter">
                    <Typography
                      variant="subTitle1"
                      color="primary"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      Trading fee :
                    </Typography>
                    <Typography
                      variant="subTitle1"
                      color="secondary"
                      className="graytext"
                    >
                      {`${fixDecimal(data?.tradeFee1)} %`}
                      {/* <Tooltiphover
                      amount={data.tradeFee1}
                      title={"Trading fee"}
                    />{" "} */}
                    </Typography>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* <Box className="displaySpacebetween">
            <Typography variant="h6">Buy</Typography>
            <Typography variant="body2" color="primary" className="smallBold">
              <Tooltiphover
                amount={data.exchange1_price}
                title={`Price on ${data.buy}`}
                isTop={true}
                symbol={data.pair}
              />{" "}
              &nbsp;&nbsp;
              <span style={{ fontSize: "10px" }}>{data.pair}</span>
            </Typography>
            <Image
              height={25}
              width={25}
              quality={100}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              src={
                ExchangeLogo.find(
                  (d) => d.title.toLowerCase() === data.buy.toLowerCase()
                )?.img
              }
              alt=""
              style={{ height: "25px", width: "25px" }}
            />
          </Box> */}
          <Box>
            <Box className="displaySpacebetween">
              <Box className="displayStart">
                <Image
                  height={25}
                  width={25}
                  quality={100}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src={
                    ExchangeLogo.find(
                      (d) => d.title.toLowerCase() === data.sell.toLowerCase()
                    )?.img
                  }
                  alt=""
                  style={{ height: "25px", width: "25px" }}
                />

                <Box ml={2} align="left">
                  <Typography variant="body2" color="primary">
                    {" "}
                    {data.sell}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="primary"
                    className="smallBold"
                  >
                    <Tooltiphover
                      amount={data.exchange2_price}
                      title={`Price on ${data.sell}`}
                      isTop={true}
                      symbol={data?.pair}
                    />{" "}
                    &nbsp;&nbsp;
                    <span
                      style={{
                        fontSize: "10px",
                        margin: "5px 0",
                      }}
                    >
                      {data?.pair}
                    </span>
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" style={{ color: "#FF1010" }}>
                  SELL
                </Typography>
                <Typography
                  variant="body2"
                  style={{ fontSize: "10px", marginTop: "5px" }}
                  color="secondary"
                >
                  {data.base}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Accordion
                style={{
                  background: "transparent",
                  padding: "10px 0 0",
                  boxShadow: "none",
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <AccordionSummary
                    style={{
                      background: "transparent",
                      padding: "10px",
                      boxShadow: "none",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography
                      variant="subTitle1"
                      color="primary"
                      className="smallBold"
                    >
                      {/* {data?.receiveExchange2
                        ? `${fixDecimal(data?.receiveExchange2)}`
                        : ""}{" "} */}
                      <Tooltiphover
                        amount={data.receiveExchange2}
                        title={"Receive Amount"}
                      />{" "}
                      {data.pair}
                    </Typography>
                  </AccordionSummary>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "10px", margin: "3px 0px" }}
                    color="secondary"
                  >
                    {/* ₹3.01 per RFUEL */}
                  </Typography>
                </Box>
                <AccordionDetails
                  style={{
                    padding: "0px",
                    boxShadow: "none",
                    display: "block",
                  }}
                >
                  <Divider />

                  <Box mt={1} mb={1}>
                    <div className="displayCenter">
                      <Typography
                        variant="subTitle1"
                        color="primary"
                        style={{ width: "100%", textAlign: "left" }}
                      >
                        Withdraw Fee :
                      </Typography>
                      <Typography
                        variant="subTitle1"
                        color="primary"
                        className="graytext"
                      >
                        {`${fixDecimal(data?.withdrawFee2)} ${data?.base} `}
                      </Typography>
                    </div>
                    <div
                      className="displayCenter"
                      style={{ marginTop: "3px", marginBottom: "3px" }}
                    >
                      <Typography
                        variant="subTitle1"
                        color="primary"
                        style={{ width: "100%", textAlign: "left" }}
                      >
                        Receive Amount :
                      </Typography>
                      <Typography
                        variant="subTitle1"
                        color="primary"
                        className="graytext"
                      >
                        {`${fixDecimal(data?.receiveExchange2)}`}{" "}
                        {/* <Tooltiphover
                        amount={data.receiveExchange2}
                        title={"Receive Amount"}
                      />{" "} */}
                        {data?.pair}
                      </Typography>
                    </div>
                    <div className="displayCenter">
                      <Typography
                        variant="subTitle1"
                        color="primary"
                        style={{ width: "100%", textAlign: "left" }}
                      >
                        Volume :
                      </Typography>
                      <Typography
                        variant="subTitle1"
                        color="primary"
                        className="graytext"
                      >
                        {data.volume2}{" "}
                        {/* <Tooltiphover amount={data.volume2} title={"Volume"} />{" "} */}
                        {data.pair}
                      </Typography>
                    </div>
                    <div
                      className="displayCenter"
                      style={{ marginTop: "3px", marginBottom: "3px" }}
                    >
                      <Typography
                        variant="subTitle1"
                        color="primary"
                        style={{ width: "100%", textAlign: "left" }}
                      >
                        Trading fee :
                      </Typography>
                      <Typography
                        variant="subTitle1"
                        color="primary"
                        className="graytext"
                      >
                        {`${data?.tradeFee2} %`}
                        {/* <Tooltiphover
                        amount={data.tradeFee2}
                        title={"Trading fee"}
                      />{" "} */}
                      </Typography>
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>

        <Box mt={1} className="arbitrageBox">
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} style={{ textAlign: "left" }} red>
              <Box style={{ marginBottom: "4px" }}>
                <Typography
                  variant="body2"
                  color="secondary"
                  textAlign="left"
                  display={"flex"}
                  whiteSpace={"pre"}
                  className="smallBold"
                >
                  <Tooltiphover
                    amount={data.PercentageProfit}
                    title={"Profit in percentage"}
                    isTop={true}
                  />{" "}
                  % (
                  <Tooltiphover
                    amount={data.profitInUsdt}
                    title={"Profit in USDT"}
                    isTop={true}
                  />{" "}
                  &nbsp; USDT )
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Accordion
            style={{
              background: "transparent",
              padding: "0px 0px 0",
              boxShadow: "none",
            }}
          >
            <div className="displaySpacebetween">
              <AccordionSummary
                style={{
                  background: "transparent",
                  padding: "10px",
                  boxShadow: "none",
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  fontSize="12px"
                  display={"flex"}
                  className="smallBold"
                >
                  Capital
                  {/* {fixDecimal(data?.baseCapital)}% */}&nbsp;
                  <Tooltiphover
                    amount={data.baseCapital}
                    title={"Capital"}
                    symbol={"USDT"}
                  />
                </Typography>
              </AccordionSummary>
            </div>
            <AccordionDetails
              style={{ padding: "0px", boxShadow: "none", display: "block" }}
            >
              <Box mt={1} mb={1}>
                <div className="displayCenter">
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Start Currency:
                  </Typography>
                  <Typography variant="subTitle1" className="graytext">
                    {data.pair}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Capital Amount :
                  </Typography>
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    className="graytext"
                    whiteSpace={"pre"}
                  >
                    {data?.baseCapital}
                    {/* <Tooltiphover
                      amount={data.baseCapital}
                      title={"Capital"}
                      symbol={data.pair}
                    />{" "} */}
                    &nbsp;
                    {data?.pair}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Profit On Capital :
                  </Typography>
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    className="graytext"
                  >
                    {`${fixDecimal(data?.profit)}`}
                    {/* <Tooltiphover
                      amount={data.profit}
                      title={"Profit On Capital"}
                    />{" "} */}
                    &nbsp;
                    {data?.pair}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Profit In USDT :
                  </Typography>
                  <Typography variant="subTitle1" className="graytext">
                    {`${fixDecimal(data?.profitInUsdt)}`}
                    {/* <Tooltiphover
                      amount={data.profitInUsdt}
                      title={"Profit In USDT"}
                    /> */}
                    USDT
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Profit Percentage :
                  </Typography>
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    className="graytext"
                  >
                    {`${fixDecimal(data?.PercentageProfit)} %`}

                    {/* <Tooltiphover
                      amount={data.PercentageProfit}
                      title={"Profit Percentage "}
                    /> */}
                  </Typography>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box align="left" mt={2}>
            {" "}
            {!ExecuteButtonType && (
              <Button
                onClick={() => setIsExchangeLogout(true)}
                variant="contained"
                size="small"
                color="primary"
                className="submitButton"
                style={{ borderRadius: "12px", padding: "9px 37px" }}
              >
                Submit
              </Button>
            )}
          </Box>

          <Popup
            maxWidth="xs"
            open={isExchaneLogout}
            handleClose={() => !isProcessing && setIsExchangeLogout(false)}
            isLoading={isProcessing}
            title="Trade Execution"
            actions={[
              {
                label: "Cancel",
                onClick: () => setIsExchangeLogout(false),
                color: "secondary",
                variant: "contained",
              },
              {
                label: "Confirm",
                onClick: () => tradeProfitPathsDirectHandler(data),
                color: "primary",
                variant: "contained",
              },
            ]}
          >
            <Box
              align="center"
              sx={{
                p: 2,
              }}
            >
              <Typography
                variant="body2"
                color="secondary"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Are you sure you want to execute this trade?
              </Typography>
            </Box>
          </Popup>
        </Box>
        {/* <LiveTracking setOpen={setOpen} open={open} /> */}
      </Paper>
    </DirectCardPaper>
  );
};

export default React.memo(DetailsComponent);
