"use script";
import {
  Box,
  Typography,
  styled,
  Paper,
  Grid,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputAdornment,
  FormHelperText,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BiDollar } from "react-icons/bi";
import AppContext from "@/context/AppContext";
import { api_configs } from "@/api-services";
import axios from "axios";
import {
  arbitrageNameFilterReverse,
  decrypt,
  encrypt,
  replacetext,
} from "@/utils";
import { useRouter } from "next/router";
import HomeLayout from "@/layout/HomeLayout";
import PaymentForm, { PaymentButton } from "@/components/PaymentForm";
import PaymentCrypto from "@/components/PaymentCrypto";
import PricingComponentsCard, {
  FeatureListItem,
} from "@/components/PricingComponentsCard";
import toast from "react-hot-toast";
import DashboardLayout from "@/layout/DashboardLayout";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import * as yup from "yup";
import { Form, Formik } from "formik";
import CouponCodeValidator from "@/components/PaymentForm/CouponCodeValidator";
import TrustPaymentForm from "@/components/TrustPaymentForm";
import { IoArrowBackSharp } from "react-icons/io5";

const CurrentPlanBox = styled("div")(({ theme }) => ({
  margin: "40px 0",
  "& .SelectBox": {
    padding: "0 0 0 24px",
    "& span": {
      color: theme.palette.text.primary,
    },
  },
  "& .descripborder": {
    borderBottom: "1px solid #8080804a",
    padding: "10px 0 15px",
  },

  "& .featureControl": {
    minHeight: "294px",
  },

  "& .basicPlanBox": {
    textAlign: "left",
    "& p": {
      margin: "3px 0px 10px",
    },
  },
  "& .agreeBox": {
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start",
    },
    "& p": {
      // color: "rgba(255, 255, 255, 0.87)",

      fontSize: "13px",
      marginLeft: "4px",
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
        paddingBottom: "5px",
      },
    },
    "& lable": {
      cursor: "pointer",
    },
    "& span": {
      // color: "#81E396",
      color: theme.palette.text.green,
      // padding: "0px 10px 0 0px",
      padding: "0px",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "& a": {
      color: theme.palette.text.primary,
      cursor: "pointer",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));
const featureCheckBackgroundColor = "rgba(42, 171, 227, 1)";

export default function Checkout() {
  const token = window.localStorage.getItem("user_token");
  const router = useRouter();
  const id = router.query.id;
  // const [data, setdata] = useState({});
  const [isGetSubscription, setIsGetSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(AppContext);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isChecked, setIsChecked] = useState(false);
  const [paymentLoad, setPaymentLoad] = useState(false);
  const [checkPayStatus, setCheckPayStatus] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const data = decrypt(id);

  const [isValidCode, setisValidCode] = useState({
    error: true,
    message: "",
    result: {},
  });

  useEffect(() => {
    if (userData.paymentType) {
      setSelectedMethod(userData.paymentType === "CRYPTO" ? "crypto" : "card");
    }
  }, [userData.paymentType]);
  const handleChange = (event) => {
    if (id != "update-payment-method") {
      setSelectedMethod(!checkPayStatus ? "crypto" : event.target.value);
    } else {
      setSelectedMethod(event.target.value);
    }
  };

  const HandleOrederDetails = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: api_configs.viewSubscription,
        headers: {
          token: token,
        },
        params: {
          subscriptionId: id,
        },
      });
      if (res.data.responseCode === 200) {
        // setdata(res.data.result);
        setIsGetSubscription(true);
      } else {
        setisShowAddress(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCheckPaymentMethod = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: api_configs.getTrustPaymentKeysStatus,
        headers: {
          token: token,
        },
      });
      if (res.data.responseCode === 200) {
        setCheckPayStatus(res.data.result.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id && id != "update-payment-method")
      // HandleOrederDetails(replacetext(id, "-", " "));
      setIsGetSubscription(true);
    getCheckPaymentMethod();
  }, [id]);
  const updatePaymentMethod = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "PUT",
        url: api_configs.updatePaymentMethod,
        headers: {
          token: token,
        },
        data: data || undefined,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        if (data?.paymentType === "CARD") {
          router.push({
            pathname: "/payment-initialize",
            query: {
              data: encrypt({
                token: response.data.result.token,
                cardData: data,
                type: id,
              }),
            },
          });
        } else {
          router.push({
            pathname: "/payment-success/[hash]",
            query: {
              hash: encrypt({
                ...response.data.result,
                hashType: "update-payment-methods",
              }),
            },
          });
        }
      } else {
        toast.error(response.data.responseMessage);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleRedirectPayment = async (values) => {
    try {
      setPaymentLoad(true);
      const res = await axios({
        method: "POST",
        url: api_configs.buySubscriptionCard,
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
        data: {
          billingstreet: values.billingStreet,
          billingtown: values.billingTown,
          billingpostcode: values.postcode,
          billingcountryiso2a: values.currency.country,
          billingcounty: values.currency.code,
          subscriptionPlanId: data?._id || undefined,
          couponCode: couponCode ? couponCode : undefined,
        },
      });
      if (res.data.responseCode === 200) {
        const jsonObj = JSON.stringify(res.data.result.obj);
        sessionStorage.setItem("paymentObj", jsonObj);
        router.push({
          pathname: "/payment-initialize",
          query: {
            data: encrypt({
              token: res.data.result.token,
              cardData: data,
            }),
          },
        });
      } else {
        toast.error(response.data.responseMessage);
      }
      setPaymentLoad(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.responseMessage);
      setPaymentLoad(false);
    }
  };

  return (
    <CurrentPlanBox pb={1}>
      <Paper elevation={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={7} lg={7}>
            {isGetSubscription && (
              <Box className="SelectBox" mt={1}>
                <Typography variant="h5" color="primary" className="priceText">
                  {data?.title}
                </Typography>
                <Typography variant="body2" color="primary">
                  First Payment: <span>$ {data?.payableAmount}</span>
                </Typography>

                <Typography variant="body2" color="primary">
                  Recurring Payment:{" "}
                  <span>$ {data?.recursivePayAmount} every month</span>
                </Typography>
              </Box>
            )}
            <Box
              className="paperMain"
              sx={{
                "& .MuiButtonBase-root-MuiRadio-root": {
                  padding: "0px",
                },
              }}
            >
              <CouponCodeValidator
                couponCode={couponCode}
                setCouponCode={(e) => setCouponCode(e)}
                setisValidCode={(e) => setisValidCode(e)}
                isValidCode={isValidCode}
                data={data}
              />
              <Box className="displayStart" mb={2}>
                <IoArrowBackSharp
                  style={{ padding: "0px", cursor: "pointer" }}
                  onClick={() => {
                    router.back(); // Navigate to the previous page
                  }}
                />

                <Typography variant="h6" color={"primary"} gutterBottom ml={2}>
                  Choose Payment Method
                </Typography>
              </Box>

              <RadioGroup value={selectedMethod} onChange={handleChange}>
                <FormControlLabel
                  value="card"
                  control={<Radio color={"primary"} />}
                  label={
                    <Typography variant="body2" color="primary">
                      Pay with Card
                    </Typography>
                  }
                />{" "}
                <FormControlLabel
                  value="crypto"
                  control={<Radio color={"primary"} />}
                  label={
                    <Typography variant="body2" color="primary">
                      Pay with Crypto
                    </Typography>
                  }
                />
                {selectedMethod === "card" && (
                  <Box>
                    {/* <PaymentForm
                      data={data}
                      updatePaymentMethod={(e) => updatePaymentMethod(e)}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      isChecked={isChecked}
                      setIsChecked={(e) => setIsChecked(e)}
                    /> */}
                    {/* <Typography variant="body2" color="secondary">
                      Use Visa, MasterCard, or American Express to complete your
                      purchase.
                    </Typography> */}

                    {id == "update-payment-method" ? (
                      <PaymentButton
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          updatePaymentMethod({
                            paymentType: "CARD",
                          })
                        }
                        sx={{ minWidth: "150px" }}
                        disabled={paymentLoad || isLoading}
                      >
                        Proceed{" "}
                        {(paymentLoad || isLoading) && (
                          <ButtonCircularProgress />
                        )}
                      </PaymentButton>
                    ) : (
                      <TrustPaymentForm
                        PaymentButton={PaymentButton}
                        handleRedirectPayment={handleRedirectPayment}
                        isLoading={paymentLoad}
                      />
                    )}
                  </Box>
                )}
                {selectedMethod === "crypto" && (
                  <Box>
                    <PaymentCrypto
                      data={data}
                      updatePaymentMethod={(e) => updatePaymentMethod(e)}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      isChecked={isChecked}
                      setIsChecked={(e) => setIsChecked(e)}
                      couponCode={couponCode}
                      isValidCode={isValidCode}
                      setisValidCode={setisValidCode}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Pay with Bitcoin, Ethereum, or other supported
                      cryptocurrencies.
                    </Typography>
                  </Box>
                )}
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5}>
            {isGetSubscription && (
              <PricingComponentsCard data={data} isDisabled={false} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </CurrentPlanBox>
  );
}

Checkout.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
