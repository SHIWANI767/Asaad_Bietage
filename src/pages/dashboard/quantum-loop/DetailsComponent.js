import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Box, Divider, Grid } from "@mui/material";
import { ExchangeLogo, fixDecimal, formatNumberInteger } from "@/utils";
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
    padding: "0px 0",
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
}));

const DetailsComponent = ({ data, ExecuteButtonType, tradeApi }) => {
  const [isExchaneLogout, setIsExchangeLogout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = window.localStorage.getItem("user_token");

  const tradeProfitPathsDirectHandler = async (value) => {
    try {
      setIsProcessing(true);
      const dataToSend = {
        exchangeName: value.exchangeName,
        capital: value.capital,
        start: value.start,
        expectedProfit: value.profit,
        strategy: value.coins,
        capitalInUSDT: value.capitalInUSDT,
      };
      const response = await axios({
        method: "POST",
        url: api_configs[
          tradeApi === "intra"
            ? "tradeProfitPathsIntraArb"
            : "tradeProfitPathsTriangular"
        ],
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.status == 200) {
        toast.success(response.data?.responseMessage);
        setIsExchangeLogout(false);
      } else {
        toast.error(response.data?.responseMessage);
      }
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      if (error.response) {
        toast.error(error.response.data?.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <DirectCardPaper elevation={2} ExecuteButtonType={ExecuteButtonType}>
      <Paper elevation={2}>
        {data?.coins &&
          data?.coins.map((value, i) => {
            return (
              <>
                <CardsValues
                  data={data}
                  value={value}
                  i={i}
                  key={`coins${i}`}
                />
              </>
            );
          })}
        <Box mt={1} className="arbitrageBox">
          <Divider />
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <Box style={{ marginBottom: "4px" }} pt={2}>
                <Typography
                  variant="body1"
                  color="secondary"
                  textAlign="left"
                  className="smallBold"
                  fontSize="14px"
                >
                  {/* {fixDecimal(data?.profitPercent)}%{" "}
                  {`(${fixDecimal(data?.profit)} USDT)`} */}
                  <Tooltiphover
                    amount={data?.profitPercent}
                    title={`Profit in percentage`}
                    isTop={true}
                    symbol={"%"}
                  />{" "}
                  % ({" "}
                  <Tooltiphover
                    amount={data?.profit}
                    title={`Profit in USDT`}
                    isTop={true}
                    symbol={"USDT"}
                  />{" "}
                  USDT)
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Accordion
            style={{
              background: "transparent",
              padding: "10px 0",
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
                  variant="subTitle1"
                  color="primary"
                  className="smallBold"
                >
                  Capital &nbsp;
                  {/* {fixDecimal(data?.capital)} */}
                  <Tooltiphover
                    amount={data?.capital}
                    title={`Capital Amount`}
                    // isTop={true}
                    symbol="USDT"
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
                  <Typography
                    variant="subTitle1"
                    color="primary"
                    className="graytext"
                  >
                    {data?.start}
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
                  >
                    {formatNumberInteger(data?.capital || 0, 8)} {data?.start}
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
                  <Typography variant="subTitle1" className="graytext">
                    {`${fixDecimal(data?.profit)}`} (USDT)
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
                    {`${fixDecimal(data?.profitPercent)} %`}
                    {/* <Tooltiphover
              amount={data?.profitPercent}
              title={`Buy Amount on ${data?.exchangeName.toLowerCase()}`}
              isTop={true}
              symbol={value?.quoteCurrency}
            /> */}
                  </Typography>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box align="left">
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
            title="Trade Execution"
            isLoading={isProcessing}
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
      </Paper>
    </DirectCardPaper>
  );
};

export default React.memo(DetailsComponent);

const CardsValues = ({ data, value, i }) => {
  return (
    <Box className="mainClass" mt={1}>
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
                  (d) =>
                    d.title.toLowerCase() === data?.exchangeName.toLowerCase()
                )?.img
              }
              alt=""
              style={{ height: "25px", width: "25px" }}
            />
            <Box ml={2} align="left">
              <Typography variant="body2 " style={{ fontSize: "11px" }}>
                {data?.exchangeName}
              </Typography>
              <Typography variant="body2" color="primary" className="smallBold">
                {Object.values(value)[0] === "buy" ? (
                  <Tooltiphover
                    amount={value?.buyAmount}
                    title={`Buy Amount on ${data?.exchangeName.toLowerCase()}`}
                    isTop={true}
                    symbol={value?.quoteCurrency}
                  />
                ) : (
                  <Tooltiphover
                    amount={value?.sellAmount}
                    title={`Sell Amount on ${data?.exchangeName.toLowerCase()} `}
                    isTop={true}
                    symbol={value?.quoteCurrency}
                  />
                )}{" "}
                &nbsp;
                <span
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {data.quoteCurrency}
                </span>
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              style={{ color: Object.values(value)[0] !== "buy" && "#FF1010" }}
            >
              {Object.values(value)[0] === "buy" ? "BUY" : "SELL"}
            </Typography>

            <Typography variant="body2" color="primary" className="smallBold">
              {" "}
              {Object.values(value)[0] === "buy"
                ? value?.baseCurrency
                : value?.quoteCurrency}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body1"
          style={{
            fontSize: "9px",
            margin: "3px 0px",
            textAlign: "left",
            fontWeight: 600,
          }}
          color="secondary"
          // className="smallBold"
        >
          {/* {value.price ? fixDecimal(value.price) : ""}  */}
          <Tooltiphover
            amount={value?.price}
            title={`Buy Amount on ${data?.exchangeName.toLowerCase()}`}
            isTop={true}
            symbol={value?.baseCurrency}
          />{" "}
          {value?.baseCurrency} per {value.quoteCurrency}
        </Typography>
      </Box>

      <Accordion
        style={{
          background: "transparent",
          padding: "10px 0",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          style={{
            background: "transparent",
            padding: "10px",
            boxShadow: "none",
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="subTitle1" color="primary" className="smallBold">
            {/* {fixDecimal(value.receiveAmount)}  */}
            <Tooltiphover
              amount={value?.receiveAmount}
              title={`Receive Amount on ${data?.exchangeName.toLowerCase()}`}
              symbol={value?.baseCurrency}
            />{" "}
            {value?.baseCurrency}
          </Typography>
        </AccordionSummary>

        <AccordionDetails
          style={{ padding: "10px", boxShadow: "none", display: "block" }}
        >
          <Divider />
          <Box mt={1} mb={1}>
            <div className="displayCenter">
              <Typography
                variant="subTitle1"
                color="primary"
                style={{ width: "100%", textAlign: "left" }}
              >
                Buy price:
              </Typography>
              <Typography
                variant="subTitle1"
                color="primary"
                className="graytext"
              >
                {value?.price ? value?.price : "--"}
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
                Trading charges:
              </Typography>
              <Typography
                variant="subTitle1"
                color="primary"
                className="graytext"
              >
                {value?.fees ? value?.fees : "--"}
              </Typography>
            </div>
            <div className="displayCenter">
              <Typography
                variant="subTitle1"
                color="primary"
                style={{ width: "100%", textAlign: "left" }}
              >
                Final buy price:
              </Typography>
              <Typography
                variant="subTitle1"
                color="primary"
                className="graytext"
              >
                {value?.finalPrice ? value?.finalPrice : "--"}
              </Typography>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
