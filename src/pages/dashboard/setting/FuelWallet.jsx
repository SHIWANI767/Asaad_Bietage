import { Box, Grid, Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import FuelWalletCard from "./FuelWalletCard";
import { useAccount } from "wagmi";
import { CustomConnectWallet } from "@/components/CustomConnectWallet";
import AppContext from "@/context/AppContext";
import { api_configs } from "@/api-services";
import axios from "axios";
import Deposite from "./Deposite";
import WalletDepositFuel from "./WalletDepositFuel";

const FuelWalletBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",

  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
    flexWrap: "wrap",
  },
  "& .tabmainBox": {
    width: "100%",
    padding: "0px !important",
    borderRadius: "0px",
    border: "none",
    background: "transparent",
    borderBottom: "1px solid #80808024",
  },
  "& .tabActiveButtons": {
    cursor: "pointer",
    whiteSpace: "pre",
    fontWeight: "500",
    color: "#000",
    borderRadius: "0px",
    borderBottom: "2px solid",
    borderColor: "#bef856",
    background: "transparent",
    "& h6": {
      fontWeight: 400,
      fontSize: "14px",
      color: "#000",
      background: "linear-gradient(90.73deg, #86E591 2.09%, #B9F65B 34.92%)",
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
  },
  "& .tabButtons": {
    borderRadius: "0px",
    padding: "9px 21px 15px",
    whiteSpace: "pre",
    cursor: "pointer",
    borderBottom: "2px solid",
    borderColor: "transparent",
    "& h6": {
      fontWeight: 400,
      fontSize: "14px",
    },
  },

  "& .tabButton": {
    padding: "9px 21px 15px",
    fontSize: "14px",
    fontWeight: "400",
    // color: "#fff",
    borderRadius: "50px",

    [theme.breakpoints.down("sm")]: {
      padding: "7px 18px",
      fontSize: "10px !important",
      whiteSpace: "pre",
    },
    "&:hover": {
      // color: "#fff",
    },
    "&.active": {
      fontWeight: 400,
      fontSize: "14px",
      color: "#000",
      borderColor: "#bef856",
      background: "linear-gradient(90.73deg, #86E591 2.09%, #B9F65B 34.92%)",
      borderColor: "#bef856",
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
  },
}));

export default function FuelWallet() {
  const token = window.localStorage.getItem("user_token");
  const { getProfileDataHandler, isAdminTab } = useContext(AppContext);
  const [tab, setTab] = useState("Deposit");
  const [page, setPage] = useState(1);
  const [toDate, setToDate] = useState(null);
  const [isLoading1, setIsLoading1] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [openWalletWithdraw, setOpenWalletWithdraw] = useState(false);
  const { address, isConnected, chain } = useAccount();
  // const [toDate, setToDate] = useState(null);
  const [isSearch, setisSearch] = useState(false);
  useEffect(() => {
    getProfileDataHandler();
  }, []);
  const getWithdrawalHistory = async () => {
    setIsLoading1(true);
    setWithdrawalHistory([]);
    let endPoint =
      tab === "Deposit"
        ? api_configs.myFuelWalletHistory
        : api_configs.myFuelWalletDeducteHistory;
    try {
      const paramsData = {
        page: page,
        limit: 15,
        fromDate: fromDate ? fromDate : null,
        toDate: toDate ? toDate : null,
        search: search ? search : null,
      };
      const res = await axios({
        method: "GET",
        url: endPoint,
        headers: {
          token: token,
        },
        params: {
          ...paramsData,
        },
      });
      if (res.data.responseCode === 200) {
        let resultData = res?.data?.result;
        setWithdrawalHistory(resultData?.docs);
        setNoOfPages(resultData?.pages);
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
  console.log(" ---- noOfPages ", noOfPages);
  useEffect(() => {
    getWithdrawalHistory();
  }, [page, isSearch, tab]);
  return (
    <Box style={{ marginTop: "25px" }}>
      <FuelWalletBox>
        <Box className={"displayStart"} pb={2}>
          <CustomConnectWallet /> &nbsp; &nbsp; &nbsp;{" "}
          {isAdminTab && address && isConnected && (
            <Box
              className="filterIcon1"
              sx={{
                "& button": {
                  pointerEvents:
                    !address || !isConnected || !chain?.id ? "none" : "auto",
                },
              }}
            >
              <Button
                className={"tabButton"}
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenWalletWithdraw(true);
                }}
              >
                Withdraw Fuel Wallet
              </Button>
            </Box>
          )}
        </Box>

        <Paper elevation={2} className="filterpaperBox">
          <FuelWalletCard
            setIsSubmit={() => setisSearch(!isSearch)}
            // isSubmit={isSubmit}
          />
        </Paper>

        {!isAdminTab && (
          <Box className={"mywalletBox"}>
            <Box mb={2} mt={2}>
              <Box elevation={2} className="tabmainBox">
                <Box className="tabBox">
                  <Button
                    className={`tabButton ${tab === "Deposit" ? "active" : ""}`}
                    onClick={() => {
                      setTab("Deposit");
                      setPage(1);
                    }}
                  >
                    Fuel Deposit
                  </Button>{" "}
                  <Button
                    className={`tabButton ${
                      tab === "Withdrawal" ? "active" : ""
                    }`}
                    onClick={() => {
                      setTab("Withdrawal");
                      setPage(1);
                    }}
                  >
                    Fuel Deduct
                  </Button>
                </Box>
              </Box>
            </Box>
            <Paper elevation={2}>
              <Deposite
                isLoading={isLoading1}
                withdrawalHistory={withdrawalHistory}
                setNoOfPages={setNoOfPages}
                page={page}
                setPage={setPage}
                isDeposit={tab === "Deposit"}
                noOfPages={noOfPages}
              />
            </Paper>
          </Box>
        )}
      </FuelWalletBox>
      {openWalletWithdraw && (
        <WalletDepositFuel
          open={openWalletWithdraw}
          callBack={() => {
            setOpenWalletWithdraw(false);
            // setIsSubmit();
          }}
          isWithdraw={true}
        />
      )}
    </Box>
  );
}
FuelWallet.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
