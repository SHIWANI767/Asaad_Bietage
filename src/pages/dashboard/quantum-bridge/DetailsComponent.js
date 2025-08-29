import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Box, Divider, Grid } from "@mui/material";
import { ExchangeLogo, fixDecimal } from "@/utils";
import Image from "next/image";

const DirectCardPaper = styled(Box)(({ theme, ExecuteButtonType }) => ({
  "& h6": {
    fontSize: "16px",
    color: "#21C763",
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
        ? "rgba(255, 255, 255, 0.05) !important"
        : "rgb(57 47 47 / 5%) !important",
    padding: "0px 13px",
    minHeight: "36px",
    borderRadius: "5px",
    margin: "0px 0 5px",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
    fontSize: "17px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "0px 0 !important",
    color: theme.palette.text.primary,
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
  "& .traclLiveButtonBox": {
    background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
    "@media(max-width:767px)": {
      top: "41px!important",
      right: "10px!important",
      padding: "5px !important",
    },
  },
  "& .MuiDivider-root": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "& .mainClass": {
    padding: "8px 0",
    borderBottom: "1px solid #8080804a",
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

const DetailsComponent = ({ data, ExecuteButtonType, setIsOpenTrade }) => {
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
          <Grid container spacing={1} alignItems="center">
            <Grid
              item
              lg={7}
              md={7}
              sm={7}
              xs={8}
              style={{ textAlign: "left" }}
            >
              <Box style={{ marginBottom: "4px" }}>
                <Typography
                  variant="subTitle1"
                  color="primary"
                  textAlign="left"
                >
                  {fixDecimal(data?.profitPercent)}%{" "}
                  {`(${fixDecimal(data?.profit)} USDT)`}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={4} style={{ textAlign: "end" }}>
              {!ExecuteButtonType && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenTrade(true);
                  }}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
          <Accordion style={{ background: "transparent", boxShadow: "none" }}>
            <div className="displaySpacebetween">
              <AccordionSummary
                style={{ background: "transparent", boxShadow: "none" }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1" color="primary">
                  Capital {fixDecimal(data?.capital)}
                </Typography>
              </AccordionSummary>
            </div>
            <AccordionDetails
              style={{ padding: "0px", boxShadow: "none", display: "block" }}
            >
              <Box mt={1} mb={1}>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Start Currency:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    className="graytext"
                  >
                    {data?.pair}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Capital Amount :
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    className="graytext"
                  >
                    {fixDecimal(data?.capital)} {data?.pair}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Profit On Capital :
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {`${fixDecimal(data?.profit)}`} {data?.pair}
                  </Typography>
                </div>

                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    Profit Percentage :
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    className="graytext"
                  >
                    {`${fixDecimal(data?.profitPercent)} %`}
                  </Typography>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Paper>
    </DirectCardPaper>
  );
};

export default DetailsComponent;

const CardsValues = ({ data, value, i }) => {
  return (
    <Box className="mainClass" mt={1}>
      <Box className="displaySpacebetween">
        <Typography
          variant="h6"
          style={{ color: Object.values(value)[0] !== "buy" && "#FF1010" }}
        >
          {Object.values(value)[0] === "buy" && "BUY"}
          {Object.values(value)[0] !== "buy" && "SELL"}
        </Typography>
        <Typography variant="body2" color="primary">
          {Object.values(value)[0] === "buy"
            ? fixDecimal(value.buyAmount)
            : fixDecimal(value.sellAmount)}{" "}
          &nbsp;&nbsp;
          <span
            style={{
              fontSize: "10px",
            }}
          >
            {value.quoteCurrency}
          </span>
        </Typography>
        <Image
          height={25}
          width={25}
          quality={100}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          src={
            ExchangeLogo.find(
              (d) => d.title.toLowerCase() === data?.exchangeName.toLowerCase()
            )?.img
          }
          alt=""
          style={{ height: "25px", width: "25px" }}
        />
      </Box>
      <Accordion style={{ background: "transparent", boxShadow: "none" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="primary">
            {" "}
            {data?.pair}
          </Typography>
          <Box>
            <AccordionSummary
              style={{ background: "transparent", boxShadow: "none" }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="subTitle1" color="primary">
                {fixDecimal(value.receiveAmount)} {value?.baseCurrency}
              </Typography>
            </AccordionSummary>
            <Typography
              variant="body1"
              style={{ fontSize: "10px", margin: "3px 0px" }}
              color="secondary"
            >
              {value.price ? fixDecimal(value.price) : ""} {value.quoteCurrency}{" "}
              per {value?.baseCurrency}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1"> {data?.buy}</Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "10px", marginTop: "5px" }}
              color="secondary"
            >
              {data?.exchangeName}
            </Typography>
          </Box>
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
