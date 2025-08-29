"use client";
import { Box, Paper, Typography, styled } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
// import CustomHead from "@/components/CustomHead";
import DashboardLayout from "@/layout/DashboardLayout";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
// import TableComp from "@/components/TableComp";
import dynamic from "next/dynamic";
const CustomHead = dynamic(() => import("@/components/CustomHead"));
const TableComp = dynamic(() => import("@/components/TableComp"));
import AppContext from "@/context/AppContext";
const TransactionBox = styled("div")(({ theme }) => ({
  "& .transactionBox": {
    position: "relative",
    zIndex: "999",

    "& h4": {
      fontWeight: 700,
    },
  },
}));

const tableHead = [
  {
    heading: "Sr. No",
  },
  {
    heading: "Exchange",
  },
  {
    heading: "Pair",
  },
];
export default function PairWhitelisted() {
  const [pairDetail, setPairDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AppContext);
  const pairWhiteListedList = async () => {
    setIsLoading(true);
    try {
      const res = await apiRouterCall({
        method: "GET",
        url: api_configs.mexcPairList,
      });
      if (res.data.responseCode === 200) {
        setPairDetail(res.data.result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    pairWhiteListedList();
  }, []);

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading(" Mexc Pairs");
    }
  }, []);

  return (
    <TransactionBox>
      <CustomHead
        title="MEXC Pairs List | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Paper elevation={2}>
        <Box className="transactionBox">
          <TableComp
            tableHead={tableHead}
            isMobileAdaptive={false}
            scoreListData={
              pairDetail &&
              pairDetail.map((value, index) => ({
                "Sr. No": index + 1,
                Exchange: "Mexc",
                Pair: value,
              }))
            }
            noOfPages={"numPages"}
            noOfTotalPages={"numPages"}
            page={"page"}
            setPage={"setPage"}
            limit={10}
            isLoading={isLoading}
            maxHeight="calc(100dvh - 220px)"
          />
        </Box>
      </Paper>
    </TransactionBox>
  );
}
PairWhitelisted.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
