import React, { useEffect, useState, useContext } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SettingsContext from "@/context/SettingsContext";
import Simple from "./Simple";
import Sniper from "./Sniper";
import Smart from "./Smart";

const SmarterBoxStyle = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  marginTop: "100px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "70px",
  },

  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "40px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  "& .tabButton": {
    fontSize: "14px",
    fontWeight: "300",
    fontFamily: "'Sora', sans-serif",

    color: theme.palette.text.secondary,
    border: `1px solid ${
      theme.palette.mode === "dark" ? "#FFFFFF1A" : "transparent"
    }`,
    background: theme.palette.mode === "dark" ? "#060807" : "transparent",
    padding: "6px 12px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
    "&:hover": {
      borderRadius: "5px",
      color: theme.palette.text.primary,
      backgroundColor: "transparent",
    },
    "&.active": {
      color: theme.palette.text.primary,
      borderRadius: "5px",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0px 4px 49.96px 0px #C6F57A66"
          : "none",
      background:
        theme.palette.mode === "dark"
          ? "#060807"
          : "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
      border: `1px solid ${
        theme.palette.mode === "dark" ? "#5CFF80" : "#5CFF80"
      }`,
    },
  },
}));

export default function Smarter() {
  const [tabView, setTabView] = useState("Simple");
  const themeSetting = useContext(SettingsContext);
  return (
    <>
      <SmarterBoxStyle>
        <Container>
          <Box
            align="left"
            className="displaySpacebetween"
            style={{ alignItems: "flex-end", flexWrap: "wrap" }}
          >
            <Box>
              <Typography variant="h2" color="primary" mb={2}>
                Trade Smarter, Not Harder
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                mb={2}
                style={{ maxWidth: "600px" }}
              >
                Leverage Bitedge.app’s diverse strategies and technologies to
                optimise crypto trade executions across multiple platforms,
                while retaining full control and responsibility for all your
                trading decisions.
              </Typography>
            </Box>
            <Box className="tabBox">
              <Button
                className={`tabButton ${tabView === "Simple" ? "active" : ""}`}
                onClick={() => setTabView("Simple")}
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
                className={`tabButton ${tabView === "Smart" ? "active" : ""}`}
                onClick={() => setTabView("Smart")}
              >
                Smart Limit Orders
              </Button>
            </Box>
          </Box>

          {tabView === "Simple" && <Simple />}
          {tabView === "Sniper" && <Sniper />}
          {tabView === "Smart" && <Smart />}
        </Container>
      </SmarterBoxStyle>
    </>
  );
}
