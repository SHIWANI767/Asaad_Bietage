import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import { api_configs } from "@/api-services";
import axios from "axios";
import dynamic from "next/dynamic";
import AppContext from "@/context/AppContext";
const CustomHead = dynamic(() => import("@/components/CustomHead"));
const PersonalStats = dynamic(() => import("@/components/stats/PersonalStats"));
const GlobalStats = dynamic(() => import("@/components/stats/GlobalStats"));

// import PersonalStats from "@/components/stats/PersonalStats";
// import GlobalStats from "@/components/stats/GlobalStats";

const StatisticsComponent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .filterpaperBox": {
    padding: "10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
  },
  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
  },
  "& .tabButton": {
    borderRadius: "5px",
    width: "110px",
    height: "50px",
    fontSize: "14px",
    fontWeight: "400",
    color: "#fff",
    margin: "0 5px",
    borderRadius: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      width: "100px",
    },
    "&:hover": {
      borderRadius: "5px",
      color: "#fff",
    },
    "&.active": {
      color: "#fff",
      borderRadius: "5px",
      background: "rgba(255, 255, 255, 0.05)",
    },
  },
}));

export default function Statistics() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [tabView, setTabView] = useState("personal");
  const [newArrayDataUser, setnewArrayDataUser] = useState({});
  const [profitList, setProfitList] = useState({});

  const statisticHandlerChart = async () => {
    try {
      setIsLoading1(true);
      const res = await axios({
        method: "GET",
        url: api_configs.profitStats,
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
        params: {
          type: "year",
        },
      });
      if (res.data.responseCode === 200) {
        setProfitList(res.data.result);
        setIsLoading1(false);
      }
      setIsLoading1(false);
    } catch (error) {
      console.log("err ", error);
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    statisticHandlerChart();
  }, []);
  const statisticHandlerprofitStats = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: api_configs.statistic,
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
        params: {
          type: "year",
        },
      });
      if (res.data.responseCode === 200) {
        const entries = Object.entries(res?.data?.result);
        let newarraybuy = [];
        let newarraysell = [];
        let newarray4 = [];
        const monthArr = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        for (var i = 0; i < entries?.length; i++) {
          newarraybuy.push(entries[i][1]?.buy);
          newarraysell.push(entries[i][1]?.sell);
          // newarray3.push(moment(entries[i][1]?.date).format("MMM Do YY"));
          newarray4.push(monthArr[entries[i][1]?.month - 1]);
        }
        setnewArrayDataUser({ newarraybuy, newarraysell, newarray4 });
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("err ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    statisticHandlerprofitStats();
  }, []);
  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Statistics");
    }
  }, []);

  return (
    <StatisticsComponent>
      <CustomHead
        title="Statistics | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />

      {tabView === "personal" && (
        <PersonalStats
          tabView={tabView}
          newArrayDataUser={newArrayDataUser}
          profitList={profitList}
        />
      )}
      {tabView === "global" && (
        <GlobalStats
          tabView={tabView}
          newArrayDataUser={newArrayDataUser}
          profitList={profitList}
        />
      )}
    </StatisticsComponent>
  );
}

Statistics.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
