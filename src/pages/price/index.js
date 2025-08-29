import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import HomeLayout from "@/layout/HomeLayout";
import PriceCard from "@/components/PriceCard";
import CustomHead from "@/components/CustomHead";
import { useRouter } from "next/router";
import Stay from "../home/Stay";
import Start from "../exchanges/Start";
import Paymentmethod from "./Paymentmethod";

const CurrentPlanBox = styled("div")(({ theme }) => ({
  "& .priceBox": {
    // padding: "8px 0 0px",
    // minHeight: "calc(100dvh - 315px)",
  },

  "& h1": {
    fontSize: "60px",
    lineHeight: "80px",
    "@media(max-width:1024px)": {
      fontSize: "51px !important",
    },

    "@media(max-width:768px)": {
      lineHeight: "40px",
      fontSize: "28px !important",
    },
  },
}));

export default function CurrentPlan() {
  const router = useRouter();

  return (
    <CurrentPlanBox>
      <CustomHead
        title="Plans | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="priceBox bannerlanding">
        <Container>
          <Box className="bannerTextBoxvisible" align="center">
            <Typography variant="h1" color="primary">
              Enjoy Automated Trading at
            </Typography>{" "}
            <Typography variant="h1" color="primary">
              <span className="gradient-text">Competitive Pricing</span>
            </Typography>
            <Box mt={3}>
              <Typography variant="body2" color="secondary">
                Bitedge.app offers affordable subscriptions with a minimal
                upfront cost, plus a small percentage of your trading profits.
              </Typography>
            </Box>
          </Box>
          <PriceCard
            isViewGrid={
              router.asPath.includes("/price") ||
              router.asPath.includes("/pricing")
            }
          />
        </Container>

        <Paymentmethod />
        <Start />
      </Box>
    </CurrentPlanBox>
  );
}
CurrentPlan.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
