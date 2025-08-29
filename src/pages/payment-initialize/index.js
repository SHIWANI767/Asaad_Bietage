"use client";
import { useRouter } from "next/router";
import SecureTradingForm from "../payment/SecureTradingForm";
import DashboardLayout from "@/layout/DashboardLayout";
import { decrypt } from "@/utils";
import { Box, Paper, Typography } from "@mui/material";

export default function TrustPayment() {
  const router = useRouter();
  const data = router?.query?.data;
  const decryptData = decrypt(data);

  return (
    <div>
      <Typography mb={3} variant="h3" color="primary">
        {decryptData?.type === "update-payment-method"
          ? "Update Payment Method"
          : "Complete Your Payment"}
      </Typography>
      <Paper>
        <Box className="pricepaperPayment">
          {decryptData?.token && (
            <SecureTradingForm
              jwt={decryptData?.token}
              decryptData={decryptData}
            />
          )}
        </Box>
      </Paper>
    </div>
  );
}
TrustPayment.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
