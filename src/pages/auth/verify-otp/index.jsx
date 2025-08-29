import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import OTPInput from "react-otp-input";
import ReCAPTCHA from "react-google-recaptcha";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { api_configs, reCaptacha } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import AppContext from "@/context/AppContext";
import CommonConfirmationDialog from "@/components/CommonConfirmationDialog";
import Timer from "@/components/Timer/Timer";
import CustomHead from "@/components/CustomHead";
import SettingsContext from "@/context/SettingsContext";
import jwt from "jsonwebtoken";
import { PaymentButton } from "@/components/PaymentForm";

const OtpComponent = styled(Box)(({ theme }) => ({
  height: "100%",
  position: "relative",
  zIndex: "999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  "& .loginBox": {
    height: "initial",
    margin: "15px auto",
    maxWidth: "95%",
    width: "500px",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    "& .mainBox": {
      backgroundColor: "transparent",
      boxShadow: "none",
      padding: "30px",
      backgroundImage: "none",
      position: "relative",
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
        },
      },
    },
    "& input": {
      border: "none",
      borderRadius: "10px",
      fontSize: "20px",
      height: "60px !important",
      width: "60px !important",
      marginRight: "16px",
      color: theme.palette.text.secondary,
      background: theme.palette.background.textFeild,
      [theme.breakpoints.down("sm")]: {
        height: "60px !important",
        width: "60px !important",
        marginRight: "5px",
      },
    },
    "& .contentsubText": {
      maxWidth: "221px",
      fontSize: "12px",
      marginTop: "5px",
      lineHeight: "19px",
    },
    "& h6": {
      color: "rgba(255, 255, 255, 0.87)",
      fontWeight: "300",
      textAlign: "center",
      marginBottom: "30px",
      "& span": {
        color: "rgba(129, 227, 150, 1)",
        fontWeight: "500",
      },
    },
  },
}));

export default function VerifyOtp() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const [OTP, setOTP] = useState("");
  const [OTPV, setOTPV] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [done, setDone] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const recaptchaRef = React.createRef();
  const themeSetting = useContext(SettingsContext);
  let email = window.location.search.split("?")[1];
  const previousRoutes = sessionStorage.getItem("previousRoute");
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("lastRoute", router.asPath);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location]);
  // console.log(" -------------- themeSetting ", themeSetting.settings.theme);
  useEffect(() => {
    const lastRoute = sessionStorage.getItem("lastRoute");
    const previousRoute = sessionStorage.getItem("previousRoute");
    if (lastRoute && previousRoute) {
      sessionStorage.removeItem("lastRoute");
      sessionStorage.removeItem("previousRoute");
      router.replace(previousRoute);
    }
  }, [router]);

  const verifyOTPHandler = async () => {
    setIsVerifying(true);
    try {
      const res = await apiRouterCall({
        method: "PATCH",
        url: api_configs.verifyOTP,
        bodyData: {
          email: email,
          otp: OTP,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        if (!res.data.result.googleAuthenction) {
          window.localStorage.removeItem("otpTimer");
          if (previousRoutes === "/auth/login") {
            router.replace("/");
            auth.userLogIn(true, res.data.result.token);
            window.sessionStorage.setItem("token", res.data.result.token);
            // let token = jwt.decode(res.data.result.token);
            // console.log(token, "token -------------------------");
          } else {
            router.replace("/auth/login");
          }
        } else {
          setOpenOTP(true);
          setOTP("");
        }
        setIsVerifying(false);
      } else {
        const { responseMessage } = res.data;
        const errorMessage =
          responseMessage === "The entered OTP is incorrect."
            ? "The OTP you entered is incorrect. Please try again."
            : responseMessage === "The OTP has expired."
            ? "The OTP has expired. Please request a new one."
            : responseMessage;
        toast.error(errorMessage);
        setIsVerifying(false);
        setOTP("");
      }
    } catch (error) {
      console.log(error);
      setIsVerifying(false);
      setOTP("");
    }
  };
  const handleSubmit = async (OTPD) => {
    setisLoading2(true);
    try {
      const res = await apiRouterCall({
        method: "GET",
        url: api_configs.verifyGoogleAuthenctionCode,
        paramsData: {
          email: email,
          code: OTPD,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        router.replace("/");
        auth.userLogIn(true, res.data.result.token);
        window.sessionStorage.setItem("user_token", res.data.result.token);
        setisLoading2(false);
        setOpenOTP(false);
      } else {
        toast.error(
          res.data.responseMessage !== "The entered OTP is incorrect."
            ? res.data.responseMessage
            : "The OTP you entered is incorrect. Please try again."
        );
        setisLoading2(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading2(false);
    }
  };

  return (
    <OtpComponent>
      <CustomHead
        title="Verify OTP | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="loginBox">
        <Paper className="mainBox" elevation={2}>
          <Box align="center">
            <Typography variant="h3" color="primary" fontWeight="600">
              Enter code from email
            </Typography>
            <Typography
              className="contentsubText"
              variant="body2"
              color="secondary"
            >
              {/* We have sent a code to your email */}
              Enter the 4-digit verification code sent to
            </Typography>{" "}
            <Typography
              variant="body2"
              color="secondary"
              className="contentsubText textShadowBox"
              style={{
                cursor: "pointer",
                background:
                  themeSetting.settings.theme == "DARK"
                    ? "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)"
                    : "linear-gradient(90.73deg, rgb(21 47 26) 2.09%, rgb(37 49 15) 34.92%)",
                fontWeight: "700",
                whiteSpace: "pre",
              }}
            >
              {" "}
              {email}
            </Typography>
          </Box>

          <Box>
            <Box className="displayCenter" mt={4}>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                inputType="number"
                numInputs={4}
                autoFocus={true}
                renderInput={(props) => <input {...props} />}
                secure
              />
            </Box>

            <Box></Box>
            <Box className="optPositionBoxleft">
              {/* <span
                variant="text"
                onClick={() => {
                  router.push("/auth/forgot-password");
                }}
              >
                Forgot Password?
              </span> */}
            </Box>
            <Box align="right" mr={3} mt={1} className="optPositionBox">
              <Timer email={email} setOTP={setOTP} />
            </Box>
          </Box>

          <Box align="center" my={2} className="captchamainBox">
            <form
              onSubmit={() => {
                recaptchaRef.current.execute();
              }}
            >
              <ReCAPTCHA
                checked={done}
                sitekey={reCaptacha}
                onChange={() => setDone(true)}
                style={{ display: "flex", justifyContent: "center" }}
              />
            </form>
          </Box>

          <Box mt={2} align="center">
            <PaymentButton
              variant="contained"
              color="primary"
              fullWidth
              // disabled={!OTP || OTP.length !== 4 || isVerifying || !done}
              onClick={verifyOTPHandler}
            >
              Submit
            </PaymentButton>
          </Box>
        </Paper>
      </Box>
      {openOTP && (
        <CommonConfirmationDialog
          open={openOTP}
          handleClose={() => setOpenOTP(false)}
          type="VERIFY"
          title="Verify OTP"
          heading="Please verify google authentication otp"
          handleSubmit={(v) => handleSubmit(v)}
          setOTP={(e) => setOTPV(e)}
          OTPV={OTPV}
          isLoading={isLoading2}
        />
      )}
    </OtpComponent>
  );
}

VerifyOtp.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
