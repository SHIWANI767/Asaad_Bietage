import { Box, Typography, IconButton, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import { capitalizeFirstLetter, sortAddress, setCryptoDecimals } from "@/utils";
import { toast } from "react-hot-toast";
import { AiOutlineCopy } from "react-icons/ai";
import { CheckOutlined } from "@mui/icons-material";

const TransactionBox = styled("div")(({ theme }) => ({
  "& .tabmainBox": {
    width: "fit-content",
    padding: "5px !important",
    borderRadius: "44px",
    border: "none",
  },
  "& .transactionBox": {
    position: "relative",
    zIndex: "999",
    "& .mainTab": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      borderRadius: "50px",
      flexWrap: "wrap",
    },
    "& .tabActiveButtons": {
      padding: "9px 25px",
      cursor: "pointer",
      whiteSpace: "pre",
      fontWeight: "500",
      color: "#000",
      borderRadius: "50px",
      border: "2px solid",
      borderColor: "transparent",
      background: "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%)",
      //   "& h6": {
      //     fontWeight: 400,
      //     fontSize: "14px",
      //     color: "#000",
      //   },
      //   [theme.breakpoints.down("sm")]: {
      //     padding: "5px 20px",
      //     "& h6": {
      //       fontSize: "12px !important",
      //     },
      //     "& p": {
      //       fontSize: "10px !important",
      //     },
      //   },
    },
    "& .tabButtons": {
      borderRadius: "10px",
      padding: "9px 25px",
      whiteSpace: "pre",
      cursor: "pointer",
      //   "& h6": {
      //     fontWeight: 400,
      //     fontSize: "14px",
      //   },
      //   [theme.breakpoints.down("sm")]: {
      //     padding: "5px 20px",
      //     "& h6": {
      //       fontSize: "12px !important",
      //     },
      //   },
    },
    // "& h4": {
    //   fontWeight: 700,
    // },
  },
  "& .tableBox": {
    minWidth: "800px",
  },
  "& .cardBox": {
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #cccccc36",
    background: "#33323882",
    marginBottom: "10px",
  },
  "& .contentBox": {
    textAlign: "right",
    width: "100%",
  },
}));

export default function SubDetailCard({ item, index }) {
  const [copied, setCopied] = useState(false);
  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };
  const [copied1, setCopied1] = useState(false);
  const handleCopyClick1 = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied!");
        setCopied1(true);
        setTimeout(() => setCopied1(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };
  return (
    <TransactionBox>
      <Box className="cardBox" key={`cccc${index}`}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
            <Typography variant="body1">Type</Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography
                variant="body1"
                style={
                  item.action === "buy" ? { color: "green" } : { color: "red" }
                }
              >
                {item && item.action && capitalizeFirstLetter(item.action)}
              </Typography>
            </Box>
          </Grid>
          {item && item.coinName && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Pair</Typography>
            </Grid>
          )}
          {item && item.coinName && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.baseCurrency &&
                    item.quoteCurrency &&
                    `${item.baseCurrency}/${item.quoteCurrency}`}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.exchange && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Exchange</Typography>
            </Grid>
          )}
          {item && item.exchange && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.exchange &&
                    capitalizeFirstLetter(item.exchange)}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
            <Typography variant="body1">Price</Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography variant="body1">
                {item && item.price && setCryptoDecimals(item.price)}
              </Typography>
            </Box>
          </Grid>
          {item && item.amount && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Amount</Typography>
            </Grid>
          )}
          {item && item.amount && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item && item.amount && setCryptoDecimals(item.amount)}
                </Typography>
              </Box>
            </Grid>
          )}

          {item && item.buyStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Buy Status</Typography>
            </Grid>
          )}
          {item && item.buyStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.buyStatus &&
                    capitalizeFirstLetter(item.buyStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
            <Typography variant="body1">Traded</Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography variant="body1">
                {item && item.isTrade ? "YES" : "NO"}
              </Typography>
            </Box>
          </Grid>
          {item && item.isWithdraw !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Withdrawed</Typography>
            </Grid>
          )}
          {item && item.isWithdraw !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item && item.isWithdraw ? "YES" : "NO"}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.isDeposit !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Withdrawed</Typography>
            </Grid>
          )}
          {item && item.isDeposit !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item && item.isDeposit ? "YES" : "NO"}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.orderId && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Order Id</Typography>
            </Grid>
          )}
          {item && item.orderId && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {item &&
                    item.orderId &&
                    sortAddress(item?.orderId?.toString())}
                  {copied ? (
                    <IconButton disabled>
                      <CheckOutlined
                        style={{
                          fontSize: "15px",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{ padding: 0, height: 0 }}
                      onClick={() => handleCopyClick(item?.orderId?.toString())}
                    >
                      <AiOutlineCopy
                        style={{
                          cursor: "pointer",
                          fontSize: "15px",
                        }}
                      />
                    </IconButton>
                  )}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.withdrawId && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Withdraw Id</Typography>
            </Grid>
          )}
          {item && item.withdrawId && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.withdrawId &&
                    sortAddress(item?.withdrawId?.toString())}

                  <IconButton>
                    <img
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      src="images/copyimg.png"
                      onClick={() => toast.success("Copied")}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        width: "15px",
                      }}
                    />
                  </IconButton>
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.address && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Address</Typography>
            </Grid>
          )}
          {item && item.address && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {item &&
                    item.address &&
                    sortAddress(item?.address?.toString())}
                  {copied1 ? (
                    <IconButton disabled>
                      <CheckOutlined
                        style={{
                          fontSize: "15px",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() =>
                        handleCopyClick1(item?.address?.toString())
                      }
                      sx={{ padding: 0, height: 0 }}
                    >
                      <AiOutlineCopy
                        style={{
                          cursor: "pointer",
                          fontSize: "15px",
                        }}
                      />
                    </IconButton>
                  )}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.sellStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Sell Status</Typography>
            </Grid>
          )}
          {item && item.sellStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.sellStatus &&
                    capitalizeFirstLetter(item?.sellStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.depositStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Deposit Status</Typography>
            </Grid>
          )}
          {item && item.depositStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.depositStatus &&
                    capitalizeFirstLetter(item?.depositStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.status && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Status</Typography>
            </Grid>
          )}
          {item && item.status && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item && item.status && capitalizeFirstLetter(item?.status)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.receiveAmount && (
            <Grid item lg={6} sm={6} md={6} xs={6} alignContent="left">
              <Typography variant="body1">Receive Amount</Typography>
            </Grid>
          )}
          {item && item.receiveAmount && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body1">
                  {item &&
                    item.receiveAmount &&
                    setCryptoDecimals(item?.receiveAmount)}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </TransactionBox>
  );
}
