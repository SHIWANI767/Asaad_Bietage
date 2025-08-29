"use client";
import {
  Box,
  Typography,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { api_configs } from "@/api-services";
import { styled } from "@mui/material";
import DashboardLayout from "@/layout/DashboardLayout";
import { funConEx, getCoinImageDatahandler } from "@/utils";
import Image from "next/image";
import dynamic from "next/dynamic";
const CustomHead = dynamic(() => import("@/components/CustomHead"));
const TableComp = dynamic(() => import("@/components/TableComp"));
const SortAddress = dynamic(() => import("@/utils/SortAddress"));
const GenerateAddress = dynamic(() => import("./GenerateAddress"));
import AppContext from "@/context/AppContext";
// import CustomHead from "@/components/CustomHead";
// import GenerateAddress from "./GenerateAddress";
// import TableComp from "@/components/TableComp";
// import SortAddress from "@/utils/SortAddress";

const UserManagementBox = styled("div")(({ theme }) => ({
  "& inviteBox": {
    position: "relative",
    zIndex: "999",
    "& .MuiIconButton-root": {
      padding: "0px",
    },
    "& .typoBox": {
      padding: "10px 0px 30px",
    },
    "& .invitebutton": {
      marginRight: "-13px",
      padding: "24px 39px",
    },
    "& .paperBox": {
      padding: "80px 30px",
      boredrRadius: "5px",
    },
    "& .invitelistBox": {
      padding: "30px 0px 10px",
      display: "flex",
      justifyContent: "space-between",
      textAlign: "center",
    },
    "& p": {
      color: theme.palette.text.primary,
    },
    "& .tablepadding": {
      margin: "50px 0px 20px",
      [theme.breakpoints.down("xs")]: {
        margin: "20px 0px",
      },
    },
  },
}));
const tableHead = [
  {
    heading: "Coin",
  },
  {
    heading: "Address",
    // isCopy: true,
  },
  {
    heading: "Network",
  },
  {
    heading: "Exchange",
  },
];
const boxDisplay = {
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
};
export default function UserManagement() {
  const auth = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = window.localStorage.getItem("user_token");
  const [whiteList, setinvitePlan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [coinImageData, setCoinImageData] = useState([]);
  const getConnectedExchangeBalanceList = async () => {
    try {
      const coinImgArry = await getCoinImageDatahandler();
      GetWhiteListeHandle();
      if (coinImgArry?.length !== 0) {
        setCoinImageData(coinImgArry);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetWhiteListeHandle = async (value) => {
    try {
      setinvitePlan([]);
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: api_configs.getWithdrawAddress,
        headers: {
          token: token,
        },
      }).then(async (res) => {
        if (res.data.responseCode === 200) {
          let dataReponse = res.data.result.flatMap((exchange) =>
            exchange.address.map((address) => ({
              ...address,
              exchangeName: exchange.exchangeName,
            }))
          );
          setinvitePlan(dataReponse);
          setIsLoading(false);
        }
        setIsLoading(false);
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getConnectedExchangeBalanceList();
  }, []);
  function coinImage(value) {
    let newArray = [];
    for (let i = 0; i < value?.length; i++) {
      for (let j = 0; j < coinImageData?.length; j++) {
        if (value[i]?.coinName == coinImageData[j]?.symbol.toUpperCase()) {
          newArray.push({ ...value[i], coinImg: coinImageData[j]?.image });
        }
      }
    }
    return newArray;
  }
  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Whitelist Details");
    }
  }, []);
  return (
    <UserManagementBox>
      <CustomHead
        title="Whitelist details | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="inviteBox">
        <Box className="invitelistBox displaySpacebetween" mb={1}>
          <Typography mb={1} variant="h5" color="primary">
            Exchange Coin
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Generate
          </Button>
        </Box>
        <Paper elevation={2}>
          <TableComp
            tableHead={
              isMobile
                ? tableHead.filter((value) => value.heading !== "Network")
                : tableHead
            }
            isMobileAdaptive={false}
            scoreListData={
              whiteList &&
              coinImage(funConEx(whiteList))?.map((value, index) => ({
                Coin: (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={boxDisplay}>
                      <Image
                        height={isMobile ? 14 : 20}
                        width={isMobile ? 14 : 20}
                        src={value?.coinImg}
                        alt=""
                      />{" "}
                      &nbsp; {value.coinName && value.coinName}{" "}
                    </Box>
                    {/* {isMobile
                    ? ` ${
                        value?.network
                          ? value?.network?.incluede
                            ? value?.network.split("(")[1].split(")")[0]
                            : value?.network
                          : "-"
                      }`
                    : ""} */}
                  </Box>
                ),
                Address: (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={boxDisplay}>
                      <SortAddress address={value?.address} />
                      {/* {value.address && value.address}  */}
                    </Box>
                    {isMobile
                      ? `${
                          value?.network
                            ? value?.network?.incluede
                              ? value?.network.split("(")[1].split(")")[0]
                              : value?.network
                            : "-"
                        }`
                      : ""}
                  </Box>
                ),
                // Address: value?.address?.toString(),
                Network: value?.network ? value?.network : "-",
                Exchange: (
                  <Box sx={boxDisplay}>
                    <Image
                      height={isMobile ? 14 : 20}
                      width={isMobile ? 14 : 20}
                      // sx={{
                      //   height: isMobile ? 14 : 20,
                      //   width: isMobile ? 14 : 20,
                      // }}
                      src={value?.img}
                      alt=""
                    />{" "}
                    &nbsp; {value.exchangeName && value.exchangeName}
                  </Box>
                ),
              }))
            }
            noOfPages={"numPages"}
            noOfTotalPages={"numPages"}
            page={"page"}
            setPage={"setPage"}
            limit={10}
            isLoading={isLoading}
            color="primary"
            maxHeight="calc(100dvh - 295px)"
            NoDataFoundText="Whitelist Details not added"
          />
        </Paper>
      </Box>
      {open && (
        <GenerateAddress
          setOpen={setOpen}
          open={open}
          callBack={GetWhiteListeHandle}
        />
      )}
    </UserManagementBox>
  );
}

UserManagement.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
