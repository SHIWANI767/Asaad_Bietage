import AppContext from "@/context/AppContext";
import { Alert, Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useContext } from "react";
import { PaymentButton } from "./PaymentForm";
import { useRouter } from "next/router";

export default function CustomStatus() {
  const router = useRouter();
  const { userData, subscriptionIdd, isLoadingProfile } =
    useContext(AppContext);
  const { subscriptionType, subscriptionPlaneStatus } = userData || {};
  const { endTime, subScriptionPlanId } = subscriptionIdd;

  const todayUnix = new Date().getTime() / 1000;
  const alertStyles = {
    width: "100%",
    borderRadius: "12px",
    "& .MuiAlert-message": {
      width: "100%",
      "& svg, p": {
        color: "#f44336",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "#f44336",
    },
  };

  const isExpiringSoon = moment(endTime).subtract(3, "days").unix() < todayUnix;
  const isValidForRenewal = moment(endTime).add(10, "days").unix() > todayUnix;
  const isCustomPlan = subscriptionType === "CUSTOM";

  const renderAlert = (message, actionPath, buttonText) => (
    <Box className="alertProfileBox1" mb={2}>
      <Alert severity="error" sx={alertStyles}>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="body1" color={"primary"}>
            {message}
          </Typography>
          {router.asPath !== actionPath && (
            <PaymentButton
              onClick={() => router.push(actionPath)}
              variant="contained"
              color="primary"
              sx={{ minWidth: "100px", height: "40px" }}
            >
              {buttonText}
            </PaymentButton>
          )}
        </Box>
      </Alert>
    </Box>
  );

  if (isLoadingProfile) return null;

  // if (!subscriptionPlaneStatus && isCustomPlan && isExpiringSoon) {
  //   return renderAlert(
  //     "Your plan is about to expire. Please upgrade your plan or purchase the same subscription.123 ",
  //     "/dashboard/setting?type=myPlans",
  //     "Renew Plan"
  //   );
  // }
  if (
    subscriptionPlaneStatus &&
    isValidForRenewal &&
    isCustomPlan &&
    isExpiringSoon
  ) {
    return renderAlert(
      "Your plan is about to expire. Please upgrade your plan or purchase the same subscription. ",
      "/dashboard/setting?type=myPlans",
      "Renew Plan"
    );
  }

  if (!subscriptionPlaneStatus && !isValidForRenewal) {
    return renderAlert(
      "You have no active plan. Please purchase a plan to continue your trading experience.",
      "/dashboard/pricing",
      "Buy Plan"
    );
  }

  return null;
}
