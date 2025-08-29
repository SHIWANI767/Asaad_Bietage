import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SettingsContext from "@/context/SettingsContext";
import FeaturesSimple from "./FeaturesSimple";
import SmarLimit from "./SmarLimit";
import FeaturesSample from "./FeaturesSample";

const FeaturesTabBoxStyle = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",

  "& .tabBox": {
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "100px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "30px",
    },
  },
  "& .tabButton": {
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "'Sora', sans-serif",
    color: theme.palette.text.secondary,
    border: `1px solid ${
      theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "transparent"
    }`,
    background: theme.palette.mode === "dark" ? "#060807" : "transparent",
    padding: "12px 20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      padding: "10px 20px",
    },
    "&:hover": {
      borderRadius: "5px",
      color: theme.palette.text.primary,
      backgroundColor: "transparent",
    },
    "&.active": {
      color: "rgba(25, 29, 19, 0.8)",
      borderRadius: "5px",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0px 4px 49.96px 0px rgba(198, 245, 122, 0.4)"
          : "0px 0px 11.99px 0px rgba(255, 255, 255, 0.2) inset",
      background:
        theme.palette.mode === "dark"
          ? "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)"
          : "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
      border: `1px solid ${
        theme.palette.mode === "dark" ? "#bef85626" : "#bef85626"
      }`,
    },
  },
}));

export default function FeaturesTab() {
  const [tabView, setTabView] = useState("FeaturesSample");
  const themeSetting = useContext(SettingsContext);
  return (
    <>
      <FeaturesTabBoxStyle>
        <Box className="tabBox displayCenter">
          <Button
            className={`tabButton ${
              tabView === "FeaturesSample" ? "active" : ""
            }`}
            onClick={() => setTabView("FeaturesSample")}
          >
            Simple Auto Trade
          </Button>
          <Button
            className={`tabButton ${tabView === "Sniper" ? "active" : ""}`}
            onClick={() => setTabView("Sniper")}
          >
            Sniper Auto Trade
          </Button>

          <Button
            className={`tabButton ${tabView === "SmarLimit" ? "active" : ""}`}
            onClick={() => setTabView("SmarLimit")}
          >
            Smart Limit Orders
          </Button>
        </Box>
        {tabView === "FeaturesSample" && <FeaturesSample />}
        {tabView === "Sniper" && <FeaturesSimple />}
        {tabView === "SmarLimit" && <SmarLimit />}
      </FeaturesTabBoxStyle>
    </>
  );
}
