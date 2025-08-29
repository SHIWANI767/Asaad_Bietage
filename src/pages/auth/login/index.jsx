import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Checkbox,
  Divider,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Form, Formik } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import moment from "moment";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt from "jsonwebtoken";
import axios from "axios";
import AppContext from "@/context/AppContext";
import { IoMailOutline } from "react-icons/io5";
import { LiaKeySolid } from "react-icons/lia";
import { calculateTimeLeft } from "@/utils";
import SettingsContext from "@/context/SettingsContext";
import dynamic from "next/dynamic";
import { PaymentButton } from "@/components/PaymentForm";

const HandleGoogleDefaul = dynamic(() =>
  import("@/components/HandleGoogleDefaul")
);
const CustomHead = dynamic(() => import("@/components/CustomHead"));
const ButtonCircularProgress = dynamic(() =>
  import("@/components/ButtonCircularProgress")
);

const SignupComponent = styled("div")(({ theme }) => ({
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
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "none",
      padding: "40px",
      [theme.breakpoints.down("xs")]: {
        padding: "20px",
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
    "& .displayBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& .divider": {
        flex: "1",
        borderColor: "rgba(255, 255, 255, 0.25)",
      },
      "& .orText": {
        margin: "0px 10px",
      },
    },
    "& .displayButton": {
      width: "100%",
      maxWidth: " 416px",
      margin: "0 auto",
      paddingTop: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  "& .agreeBox": {
    "& span": {
      // color: "#81E396",
      cursor: "pointer",
      padding: "0px",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  "& .MuiButtonBase-root-MuiButton-root": {
    textDecoration: "none",
    backgroundColor: "red",
  },
}));

export default function Signup() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const themeSetting = useContext(SettingsContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const loginDataParse = window.localStorage.getItem("loginData");
  const [creadentailsData, setcreadentailsData] = useState("");
  const [loginedToken, setloginedToken] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loginDataParse) {
      setIsRemember(true);
    }
  }, [loginDataParse]);
  const formInitialSchema = {
    email: loginDataParse ? JSON.parse(loginDataParse).email : "",
    password: loginDataParse ? JSON.parse(loginDataParse).password : "",
  };
  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email.")
      .max(256, "Should not exceeds 256 characters.")
      .required("Email is required."),
    password: yup
      .string()
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Please enter a valid password."
      )
      .required("Password is required.")
      .max(16, "Password should not exceed 16 characters.")
      .min(8, "Password must be a minimum of 8 characters."),
  });

  const handleFormSubmit = async (values) => {
    const formData = {
      email: values.email.toLowerCase(),
      password: values.password,
    };
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.login,
        bodyData: formData,
      });
      if (response.data.responseCode === 200) {
        let obj = JSON.stringify(formData);
        window.localStorage.setItem("loginData", obj);
        toast.success(response.data.responseMessage);
        let endTime = moment().add(3, "m").unix();
        if (endTime) {
          const timeLefts = calculateTimeLeft(endTime * 1000);
          sessionStorage.setItem("otpTimer", JSON.stringify(timeLefts));
        }
        sessionStorage.setItem("previousRoute", router.asPath);
        router.push(`/auth/verify-otp?${values.email.toLowerCase()}`);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };
  const responseGoogle = async (response, type) => {
    setIsLoading(true);
    var token = response?.credential;
    var decoded = type === "facebook" ? response : jwt.decode(token);
    try {
      const creadentails = {
        email: decoded?.email.toLowerCase(),
        firstName: decoded?.name.split(" ")[0],
        lastName: decoded?.name.split(" ")[1]
          ? decoded?.name.split(" ")[1]
          : decoded?.name.split(" ")[0],
        socialId: type === "facebook" ? decoded?.id : decoded?.sub,
        socialType: "Google",
        // termsAndConditions: isAccepted,
      };
      const res = await axios({
        method: "POST",
        url: api_configs.socialLogin,
        data: creadentails,
      });
      if (res.data.responseCode === 200) {
        if (res.data?.result?.result?.mobileNumber == "") {
          console.log(res.data.result, "loginedToken");
          setloginedToken(res.data.result.token);
          setcreadentailsData(creadentails);
          setOpen(true);
        } else {
          sessionStorage.setItem("user_token", res.data.result.token);
          auth.userLogIn(true, res.data.result.token);
          toast.success("log in successfully.");
          router.replace(`/`);
        }
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.responseMessage);
      } else {
        toast.error(error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SignupComponent>
      <CustomHead
        title="Login | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="loginBox">
        <Box align="center" mb={2}>
          <Typography variant="h3" color="primary" fontWeight="600">
            Login
          </Typography>

          <Typography
            variant="body2"
            color="secondary"
            mt={2}
            style={{ textAlign: "center", fontSize: "16px" }}
          >
            Don't have an account?{" "}
            <span
              className="textShadowBox"
              style={{
                cursor: "pointer",
                background:
                  themeSetting.settings.theme == "DARK"
                    ? "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)"
                    : "linear-gradient(90.73deg, rgb(21 47 26) 2.09%, rgb(37 49 15) 34.92%)",
                fontWeight: "700",
              }}
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </span>
          </Typography>
        </Box>

        <Formik
          initialValues={formInitialSchema}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoMailOutline
                          style={{ color: "#585757", fontSize: "25px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormHelperText error>
                  {touched.email && errors.email}
                </FormHelperText>
              </Box>

              <Box mt={2}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LiaKeySolid
                          style={{ color: "#585757", fontSize: "25px" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            background: "transparent",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <HiEye style={{ color: "#585757" }} />
                          ) : (
                            <HiEyeOff style={{ color: "#585757" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText error>
                  {touched.password && errors.password}
                </FormHelperText>
              </Box>

              <Box
                className="agreeBox displaySpacebetween"
                mt={2.5}
                mb={1}
                align="center"
              >
                <Box
                  className="displayStart"
                  onClick={() => !isLoading && setIsRemember(!isRemember)}
                >
                  <Checkbox checked={isRemember} defaultChecked /> &nbsp;
                  <Typography variant="body2" color="secondary">
                    Remember me
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="primary"
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() =>
                    router.push(
                      "/auth/forgot-password" +
                        `?email=${values.email.toLowerCase()}`
                    )
                  }
                >
                  Forgot Password?
                </Typography>
              </Box>
              <Box className="displayCenter" mt={4}>
                <PaymentButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login {isLoading && <ButtonCircularProgress />}
                </PaymentButton>
              </Box>

              <Box className="displayBox" mt={2}>
                <Divider className="divider" />
                <Typography variant="h6" className="orText" color="secondary">
                  Or
                </Typography>
                <Divider className="divider" />
              </Box>

              <Box className="displayButton">
                <GoogleOAuthProvider
                  style={{ height: "50px", marginLeft: "16px" }}
                  customStyle="custom-google-login-button"
                  clientId="103662991738-80mpu8atsoj7ce9h1ao239avf6kmhj5n.apps.googleusercontent.com"
                >
                  <GoogleLogin
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    text="Google"
                    theme="outline_white"
                    size="large"
                    shape="circle"
                    scope="profile email"
                  />
                </GoogleOAuthProvider>
              </Box>

              <Box mt={2} className="displayCenter">
                <Typography
                  variant="body2"
                  color="primary"
                  style={{ textAlign: "center", fontSize: "13px" }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      marginRight: "14px",
                      borderRight: "2px solid gray",
                      paddingRight: "13px",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push("/terms-and-conditions")}
                  >
                    Terms of Service
                  </span>
                </Typography>

                <Typography
                  variant="body2"
                  color="primary"
                  style={{ textAlign: "center", fontSize: "13px" }}
                >
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/privacy-policy")}
                  >
                    Privacy Policy
                  </span>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      {open && (
        <HandleGoogleDefaul
          open={open}
          handleClose={() => setOpen(false)}
          values={loginedToken}
          creadentailsData={creadentailsData}
        />
      )}
    </SignupComponent>
  );
}

Signup.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
