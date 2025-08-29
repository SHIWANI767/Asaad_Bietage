"use client";
import SettingsContext from "@/context/SettingsContext";
import { Typography, Box, styled, Paper } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
const SayingCardBox = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "stretch",
  "& .BuildCardBox": {
    margin: "10px",
    minHeight: "319px",
    cursor: "pointer",
    padding: "40px",
    position: "relative",
    "&:hover": {
      background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
      boxShadow: "10px 10px 0px 0px rgba(102, 139, 37, 1)",
      "& p": {
        color: "rgba(25, 29, 19, 1)",
      },
    },
  },
  "& h6": {
    fontWeight: "700",
    fontSize: "22px",
  },
  "& .MuiSvgIcon-root": {
    color: "rgba(255, 165, 52, 1)", // Apply the color here
  },
  "& .bottombuttontext": {
    position: "absolute",
    bottom: "30px",
    left: "40px",
  },
}));

export default function SayingCard({ value, index }) {
  const themeSetting = useContext(SettingsContext);

  return (
    <SayingCardBox>
      <Paper elevation={1} className="BuildCardBox" key={`paper-${index}`}>
        <Box className="cardBox" align="left">
          <Box mb={3}>
            <Rating name="size-large" defaultValue={5} size="small" />
          </Box>
          <Typography variant="body2" color="primary" pb={2}>
            {value.decription}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="primary"
          className="bottombuttontext"
        >
          {value.buttonText}
        </Typography>
      </Paper>
    </SayingCardBox>
  );
}
