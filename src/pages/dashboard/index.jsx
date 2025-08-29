"user client";
import {
  Box,
  Typography,
  Grid,
  Paper,
  styled,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api_configs } from "@/api-services";
import { TfiBarChart } from "react-icons/tfi";
import Image from "next/image";
import AppContext from "@/context/AppContext";
import DashboardLayout from "@/layout/DashboardLayout";
import dynamic from "next/dynamic";
import RecenetGraph from "@/components/RecenetGraph";
import Doutgraph from "@/components/Doutgraph";
import DashboardTransactionTable from "@/components/DashboardTransactionTable";
import DashboardTable from "./DashboardTable";
import LineChart from "@/components/LineChat";
import { formatNumberInteger, getISODate } from "@/utils";
import { GoArrowDownRight } from "react-icons/go";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Example icons

const CustomHead = dynamic(() => import("@/components/CustomHead"));
const SortAddress = dynamic(() => import("@/utils/SortAddress"));
const CombinedExtendedProfits = dynamic(() =>
  import("./ExtendedProfit/CombinedExtendedProfits")
);
const PerformingCryptoAssests = dynamic(() =>
  import("./performingCryptoAssests/PerformingCryptoAssests")
);
const TopCryptoAsset = dynamic(() => import("./ExtendedProfit/TopCryptoAsset"));
const RecentTotalProfile = dynamic(() =>
  import("./recentTotalProfile/RecentTotalProfile")
);
// const DashboardLayout = dynamic(() =>import())
// import CustomHead from "@/components/CustomHead";
// import SortAddress from "@/utils/SortAddress";
// import CombinedExtendedProfits from "./ExtendedProfit/CombinedExtendedProfits";
// import PerformingCryptoAssests from "./performingCryptoAssests/PerformingCryptoAssests";
// import TopCryptoAsset from "./ExtendedProfit/TopCryptoAsset";
// import RecentTotalProfile from "./recentTotalProfile/RecentTotalProfile";

const DashboardPage = styled("div")(({ theme }) => ({
  "& .paperContainer": {
    padding: "15px",
  },
  "& h5": {
    fontWeight: 500,
    fontSize: "15px",
  },
  "& p": {
    color: theme.palette.text.secondary,
  },
  "& svg": {
    color: theme.palette.text.secondary,
  },

  "& .percentagevalueText": {
    color: theme.palette.text.green,
    fontSize: "13px !important",
    fontWeight: "200 !important",
  },
  "& .mainDashboardCardBox": {
    "& h2": {
      fontSize: "24px",
      lineHeight: "20px",
      marginTop: "6px",
      fontWeight: 500,
    },
    "& .walletCard": {
      borderRadius: "10px",
      "& h5": {
        fontWeight: 500,
        lineHeight: "25px",
        fontSize: "15px",
        [theme.breakpoints.down("lg")]: {
          fontSize: "16px",
          lineHeight: "20px",
        },
        [theme.breakpoints.down("md")]: {
          fontSize: "16px",
          lineHeight: "20px",
        },
      },

      "& p": {
        fontSize: "13px",
        fontWeight: 400,
        // color: "#fffc",
        marginBottom: "0px",
        [theme.breakpoints.down("lg")]: {
          fontSize: "12px",
        },
      },
      "& .displayStart": {
        alignItems: "flex-start",

        display: "flex",
        justifyContent: "flex-start",
      },
    },
  },
}));
const graphData = {
  scores: [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 20 },
    { month: "Mar", value: 15 },
    { month: "Apr", value: 25 },
    { month: "May", value: 30 },
  ],
  followers: [
    { month: "Jan", value: 5000 },
    { month: "Feb", value: 7000 },
    { month: "Mar", value: 8000 },
    { month: "Apr", value: 6000 },
    { month: "May", value: 10000 },
  ],
};

