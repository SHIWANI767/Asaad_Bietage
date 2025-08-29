import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  CardContent,
  Card,
  IconButton,
  styled,
} from "@mui/material";
import HomeLayout from "@/layout/HomeLayout";
import { CheckCircleOutline } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { decrypt } from "@/utils";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import SortAddress from "@/utils/SortAddress";

export default function PaymentSuccess() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const hash = router.query.hash;
  const data = decrypt(hash);

  useEffect(() => {
    if (data?.hashType) {
      sessionStorage.removeItem("paymentObj");
    }
  }, [data?.hashType]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="63vh"
      //   bgcolor="#f5f5f5"
      padding={
        data?.paymentType === "CRYPTO"
          ? "30px"
          : data?.hashType == "update-payment-methods"
          ? "30px"
          : "0px"
      }
      px={2}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          borderRadius: 4,
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          p: 3,
          bgcolor: "transparent",
        }}
      >
        {/* Loading state */}
        {isLoading ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <CircularProgress />
            <Typography variant="h6" mt={2}>
              Checking Payment Status...
            </Typography>
          </Box>
        ) : (
          <CardContent>
            <>
              <IconButton
                sx={{
                  color: "green",
                  fontSize: "4rem",
                  mb: 2,
                  pointerEvents: "none",
                }}
              >
                {data?.hashType === "cardFail" ? (
                  <AddCircleOutlineIcon
                    fontSize="inherit"
                    style={{ transform: "rotate(45deg)", color: "red" }}
                  />
                ) : (
                  <CheckCircleOutline fontSize="inherit" />
                )}
              </IconButton>
              {data?.hashType == "update-payment-methods" ? (
                <>
                  <Typography
                    variant={"h6"}
                    color="green"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Payment method successfully updated to{" "}
                    {data?.paymentType === "CRYPTO" ? "Crypto" : "Card"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Thank you for choosing{" "}
                    {data?.paymentType === "CRYPTO" ? "Crypto" : "Card"}.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant={data?.paymentType === "CRYPTO" ? "h6" : "h4"}
                    color="green"
                    fontWeight="bold"
                    gutterBottom
                    style={{
                      color: data?.hashType === "cardFail" ? "red" : "green",
                    }}
                  >
                    {data?.paymentType === "CRYPTO"
                      ? "Proceed with the payment."
                      : data?.hashType === "cardFail"
                      ? "Payment Failed!"
                      : "Payment Successful!"}
                  </Typography>
                  {data?.hashType !== "cardFail" && (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      Thank you for your purchase.
                    </Typography>
                  )}
                  {data?.hashType !== "cardSuccess" &&
                    data?.hashType !== "cardFail" && (
                      <Typography variant="body2" color="textSecondary">
                        Order ID: <strong>{data.order_id}</strong>
                      </Typography>
                    )}

                  {data?.paymentType === "CRYPTO" && (
                    <>
                      {data?.pay_address && (
                        <Box
                          className="imgBox"
                          my={3}
                          sx={{
                            "& canvas": {
                              position: "relative",
                              height: "160px",
                              width: "160px",
                              maxWidth: "300px",
                              width: "100%",
                            },
                          }}
                        >
                          <QRCodeGenerator qrCodeText={data?.pay_address} />
                        </Box>
                      )}
                      <Typography variant="body2" color="primary">
                        Amount to pay: &nbsp; {data?.pay_amount}{" "}
                        {data?.pay_currency?.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary"
                        className="displayCenter"
                      >
                        Address to pay: &nbsp;{" "}
                        <SortAddress address={data?.pay_address} />
                      </Typography>
                    </>
                  )}
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.replace("/dashboard")}
                sx={{ mt: 3, borderRadius: 20 }}
              >
                Go to Dashboard
              </Button>
            </>
          </CardContent>
        )}
      </Card>
    </Box>
  );
}
PaymentSuccess.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
