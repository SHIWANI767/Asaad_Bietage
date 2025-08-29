import React from "react";
import { api_configs } from "@/api-services";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { PaymentButton } from ".";
import { useRouter } from "next/router";

const CouponCodeValidator = ({
  couponCode,
  setCouponCode,
  isValidCode,
  setisValidCode,
  data,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter coupon code");
      return;
    }
    try {
      setisValidCode({
        error: false,
        message: "",
      });
      const res = await axios({
        method: "POST",
        url: api_configs.checkAvailableCoupon,
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
        data: {
          couponCode: couponCode,
          subscriptionPlanId: data._id,
        },
      });
      if (res.data.responseCode === 200) {
        setisValidCode({
          error: false,
          message: "",
          result: res.data.result,
        });
      } else {
        setisValidCode({
          error: true,
          message: error.response.data.responseMessage,
          result: res.data.result,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setisValidCode({
          error: true,
          message: error.response.data.responseMessage,
          result: {},
        });
      } else {
        setisValidCode({
          error: true,
          message: error.message,
          result: {},
        });
      }
    }
  };
  if (id == "update-payment-method") {
    return;
  }
  return (
    <Box
      sx={{
        "& input": {
          padding: "8px 0 8px 9px",
        },
        "& button": {
          borderRadius: "9px!important",
        },
        "& .MuiInputBase-root": {
          padding: "9px 0 9px 16px",
        },
        "& .MuiButtonBase-root-MuiButton-root.Mui-disabled": {
          background: "rgba(255, 255, 255, 0.12)",
        },
      }}
    >
      <Typography variant="body2" color="primary" mt={1} mb={1}>
        Enter coupon code
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Enter coupon code"
        color="secondary"
        fullWidth
        value={couponCode}
        onChange={(e) => {
          setCouponCode(e.target.value);
          setisValidCode({
            error: true,
            message: "",
            result: {},
          });
        }}
        onKeyPress={(e) => {
          if (e.key === " ") {
            e.preventDefault();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PaymentButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleApplyCoupon();
                }}
                disabled={couponCode === ""}
                sx={{ minWidth: "130px" }}
              >
                {isValidCode.result?.couponAmount ? "Applied" : "Apply"}
              </PaymentButton>
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText error>
        {isValidCode.error && isValidCode.message}
      </FormHelperText>
      {isValidCode?.result?.planAmount && (
        <Box
          sx={{
            "& .box": { display: "flex", justifyContent: "space-between" },
            "& p": {
              fontSize: "12px",
              // fontWeight: "500"
            },
          }}
        >
          <Box className="box">
            <Typography variant="body2" color="primary">
              Amount
            </Typography>

            <Typography variant="body2" color="secondary">
              : $ {isValidCode.result?.planAmount}
            </Typography>
          </Box>
          <Box className="box">
            <Typography variant="body2" color="primary">
              Discount
            </Typography>

            <Typography variant="body2" color="secondary">
              : $ {isValidCode.result?.couponAmount}
            </Typography>
          </Box>
          <Box className="box">
            <Typography variant="body2" color="primary">
              Final Pay Amount
            </Typography>

            <Typography variant="body2" color="secondary">
              : $ {isValidCode.result?.totalBuyAmount}
            </Typography>
          </Box>
        </Box>
      )}{" "}
    </Box>
  );
};

export default CouponCodeValidator;
