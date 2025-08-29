import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";

import DashboardLayout from "@/layout/DashboardLayout";
import AppContext from "@/context/AppContext";
import PriceCard from "@/components/PriceCard";
import CustomHead from "@/components/CustomHead";
import { useRouter } from "next/router";

export default function ExchangeMain() {
  // const auth = useContext(AppContext);
  const auth = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Pricing");
    }
  }, []);

  return (
    <Box>
      <CustomHead
        title="Pricing | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Paper elevation={2}>
        <PriceCard
          isViewGrid={
            router.asPath.includes("/price") ||
            router.asPath.includes("/pricing")
          }
        />
      </Paper>
    </Box>
  );
}

ExchangeMain.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
