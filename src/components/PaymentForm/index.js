import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  InputAdornment,
  Autocomplete,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/system";
import { encrypt, handleNegativeValue, replacetext } from "@/utils";
import Image from "next/image";
import AppContext from "@/context/AppContext";
import CouponCodeValidator from "./CouponCodeValidator";
import { api_configs } from "@/api-services";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

// Styled components
const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: "450px",
  backgroundColor: "transparent",
  // borderRadius: "8px",
  // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

export const PaymentButton = styled(Button)(({ theme, disabled }) => ({
  // marginTop: "16px",
  padding: "12px",
  fontSize: "14px",
  fontWeight: "500",
  // minWidth: "150px",
  pointerEvents: disabled ? "none" : "auto",
  background: disabled
    ? "rgba(255, 255, 255, 0.12)"
    : "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
}));
const getCardType = (cardNumber) => {
  cardNumber = replacetext(cardNumber, " ", "");
  const cardPatterns = {
    visa: /^4[0-9]{0,}$/,
    mastercard: /^(5[1-5]|2[2-7])[0-9]{0,}$/,
    amex: /^3[47][0-9]{0,}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{0,}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{0,}$/,
    JCB12: /^(?:2131|1800|35\d{3})\d{0,}$/,
  };

  for (const [card, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(cardNumber)) {
      return card;
    }
  }

  return "unknown";
};
const PaymentForm = ({
  data,
  isLoading,
  setIsLoading,
  updatePaymentMethod,
  isChecked,
  setIsChecked,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [values, setValues] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    currency: null,
  });
  const [cardType, setCardType] = useState("unknown");
  const [isValidCode, setisValidCode] = useState({
    error: true,
    message: "",
    result: {},
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateCardNumber = (number) =>
    /^[0-9]{15,16}$/.test(number.replace(/\s+/g, ""));
  const validateExpiryDate = (date) =>
    /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(date);

  const validateCVC = (code) => /^[0-9]{3,4}$/.test(code);

  // Format card number into 4-digit blocks
  const formatCardNumber = (value) => {
    return value
      .replace(/\s+/g, "") // Remove spaces
      .replace(/(\d{4})/g, "$1 ") // Add space every 4 digits
      .trim(); // Remove trailing space
  };
  const validatecurrency = (currency) => {
    return currency.length > 0;
  };

  const formatExpiryDate = (expiryDateString) => {
    const currentYear = new Date().getFullYear().toString().slice(2); // Last two digits of the current year
    const expiryDateNoNonDigits = expiryDateString.replace(/\D/g, ""); // Remove non-digit characters

    let month = expiryDateNoNonDigits.slice(0, 2); // First two digits for month
    let year = expiryDateNoNonDigits.slice(2, 4); // Next two digits for year

    // Handle month input
    if (month.length === 1 && parseInt(month, 10) > 1) {
      month = `0${month}`; // Add leading zero if single digit and greater than 1
    } else if (parseInt(month, 10) > 12) {
      month = "12"; // Cap month at 12
    } else if (month === "0") {
      month = "0"; // Allow single 0 as input
    }

    // Ensure year is not less than current year
    if (
      year &&
      year.length === 2 &&
      parseInt(year, 10) < parseInt(currentYear, 10)
    ) {
      year = currentYear; // Default to current year if year is invalid
    }

    // Build formatted string
    let formattedExpiryDate = month;
    if (month.length === 2) {
      formattedExpiryDate = `${month}/`; // Add slash after month
    }
    if (year) {
      formattedExpiryDate += year; // Append year if available
    }

    return formattedExpiryDate.slice(0, 5); // Limit output to MM/YY format
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("name", name, "e", e);
    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);

      setCardType(getCardType(value));
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue,
    }));
  };

  const handleCVCChange = (e) => {
    const { value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      cvc: value,
    }));
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const token = window.localStorage.getItem("user_token");
  const { getProfileDataHandler, trustPaymentCoin } = useContext(AppContext);

  const handleSubmit = async () => {
    setIsSubmit(true);
    const newErrors = {};
    if (!validateCardNumber(values.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!validateExpiryDate(values.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date. Use MM/YY format.";
    }
    if (!validateCVC(values.cvc)) {
      newErrors.cvc = "CVC must be 3 digits.";
    }
    if (
      !validatecurrency(values?.currency?.code ? values?.currency?.code : "")
    ) {
      newErrors.currency = "Please select currency";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (couponCode && isValidCode.error) {
        setisValidCode({
          error: true,
          message: "Apply coupon code to checkout now.",
          result: {},
        });
        return;
      }
      setIsSubmit(false);

      if (id == "update-payment-method") {
        let bodyData = {
          cardNumber: replacetext(values.cardNumber, " ", ""),
          expiryDate: values.expiryDate,
          securityCode: values.cvc,
          currency: values?.currency?.code,
          paymentType: "CARD",
        };
        await updatePaymentMethod(bodyData);
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios({
          method: "POST",
          url: api_configs.buySubscriptionCard,
          headers: {
            token: token,
          },
          data: {
            subscriptionPlanId: data._id,
            cardNumber: replacetext(values.cardNumber, " ", ""),
            expiryDate: values.expiryDate,
            securityCode: values.cvc,
            currency: values?.currency?.code,
            couponCode: couponCode ? couponCode : undefined,
          },
        });
        if (res.data.responseCode === 200) {
          // toast.success(res.data.responseMessage);
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
    }
  };

  return (
    <FormContainer>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="body2" color="primary" mt={1} mb={1}>
            Select currency
          </Typography>
          <Autocomplete
            freeSolo
            options={trustPaymentCoin ? [...trustPaymentCoin].sort() : []}
            getOptionLabel={(option) => option.name}
            value={values.currency}
            disabled={isLoading}
            onChange={(event, newValue) => {
              setValues((prevValues) => ({
                ...prevValues,
                ["currency"]: newValue,
              }));
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
            error={!!errors.currency}
          />
          <FormHelperText error>{errors.currency}</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="primary" mt={1} mb={1}>
            Enter Card Number
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            name="cardNumber"
            value={values.cardNumber}
            onChange={handleInputChange}
            // required
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  {cardType !== "unknown" && (
                    <Image
                      src={`/images/card/${cardType}.svg`} // e.g., visa.png, mastercard.png
                      alt={`${cardType} logo`}
                      width={58}
                      height={16}
                      style={{
                        background: "#fff",
                        padding: "4px",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </InputAdornment>
              ),
              inputMode: "numeric",
              placeholder: "1234 5678 9012 3456",
              maxLength: 19, // For 16 digits + 3 spaces for formatting
            }}
            inputProps={{
              inputMode: "numeric",
              maxLength: 19, // For 16 digits + 3 spaces for formatting
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="primary" mt={1} mb={1}>
            Enter Expiry Date
          </Typography>

          <TextField
            fullWidth
            variant="standard"
            name="expiryDate"
            type="tel"
            value={values.expiryDate}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

              // Format as MM/YY
              let formattedValue = "";
              if (value.length > 0) {
                formattedValue += value.slice(0, 2); // Add month digits
              }
              if (value.length >= 3) {
                formattedValue += `/${value.slice(2, 4)}`; // Add slash and year digits
              }
              console.log(formattedValue, e?.nativeEvent?.inputType);

              if (e?.nativeEvent?.inputType == "insertText") {
                handleInputChange({
                  target: {
                    name: "expiryDate",
                    value: value,
                  },
                });
              } else {
                setValues((prevValues) => ({
                  ...prevValues,
                  ["expiryDate"]: formattedValue,
                }));
              }
            }}
            onKeyDown={(e) => {}}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeIcon />
                </InputAdornment>
              ),
              placeholder: "MM/YY",
            }}
            inputProps={{
              maxLength: 5, // Limit to 5 characters (MM/YY)
            }}
          />
        </Grid>

        {/* CVC Field */}
        <Grid item xs={6}>
          <Typography variant="body2" color="primary" mt={1} mb={1}>
            Enter CVC
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            name="cvc"
            type="password"
            value={values.cvc}
            onChange={handleCVCChange}
            error={!!errors.cvc}
            helperText={errors.cvc}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              inputMode: "numeric",
              placeholder: "***",
              maxLength: 3,
            }}
            inputProps={{
              maxLength: 3,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CouponCodeValidator
            couponCode={couponCode}
            setCouponCode={(e) => setCouponCode(e)}
            setisValidCode={(e) => setisValidCode(e)}
            isValidCode={isValidCode}
            data={data}
          />
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
    </FormContainer>
  );
};

export default PaymentForm;
