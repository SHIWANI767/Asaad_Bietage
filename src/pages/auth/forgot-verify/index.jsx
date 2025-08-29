import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import OTPInput from "react-otp-input";
import ReCAPTCHA from "react-google-recaptcha";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import Timer from "@/components/Timer/Timer";
import { api_configs, reCaptacha } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import AppContext from "@/context/AppContext";
import CustomHead from "@/components/CustomHead";
import { PaymentButton } from "@/components/PaymentForm";
import SettingsContext from "@/context/SettingsContext";

const OtpComponent = styled(Box)(({ theme }) => ({
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
      backgroundImage: "none",
      boxShadow: "none",
      padding: "30px",
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
          fontSize: "22px !important",
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
        color: theme.palette.text.green,
        fontWeight: "500",
      },
    },
    "& .optPositionBoxleft ": {
      "& span": {
        color: theme.palette.text.green,
        fontWeight: "500",
      },
    },
  },
}));

export default function ForgotOtpVerify() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const themeSetting = useContext(SettingsContext);
  const [OTP, setOTP] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [done, setDone] = useState(false);
  const recaptchaRef = React.createRef();
  let email = window.location.search.split("?")[1];

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
        window.localStorage.removeItem("otpTimer");
        router.replace("/auth/reset-password?query=" + res.data.result.token);
        setIsVerifying(false);
      } else {
        toast.error(res.data.responseMessage);
        setIsVerifying(false);
        setOTP("");
      }
    } catch (error) {
      console.log(error);
      setIsVerifying(false);
      setOTP("");
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
              variant="body2"
              color="secondary"
              mt={2}
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              We have sent a code to your email{" "}
              {/* <span
                style={{
                  cursor: "pointer",

                  fontWeight: "700",
                }}
              >
                {email}
              </span> */}
            </Typography>
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

          <Box className="displayCenter" mt={4} pb={4}>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              numInputs={4}
              autoFocus={true}
              renderInput={(props) => <input {...props} />}
              secure
            />
          </Box>
          <Box className="optPositionBoxleft">
            {/* <span
           
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

          <Box align="center" my={2} className="captchamainBox">
            <form
              onSubmit={() => {
                recaptchaRef.current.execute();
              }}
            >
              <ReCAPTCHA
                checked={done}
                // sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
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
              disabled={!OTP || OTP.length !== 4 || isVerifying || !done}
              onClick={verifyOTPHandler}
            >
              Submit
            </PaymentButton>
          </Box>
        </Paper>
        {/* <Box mt={1}>
          <TermComp isShow={true} />
        </Box> */}
      </Box>
    </OtpComponent>
  );
}

ForgotOtpVerify.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
