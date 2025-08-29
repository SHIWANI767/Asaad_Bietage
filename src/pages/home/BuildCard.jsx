"use client";
import SettingsContext from "@/context/SettingsContext";
import { Typography, Box, styled, Paper } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";

const BuildCardBox = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "stretch",
  "& .BuildCardBox": {
    margin: "10px",
    minHeight: "319px",
    padding: "10px",
  },
  "& h6": {
    fontWeight: "700",
    fontSize: "22px",
  },
}));

export default function BuildCard({ value, index }) {
  const themeSetting = useContext(SettingsContext);
  return (
    <BuildCardBox>
      <Paper elevation={1} className="BuildCardBox" key={`paper-${index}`}>
        {themeSetting.settings.theme === "DARK" ? (
          <Image
            src="/images/client/check_box.svg"
            height={52}
            width={52}
            quality={100}
            alt=""
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <Image
            src="/images/client/light_check.svg"
            height={52}
            width={52}
            quality={100}
            alt=""
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
        <Box className="cardBox">
          <Box mb={1}>
            <Typography variant="h6" color="primary" mt={3}>
              {value?.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="secondary">
            {value.decription}
          </Typography>
        </Box>
      </Paper>
    </BuildCardBox>
  );
}
