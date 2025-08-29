import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  Button,
  Link,
} from "@mui/material";

import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import { getAPIHandler } from "@/api-services/service";
import AppContext from "@/context/AppContext";
import dynamic from "next/dynamic";
import axios from "axios";
import { replacetext } from "@/utils";
import SettingsContext from "@/context/SettingsContext";
import { useRouter } from "next/router";
import DataLoader from "@/components/DataLoader";
import PriceCard from "@/components/PriceCard";
import NoDataFound from "@/components/NoDataFound";

const PricingComponentsCard = dynamic(
  () => import("@/components/PricingComponentsCard"),
  {
    ssr: false,
  }
);
const SettingProfileBox = styled(Box)(({ theme }) => ({
  marginTop: "25px",
  "& .filterpaper": {
    padding: "22px 30px 40px",
    minHeight: "200px",
    "& p": {
      fontSize: "14px",
    },
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#222926",
    borderRadius: "10px",
    padding: "3px 0px 3px 10px",
    marginBottom: "10px",
  },
}));

export default function Trading() {
  const auth = useContext(AppContext);
  // const themeSetting = useContext(SettingsContext);
  // const router = useRouter();
  const { userData, getProfileDataHandler, userLoggedIn } = auth;
  const cardHeight = { minHeight: "250px" };
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setisSubscribed] = useState(false);
  const [subscribeList, setSubscribeList] = useState({});

  const viewSubscriptionListApi = async (source) => {
    try {
      setIsLoading(true);
      const response = await getAPIHandler({
        endPoint: "getCustomPlan",
        source: source,
      });
      if (response.data.responseCode === 200) {
        let data = response.data.result;
        setSubscribeList(data);
        setisSubscribed(true);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setSubscribeList({});
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    viewSubscriptionListApi(source);
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <SettingProfileBox>
      {/* <Typography variant="h6" color="secondary">
        {userData.subscriptionType == "CUSTOM" ||
        userData.subscriptionType == "FREE"
          ? "You have been assigned a custom subscription. Please choose a payment method to proceed with automatic subscription payments."
          : "You don't have a subscription. Please purchase a new plan."}
      </Typography> */}
      {!isLoading && isSubscribed && (
        <Grid container spacing={2} pt={4}>
          {isSubscribed && (
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {subscribeList && (
                <PricingComponentsCard
                  data={{
                    ...subscribeList,
                  }}
                  cardHeight={cardHeight}
                  featureCheckBackgroundColor={"rgba(239, 93, 168, 1)"}
                  nowpaymentCoinList={auth.nowpaymentCoinList}
                  isDisabled={userLoggedIn}
                  callback={() => getProfileDataHandler()}
                />
              )}
            </Grid>
          )}
          <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
        </Grid>
      )}

      {isLoading && <DataLoader />}
      {!isLoading && !isSubscribed && (
        <NoDataFound text="There is no promotional plan in place yet." />
      )}
      {/* {!isLoading && !isSubscribed && (
        <Box pt={1}>
          <PriceCard
            isViewGrid={
              router.asPath.includes("/price") ||
              router.asPath.includes("/pricing")
            }
          />
        </Box>
      )} */}
    </SettingProfileBox>
  );
}

Trading.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
