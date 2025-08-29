"use script";
import {
  Box,
  Typography,
  styled,
  Grid,
  Autocomplete,
  FormHelperText,
  TextField,
  Checkbox,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AppContext from "@/context/AppContext";
import { api_configs } from "@/api-services";
import axios from "axios";
import toast from "react-hot-toast";
import SortAddress from "@/utils/SortAddress";
import QRCodeGenerator from "../QRCodeGenerator";
import { useRouter } from "next/router";
import { PaymentButton } from "../PaymentForm";
import CouponCodeValidator from "../PaymentForm/CouponCodeValidator";
import { encrypt } from "@/utils";
import Link from "next/link";

const CryptoCard = styled("div")(({ theme }) => ({
  maxWidth: "450px",
  backgroundColor: "transparent",

  "& .imgBox": {
    display: "flex",
    justifyContent: "center",
    // "& canvas": {
    //   position: "relative",
    //   height: "160px",
    //   width: "160px",
    //   maxWidth: "300px",
    //   width: "100%",
    // },
  },
}));
const PaymentCrypto = ({
  data,
  isLoading,
  setIsLoading,
  updatePaymentMethod,
  isChecked,
  setIsChecked,
  couponCode,
  isValidCode,
  setisValidCode,
}) => {
  const router = useRouter();
  const id = router.query.id;
  const [coinName, setCoinName] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const token = window.localStorage.getItem("user_token");
  const { getProfileDataHandler, nowpaymentCoinList } = useContext(AppContext);

  const handleSubmit = async () => {
    setIsSubmit(true);
    if (couponCode && isValidCode.error) {
      setisValidCode({
        error: true,
        message: "Apply coupon code to checkout now.",
        result: {},
      });
    }
    if (coinName === "" || (couponCode && isValidCode.error)) {
      return;
    }
    setIsSubmit(false);

    if (id == "update-payment-method") {
      let bodyData = {
        currency: coinName,
        paymentType: "CRYPTO",
      };
      await updatePaymentMethod(bodyData);
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: api_configs.buySubscription,
        headers: {
          token: token,
        },
        data: {
          subscriptionPlanId: data._id,
          currency_to: coinName,
          couponCode: couponCode ? couponCode : undefined,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        getProfileDataHandler(token);
        router.replace({
          pathname: "/payment-success/[hash]",
          query: {
            hash: encrypt({
              ...res.data.result,
              hashType: "checkout",
            }),
          },
        });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <CryptoCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="body2" color="primary" mt={1} mb={1}>
            Select currency
          </Typography>
          <Autocomplete
            freeSolo
            options={nowpaymentCoinList ? [...nowpaymentCoinList].sort() : []}
            getOptionLabel={(option) => option}
            value={coinName}
            disabled={isLoading}
            onChange={(event, newValue) => {
              setCoinName(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select coin"
                color="secondary"
              />
            )}
            noOptionsText="No matching coin found"
            color="secondary"
          />
          <FormHelperText error>
            {isSubmit && coinName === "" && "Please select a payment currency!"}
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Box className="agreeBox displayStart" mb={2} align="center">
            <Checkbox
              checked={isChecked}
              onClick={() => !isLoading && setIsChecked(!isChecked)}
            />
            <Typography variant="body2" color="primary">
              <lable onClick={() => !isLoading && setIsChecked(!isChecked)}>
                I accept the{" "}
              </lable>
              <Link
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </Typography>
          </Box>
          <PaymentButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading || !isChecked}
            sx={{ minWidth: "150px" }}
          >
            {isLoading
              ? "Loading..."
              : id == "update-payment-method"
              ? "Update"
              : "Checkout now"}
          </PaymentButton>
        </Grid>
      </Grid>
    </CryptoCard>
  );
};

export default PaymentCrypto;
