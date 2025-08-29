"use client";
import { Paper, Typography, Box, Grid, styled } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import axios from "axios";
import { api_configs } from "@/api-services";
import { dataPostHandler } from "@/api-services/service";
import DataLoader from "@/components/DataLoader";
import { ExchangeArray, funConEx, getCoinImageDatahandler } from "@/utils";
import MainFilter from "./MainFilter";
import Image from "next/image";
import AppContext from "@/context/AppContext";
import dynamic from "next/dynamic";
// const CustomHead = dynamic(() => import("@/components/CustomHead"));
const NoDataFoundFrame = dynamic(() => import("@/components/NoDataFoundFrame"));
const NoExchangeAdd = dynamic(() => import("@/components/NoExchangeAdd"));
const DepositeCard = dynamic(() => import("./DepositeCard"));
const Deposite = dynamic(() => import("./Deposite"));
const WithdrawHistory = dynamic(() => import("./WithdrawHistory"));

// import NoDataFoundFrame from "@/components/NoDataFoundFrame";
// import NoExchangeAdd from "@/components/NoExchangeAdd";
// import Deposite from "./Deposite";
// import WithdrawHistory from "./WithdrawHistory";
// import DepositeCard from "./DepositeCard";

const MyWalletBox = styled("div")(({ theme }) => ({
  "& .mywalletBox": {
    position: "relative",
    zIndex: "999",
    "& .historyBox": {
      padding: "20px 0px 0px",
    },
    "& .tabmainBox": {
      width: "100%",
      padding: "0px !important",
      borderRadius: "0px",
      border: "none",
      background: "transparent",
      borderBottom: "1px solid #80808024",
    },
    "& .mainTab": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      borderRadius: "50px",

      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
    },
    "& .tabActiveButtons": {
      padding: "9px 21px 15px",
      cursor: "pointer",
      whiteSpace: "pre",
      fontWeight: "500",
      color: "#000",
      borderRadius: "0px",
      borderBottom: "2px solid",
      borderColor: theme.palette.text.green,
      background: "transparent",
      "& h6": {
        fontWeight: 400,
        fontSize: "14px",
        color: "#000",
        background: theme.palette.text.green,

        WebkitBackgroundClip: "text",
        color: "transparent",
      },
    },
    "& .tabButtons": {
      borderRadius: "10px",
      padding: "9px 21px 15px",
      whiteSpace: "pre",
      cursor: "pointer",
      border: "2px solid",
      borderColor: "transparent",
      "& h6": {
        fontWeight: 400,
        fontSize: "14px",
        color: theme.palette.text.primary,
      },
    },
  },
  "& .TitleBox": {
    "& h4": {
      color: "#fff",
      fontWeight: "700",
      fontSize: "27px",
    },
  },
  "& .root": {
    width: "100%",
    marginTop: "20px",
  },
  "& .AccordionBox": {
    color: "#fff",
    "& .icon1": {
      "& .MuiIconButton-root": {
        background: "#008000",
        padding: "6px",
      },
    },
    "& .icon2": {
      "& .MuiIconButton-root": {
        background: "#FF0000",
        padding: "6px",
      },
    },
  },
  "& .heading": {
    fontFamily: "'Inter'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
    padding: "12px",
  },
  "& .mainBoxClass": {
    "& .headingBox": {
      background: "linear-gradient(hsla(0,1%,50%,.07),hsla(0,3%,48%,.07))",
      borderRadius: "5px 5px 0px 0px",
      padding: "10px",
      "& p": {
        color: "#9090A3",
        marginLeft: "8px",
      },
      "& h5": {
        fontWeight: 700,
        marginLeft: "8px",
      },
      "& .whiteBox": {
        borderRadius: "50%",
        background: "#FFF",
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
        "& .filterIcon": {
          "& button": {
            background: "#4A4A57 !important",
            width: "37px",
            height: "37px",
            borderRadius: "10px",
            padding: "0px",
            "& svg": {
              position: "absolute",
              color: "#FFFFFF",
              zIndex: 3,
            },
          },
        },
      },
    },
    "& h5": {
      fontWeight: 700,
    },
    "& .MuiCollapse-wrapperInner": {
      padding: "10px 10px 10px 0px !important",
    },
    "& .MuiAccordionDetails-root": {
      overflowX: "auto",
      overflowY: "hidden",
      padding: "0px",
      margin: "8px 10px",
    },
    "& .MuiAccordion-root:before": {
      top: "0px",
      height: "0px",
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "0px 0px !important",
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "0px !important",
    },
  },
}));