export default function DashdoardHome() {
  const auth = useContext(AppContext);

  const token = window.localStorage.getItem("user_token");
  const [dashbaordData, setDashboardData] = useState({});
  const [filterData, setFilterData] = useState({
    toDate: null,
    fromDate: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [allExchangeTotal, setallExchangeTotal] = useState(false);
  const [selectTime, setSelectTime] = useState("month");
  const [profitData, setProfitData] = useState([]);
  const [performingData, setPerformingData] = useState([]);

  const Data = [
    {
      title: "Wallet Balance",
      // backgroundColorCode: "rgb(38, 81, 191)",
      description: "Application Wallet Balance",
      imgicon: "/images/Dashboard/dashicon_1.svg",
      icon: TfiBarChart,
      percantageValue: "Your funds overview.",
      coinIcon: "(USDT)",
      value: formatNumberInteger(allExchangeTotal || 0, 5),
    },
    {
      title: "Exchange Connected",
      // backgroundColorCode: "rgb(236, 73, 64)",
      description: "Connected Exchange",
      imgicon: "/images/Dashboard/dashboard_2.svg",
      icon: TfiBarChart,
      percantageValue: "Linked trading platforms.",
      value: dashbaordData?.totalConnectedExchange,
    },
    {
      title: "Total Transactions",
      // backgroundColorCode: "rgb(23, 154, 115)",
      description: "Transactions",
      imgicon: "/images/Dashboard/dashboard_2.svg",
      icon: TfiBarChart,
      percantageValue: "Trades executed count.",
      // coinIcon: "(USDT)",
      value: dashbaordData?.totalArbitrage,
    },
    {
      title: "Life-Time Profits",
      // backgroundColorCode: "rgb(205, 112, 26)",
      description: "Total Profit",
      imgicon: "/images/Dashboard/dashicon_3.svg",
      icon: TfiBarChart,
      percantageValue: "Cumulative earnings summary.",
      coinIcon: "(USDT)",
      value: formatNumberInteger(dashbaordData?.totalProfit || 0, 5),
    },
    {
      title: "Highest Profit",
      // backgroundColorCode: "#3a544c",
      description: "Highest Profit",
      imgicon: "/images/Dashboard/dashicon_3.svg",
      icon: TfiBarChart,
      percantageValue: "Peak trade profit.",
      coinIcon: "(USDT)",
      value: formatNumberInteger(dashbaordData?.highestProfit || 0, 5),
    },

    // {
    //   title: "Total Loss",
    //   // backgroundColorCode: "rgb(38, 81, 191)",
    //   description: "Loss",
    //   imgicon: "/images/Dashboard/dashicon_3.svg",
    //   icon: TfiBarChart,
    // },
  ];

  const getConnectedExchangeBalanceList = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: api_configs.exchangeBalance,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode == 200) {
        setallExchangeTotal(response?.data?.result?.allExchangeTotal);
      } else {
        setallExchangeTotal(false);
      }
    } catch (error) {
      setallExchangeTotal(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getConnectedExchangeBalanceList();
  }, [token]);

  const getDashbaordDataHandler = async () => {
    try {
      setIsLoading(true);
      const dataToSend = {
        fromDate: filterData.fromDate ? filterData.fromDate : null,
        toDate: filterData.toDate ? filterData.toDate : null,
      };
      const response = await axios({
        method: "GET",
        url: api_configs.Dashboard,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response) {
        let response1 = response.data.result;
        setIsLoading(false);
        setDashboardData(response1);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("user_token")) {
      getDashbaordDataHandler();
    }
  }, [window.localStorage.getItem("user_token")]);

  const getRecentTotalProfit = async (date) => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.transactionStatistic,
        headers: {
          token: token,
        },
        params: {
          type: date,
        },
      });
      if (response?.data?.responseCode === 200) {
        setProfitData(response.data.result);
      } else {
        setProfitData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentTotalProfit(selectTime);
  }, [selectTime]);

  const getPerformingAsset = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.exchangeTradeCount,
        headers: {
          token: token,
        },
      });
      if (response?.data?.responseCode === 200) {
        setPerformingData(response.data.result);
      } else {
        setPerformingData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerformingAsset();
  }, []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5, // Adjust the max height
        width: 250, // Adjust the width
      },
    },
  };

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Dashboard");
    }
  }, []);
  return (
    <DashboardPage>
      <CustomHead
        title={
          auth?.userData?.email
            ? auth?.userData?.email.split("@")[0] + ` | Bitedge`
            : "" + `Bitedge`
        }
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="dashboardBox">
        <Box className="displayEnd">
          {auth?.userData?.referralCode && (
            <Box className="displayEnd" mb={3}>
              <Typography variant="body2" color="primary">
                {" "}
                Referral Code :{" "}
              </Typography>
              &nbsp;
              <SortAddress
                showAll={true}
                address={
                  process.env.REDIRECT_URI +
                  "?refCode=" +
                  auth?.userData?.referralCode
                }
                isReferal={true}
              />
            </Box>
          )}
        </Box>
        <Box mb={2} className="mainDashboardCardBox">
          <Box className="grid-container">
            {Data &&
              Data?.map((data) => (
                <Paper
                  elevation={2}
                  className="paperContainer"
                  style={{ backgroundColor: data.backgroundColorCode }}
                >
                  <Box className="walletCard">
                    <Box
                      className="displaySpacebetween"
                      style={{ alignItems: "flex-start" }}
                    >
                      <Box>
                        <Box
                          className="displayStart"
                          style={{ alignItems: "flex-end" }}
                        >
                          <Typography variant="h2" color="primary">
                            {data?.value || 0}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="secondary"
                            ml={0.5}
                            style={{
                              fontWeight: "300",
                              fontSize: "10px",
                              lineHeight: "15px",
                            }}
                          >
                            {data?.coinIcon}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          color="primary"
                          mt={1.4}
                          mb={1}
                        >
                          {data?.title ? data?.title : "N/A"}
                        </Typography>
                      </Box>
                      <Image height={42} width={42} src={data.imgicon} />
                    </Box>

                    <Box
                      className="displayStart"
                      style={{ alignItems: "center" }}
                    >
                      {/* <Typography
                          variant="body2"
                          color="primary"
                          fontSize="10px"
                          fontWeight="300"
                        >
                          {data?.description ? data.description : "N/A"}
                        </Typography> */}
                      {/* Dynamic Icon */}

                      {/* <HiOutlineArrowUpRight
                          style={{
                            color: "rgba(52, 199, 89, 1)",
                            fontSize: "20px",
                          }}
                        /> */}

                      {/* <GoArrowDownRight
                          style={{ color: "rgba(255, 59, 48, 1)",  fontSize: "20px", }}
                        /> */}

                      <Typography
                        variant="body2"
                        fontSize="10px"
                        fontWeight="300"
                        className="percentagevalueText"
                      >
                        {data.percantageValue}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
          </Box>
        </Box>

        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7}>
              <Paper
                elevation={2}
                style={{ minHeight: "400px", paddingBottom: "0px" }}
              >
                <Box
                  className="displayStart"
                  // mb={2}
                  gap="20px"
                  style={{ flexWrap: "wrap" }}
                >
                  <Typography variant="h5">
                    Profit Chart{" "}
                    <span style={{ fontWeight: "400", fontSize: "12px" }}>
                      (USDT)
                    </span>
                  </Typography>

                  <Select
                    variant="outlined"
                    value={selectTime} // This binds the state value to the Select component
                    onChange={(e) => {
                      setSelectTime(e.target.value);
                    }}
                    displayEmpty
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"day"}>Day</MenuItem>
                    <MenuItem value={"week"}>Week</MenuItem>
                    <MenuItem value={"month"}>Month</MenuItem>
                    {/* <MenuItem value={"year"}>Year</MenuItem> */}
                  </Select>
                </Box>

                {/* <RecenetGraph /> */}
                {profitData?.length > 0 && <LineChart graphData={profitData} />}
              </Paper>
              {/* <Box>
                <RecentTotalProfile />
              </Box> */}
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Paper elevation={2} style={{ minHeight: "300px" }}>
                <Typography variant="h5" className="titleProfit">
                  Recent Profit{" "}
                  <span style={{ fontWeight: "400", fontSize: "12px" }}>
                    (USDT)
                  </span>
                </Typography>
                <RecentTotalProfile />
                <Typography variant="h5" mt={2}>
                  Top Performing Exchanges
                </Typography>

                <Box align="center">
                  {performingData?.length > 0 && (
                    <Doutgraph performingData={performingData} />
                  )}
                </Box>
                <Typography
                  variant="body1"
                  mt={2}
                  style={{ textAlign: "center", fontSize: "14px" }}
                >
                  Leading exchanges ranked by trading activity
                </Typography>
              </Paper>
              {/* <Box>
                <PerformingCryptoAssests />
              </Box> */}
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography variant="h5" color="primary" mb={1}>
            Transaction History
          </Typography>

          <Paper elevation={2} style={{ padding: "10px" }}>
            <DashboardTable />
          </Paper>
        </Box>
        {/* <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <CombinedExtendedProfits />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <TopCryptoAsset />
              </Box>
            </Grid>
          </Grid>
        </Box> */}
      </Box>
    </DashboardPage>
  );
}

DashdoardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
