import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import DashboardTransactionTable from "@/components/DashboardTransactionTable";
import { api_configs } from "@/api-services";
import axios from "axios";

const SmarterBoxStyle = styled(Box)(({ theme }) => ({
  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
    gap: "10px",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  "& .tabmainBox": {
    width: "100%",
    padding: "0px !important",
    borderRadius: "0px",
    border: "none",
    background: "transparent",
    borderBottom: "1px solid #80808024",
    marginBottom: "20px",
  },
  "& .tabButton": {
    fontWeight: 400,
    fontSize: "14px",
    fontFamily: "'Sora', sans-serif",
    padding: "9px 21px 15px",
    whiteSpace: "pre",
    cursor: "pointer",
    borderBottom: "2px solid",
    borderColor: "transparent",
    color: theme.palette.text.primary,

    borderRadius: "0px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
    "&:hover": {
      background: "transparent",
    },
    "&.active": {
      padding: "9px 21px 15px",
      cursor: "pointer",
      whiteSpace: "pre",

      borderRadius: "0px !important",
      borderBottom: "2px solid",
      borderColor: theme.palette.text.green,
      background: "transparent",
      fontWeight: 400,
      fontSize: "14px",
      WebkitBackgroundClip: "text",
      color: "transparent",
      background: theme.palette.text.green,
    },
  },
}));

function DashboardTable() {
  const [tabView, setTabView] = useState("listPlacedDirectTradeWithFilter");
  const [isLoading, setIsLoading] = useState(true);
  const [arbitrageData, setArbitargeData] = useState([]);
  const token = window.localStorage.getItem("user_token");

  const getTransactionHistory = async (endPoint) => {
    try {
      setArbitargeData([]);
      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url: api_configs[endPoint],
        headers: {
          token: token,
        },
        data: {
          page: "1",
          limit: "10",
          arbitrageStatus: "COMPLETED",
        },
      });
      if (res.data.responseCode === 200) {
        setArbitargeData(res.data.result.docs);
      } else {
        setArbitargeData([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setArbitargeData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactionHistory(tabView);
  }, [tabView]);

  return (
    <>
      <SmarterBoxStyle>
        <Box className="tabmainBox">
          <Box className="tabBox">
            <Button
              className={`tabButton ${
                tabView === "listPlacedDirectTradeWithFilter" ? "active" : ""
              }`}
              onClick={() => setTabView("listPlacedDirectTradeWithFilter")}
            >
              Quantum Flow
            </Button>
            <Button
              className={`tabButton ${
                tabView === "listPlacedTriangularTradeWithFilter"
                  ? "active"
                  : ""
              }`}
              onClick={() => setTabView("listPlacedTriangularTradeWithFilter")}
            >
              Quantum Loop
            </Button>

            <Button
              className={`tabButton ${
                tabView === "listPlacedTradeWithFilterIntraArb" ? "active" : ""
              }`}
              onClick={() => setTabView("listPlacedTradeWithFilterIntraArb")}
            >
              Quantum Bridge
            </Button>
          </Box>
        </Box>

        {tabView && (
          <DashboardTransactionTable
            isLoading={isLoading}
            arbitrageData={arbitrageData}
            tabView={tabView}
          />
        )}
      </SmarterBoxStyle>
    </>
  );
}
export default React.memo(DashboardTable);
