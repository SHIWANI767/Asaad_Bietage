import { Box, IconButton, Paper, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import QRWalletModal from "./QRWalletModal";
import WalletSend from "./WalletSend";
import { dataPostHandler } from "@/api-services/service";
import { fixDecimal, formatDecimal } from "@/utils";
import Image from "next/image";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: "0 0 20px",
  },
  "& .DepositeCardBox": {
    width: "100%",
    // maxWidth: "320px",
    // backgroundColor: "#26262C",
    // backgroundColor: theme.palette.background.default,
    borderRadius: "5px",
    "& .headingBox": {
      // backgroundColor: theme.palette.background.walletHeader,
      borderRadius: "12px 12px 0px 0px",
      padding: "10px",
      "& p": {
        // color: "#000",
        marginLeft: "8px",
      },
      "& h5": {
        fontWeight: 400,
        marginLeft: "8px",
        fontSize: "16px",
      },
      "& .whiteBox": {
        borderRadius: "50%",
        // background: "#FFF",
        width: "20px",
        height: "20px",
        "& img": {
          position: "relative",
          width: "100%",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          objectFit: "cover !important",
        },
      },
      "& .filtersButton": {
        "& .filterIcon1": {
          "& button": {
            background: "#4A4A57 !important",
            width: "37px",
            height: "37px",
            borderRadius: "10px",
            padding: "0px",
            "& svg": {
              position: "absolute",
              // color: "#FFFFFF",
              zIndex: 3,
            },
          },
        },
      },
    },
    "& .contentBox": {
      padding: "10px",
      "& p": {
        // color: "#9090A3",
        [theme.breakpoints.down("sm")]: {
          fontSize: "11px",
        },
      },
      "& .boldText": {
        "& p": {
          // color: "#000",
          fontWeight: 300,
          fontSize: "13px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "11px",
          },
        },
      },
    },
  },
}));

export default function DepositeCard({ data, exchangeName }) {
  const [openWalletRecive, setOpenWalletRecive] = useState(false);
  const [openWalletSend, setOpenWalletSend] = useState(false);
  const [add, setAdd] = useState("");
  const [isDepositLoading, setIsDepositLoading] = useState(false);
  const [errorMess, setErrorMess] = useState(false);
  const getConnectedExchangedata = async (exchangeName, data) => {
    const dataToSend = {
      exchangeId: exchangeName?.trim().toLowerCase(),
      coin: data?.asset,
    };
    try {
      setOpenWalletRecive(true);
      setIsDepositLoading(true);
      const response = await dataPostHandler("deposit", dataToSend);
      if (response.status === 200) {
        setErrorMess(false);
        setAdd(response?.data?.result);
        setIsDepositLoading(false);
      } else {
        setErrorMess(response?.data?.responseMessage);
        setIsDepositLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsDepositLoading(false);
    }
  };
  return (
    <MainBox>
      {" "}
      <Paper elevation={2}>
        <Box className={"DepositeCardBox"}>
          <Box className="headingBox displaySpacebetween">
            <Box className="displayStart">
              <Box className="whiteBox displayCenter">
                <Image
                  height={20}
                  width={20}
                  quality={100}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src={data?.img}
                  alt={data?.asset}
                />
              </Box>
              <Typography variant="h5" color="primary">
                {data.asset}
              </Typography>
              <Typography variant="body2" color="primary">
                ({exchangeName})
              </Typography>
            </Box>
            <Box className={`filtersButton displayEnd`}></Box>
          </Box>
          <Box className="contentBox">
            <Box className="displaySpacebetween">
              {" "}
              <Box className="boldText">
                <Typography variant="body2" color="primary">
                  Available Balance :
                </Typography>
              </Box>
              <Box className="displayStart">
                <Box className="boldText">
                  <Typography variant="body2" color="secondary">
                    {fixDecimal(data?.free)}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="secondary"
                  style={{
                    marginLeft: "8px",
                    fontWeight: 300,
                    fontSize: "12px",
                  }}
                >
                  {data.asset}
                </Typography>
              </Box>
            </Box>
            <Box className="displaySpacebetween">
              {" "}
              <Box className="boldText">
                <Typography variant="body2" color="primary">
                  In Order Balance :
                </Typography>
              </Box>
              <Box className="displayStart">
                <Box className="boldText">
                  <Typography variant="body2" color="secondary">
                    {formatDecimal(data?.locked)}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="secondary"
                  style={{ marginLeft: "8px" }}
                >
                  {/* USDT */}
                </Typography>
              </Box>
            </Box>
            <Box className="displaySpacebetween">
              {" "}
              <Box className="boldText">
                <Typography variant="body2" color="primary">
                  Total Balance :
                </Typography>
              </Box>
              <Box className="displayStart">
                <Box className="boldText">
                  <Typography variant="body2" color="secondary">
                    $ {fixDecimal(data?.total)}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="secondary"
                  style={{ marginLeft: "8px" }}
                >
                  {/* USDT */}
                </Typography>
              </Box>
            </Box>
          </Box>
          {openWalletSend && (
            <WalletSend
              open={openWalletSend}
              setOpen={setOpenWalletSend}
              data={data}
              exchangeName={exchangeName}
            />
          )}
          {openWalletRecive && (
            <QRWalletModal
              open={openWalletRecive}
              setOpen={setOpenWalletRecive}
              data={data}
              exchangeName={exchangeName}
              isDepositLoading={isDepositLoading}
              add={add}
              errorMess={errorMess}
            />
          )}
        </Box>
      </Paper>
    </MainBox>
  );
}