export default function Mywallet() {
  const auth = useContext(AppContext);
  const token = window.localStorage.getItem("user_token");
  const [tab, setTab] = useState("Deposit");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(true);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [exchanges, setExchanges] = useState("1");
  const [search, setSearch] = useState("");
  const [isSearch, setisSearch] = useState(false);
  const [noOfPages, setNoOfPages] = useState(1);
  const [connectExchangeBalanceList, setConnectedExchangeBalanceList] =
    useState({});
  const [page, setPage] = useState(1);
  const [toDate, setToDate] = useState(null);
  const [coinImageData, setCoinImageData] = useState([]);
  const [fromDate, setFromDate] = useState(null);

  const getConnectedExchangeBalanceList = async () => {
    try {
      setIsLoading(true);
      const response = await dataPostHandler("exchangeBalance");
      if (response) {
        setIsLoading(false);
        setConnectedExchangeBalanceList(response?.data?.result);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async () => {
    try {
      // setIsLoading(true);
      // const response = await dataPostHandler("exchangeBalance");
      const coinImgArry = await getCoinImageDatahandler();
      if (coinImgArry?.length !== 0) {
        // setIsLoading(false);
        setCoinImageData(coinImgArry);
        // setConnectedExchangeBalanceList(response?.data?.result);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnectedExchangeBalanceList();
    getImages();
  }, []);

  const getWithdrawalHistory = async () => {
    setIsLoading1(true);
    try {
      const paramsData = {
        type: tab === "Deposit" ? "DEPOSITE" : "WITHDRAW",
        page: page,
        limit: 15,
        fromDate: fromDate ? fromDate : null,
        toDate: toDate ? toDate : null,
        search: search ? search : null,
      };
      const exhangeState = exchanges !== "1" ? { exchangeName: exchanges } : {};
      const res = await axios({
        method: "GET",
        url: api_configs.withdrawDepositeHistory,
        headers: {
          token: token,
        },
        params: {
          ...paramsData,
          ...exhangeState,
        },
      });
      if (res.data.responseCode === 200) {
        setWithdrawalHistory(res?.data?.result?.docs);
        setNoOfPages(res?.data?.result?.pages);
        setIsLoading1(false);
      } else {
        setWithdrawalHistory([]);
      }
    } catch (error) {
      setWithdrawalHistory([]);
      console.log(error);
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    getWithdrawalHistory();
  }, [isSearch, tab]);

  function coinImage(value) {
    let newArray = [];
    for (let i = 0; i < value?.length; i++) {
      for (let j = 0; j < coinImageData?.length; j++) {
        if (value[i]?.asset == coinImageData[j]?.symbol.toUpperCase()) {
          newArray.push({ ...value[i], img: coinImageData[j]?.image });
        }
      }
    }
    return newArray;
  }
  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Wallet History");
    }
  }, []);
  return (
    <MyWalletBox>
      <Box className={"mainBoxClass"}>
        {isLoading && <DataLoader />}
        {!isLoading && connectExchangeBalanceList.length === 0 && (
          <Box className={"displayFlexCenter"}>
            <NoExchangeAdd />
          </Box>
        )}
        {connectExchangeBalanceList &&
          connectExchangeBalanceList?.responseResult &&
          funConEx(connectExchangeBalanceList?.responseResult)?.map(
            (data, index) => {
              return (
                <Box pt={1} pb={1}>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    className="headingBox"
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        height={35}
                        width={35}
                        quality={100}
                        src={data?.img}
                        alt={data?.exchangeName}
                      />
                      <Typography
                        className={"heading"}
                        variant="body2"
                        color="primary"
                      >
                        {data && data?.exchangeName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography className={"heading"}>
                        $
                        {data &&
                          data?.AccountBalance &&
                          data?.AccountBalance[
                            data?.AccountBalance?.length - 1
                          ] &&
                          data?.AccountBalance[data?.AccountBalance?.length - 1]
                            .totalBalance}
                      </Typography>
                    </Box>
                  </Box>
                  <Box pt={1}>
                    <Grid container spacing={2}>
                      {data &&
                        data?.AccountBalance &&
                        coinImage(data?.AccountBalance)?.map((item, indx) => (
                          <Grid item lg={3} md={4} sm={4} xs={12}>
                            <DepositeCard
                              data={item}
                              _id={data?._id}
                              index={indx}
                              exchangeName={data?.exchangeName}
                            />
                          </Grid>
                        ))}
                      {data && !data?.AccountBalance && (
                        <NoDataFoundFrame
                          data={`The wallet has not been fetched or connected.`}
                        />
                      )}
                    </Grid>
                  </Box>
                </Box>
              );
            }
          )}
      </Box>
      <Box className={"mywalletBox"}>
        <Box mb={2} mt={2}>
          <Paper elevation={2} className="tabmainBox displayStart">
            <Box
              onClick={() => setTab("Deposit")}
              className={tab === "Deposit" ? "tabActiveButtons" : "tabButtons"}
            >
              <Typography variant="h6"> Deposit</Typography>
            </Box>
            <Box
              onClick={() => setTab("Withdrawal")}
              className={
                tab === "Withdrawal" ? "tabActiveButtons" : "tabButtons"
              }
            >
              <Typography variant="h6">Withdrawal</Typography>
            </Box>
          </Paper>
        </Box>
        <Paper elevation={2}>
          <MainFilter
            setSearch={setSearch}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setExchanges={setExchanges}
            setisSearch={(e) => setisSearch(e)}
            isSearch={isSearch}
            exchanges={exchanges}
            toDate={toDate}
            fromDate={fromDate}
            search={search}
            type="wallet"
            excelData={withdrawalHistory}
            fileName={
              tab === "Deposit" ? "Deposit_history" : "Withdrawal_history"
            }
            searchPlaceHolder="Search by coin name"
          />
          {tab === "Deposit" && (
            <Deposite
              isLoading={isLoading1}
              withdrawalHistory={withdrawalHistory}
              setNoOfPages={setNoOfPages}
              page={page}
              setPage={setPage}
            />
          )}
          {tab === "Withdrawal" && (
            <WithdrawHistory
              isLoading={isLoading1}
              withdrawalHistory={withdrawalHistory}
              setNoOfPages={setNoOfPages}
              page={page}
              setPage={setPage}
            />
          )}
        </Paper>
      </Box>
    </MyWalletBox>
  );
}

Mywallet.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
