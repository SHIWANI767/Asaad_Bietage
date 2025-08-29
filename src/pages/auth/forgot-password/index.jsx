import {
  Box,
  Button,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { btnArr } from "@/data";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import { toast } from "react-hot-toast";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import CustomHead from "@/components/CustomHead";
import moment from "moment";
import { calculateTimeLeft } from "@/utils";
import TermComp from "@/components/TermComp";
import { PaymentButton } from "@/components/PaymentForm";

const ForgotComponent = styled(Box)(({ theme }) => ({
  height: "100%",
  position: "relative",
  zIndex: "999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
  },
  "& span": {
    color: theme.palette.text.green,
    fontWeight: "500",
  },
  "& .loginBox": {
    height: "initial",
    margin: "15px auto",
    maxWidth: "95%",
    width: "500px",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    "& .mainBox": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "none",
      padding: "30px",
      [theme.breakpoints.down("xs")]: {
        padding: "20px 10px 50px",
      },
      "& h2": {
        textAlign: "center",
        paddingBottom: "0px",
        fontSize: "30px",
        fontWeight: "300",
        fontFamily: "'Sora', sans-serif",
        [theme.breakpoints.down("sm")]: {
          paddingBottom: "2px",
          fontSize: "22px !important",
        },
      },
    },
  },
  "& .otpClass": {
    "& input": {
      border: "none",
      borderRadius: "10px",
      fontSize: "20px",
      height: "71px !important",
      width: "75px !important",
      marginLeft: "11px",
      background: "#FFFFFF0D",
      [theme.breakpoints.down("sm")]: {
        height: "40px !important",
        width: "40px !important",
        marginLeft: "5px",
      },
    },
  },
}));

export default function ForgotPassword() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [timer, setTimer] = useState(180);
  const [showResendButton, setShowResendButton] = useState(false);

  console.log(" ---------------- router.query.query", router?.query?.email);
  const startTimer = () => {
    setTimer(180);
    setShowResendButton(false);
  };

  useEffect(() => {
    let timerInterval;

    if (timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
      setShowResendButton(true);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  const formInitialSchema = {
    email: router?.query?.email ? router?.query?.email : "",
  };
  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email.")
      .max(256, "Should not exceeds 256 characters.")
      .required("Email is required."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setisLoading(true);
      const formData = {
        email: values.email.toLowerCase(),
      };
      const response = await apiRouterCall({
        method: "PATCH",
        url: api_configs.forgotPasswordU,
        bodyData: formData,
      });
      if (response.data.responseCode == 200) {
        toast.success(response.data.responseMessage);
        router.replace(`/auth/forgot-verify?${values.email.toLowerCase()}`);
        let endTime = moment().add(3, "m").unix();
        const timeLefts = calculateTimeLeft(endTime * 1000);
        sessionStorage.setItem("otpTimer", JSON.stringify(timeLefts));
        setisLoading(false);
      } else {
        setisLoading(false);
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error:", error);
    }
  };

  const handleResend = () => {
    startTimer();
  };

  return (
    <ForgotComponent>
      {" "}
      <CustomHead
        title="Forgot Password | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="loginBox">
        <Box align="center">
          <Typography variant="h3" color="primary" fontWeight="600">
            Forgot Password
          </Typography>

          <Typography
            variant="body2"
            color="secondary"
            mt={2}
            style={{ textAlign: "center", fontSize: "16px" }}
          >
            Already have an account?{" "}
            <span
              style={{
                cursor: "pointer",

                fontWeight: "700",
              }}
              onClick={() => router.push("/auth/login")}
            >
              Log in
            </span>
          </Typography>
        </Box>

        <Formik
          initialValues={{
            email: router?.query?.email ? router?.query?.email : "",
          }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form>
              <Box mt={5}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={values.email.toLowerCase()}
                  error={Boolean(touched.email && errors.email)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                  // inputProps={{ style: { textTransform: "lowercase" } }}
                />
                <FormHelperText error>
                  {touched.email && errors.email}
                </FormHelperText>
              </Box>
              <Box mt={3} align="center" mb={4}>
                <PaymentButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Submit{isLoading && <ButtonCircularProgress />}
                </PaymentButton>
              </Box>
            </Form>
          )}
        </Formik>

        {/* <Box mt={1}>
          <TermComp isShow={false} />
        </Box> */}
      </Box>
    </ForgotComponent>
  );
}

ForgotPassword.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
