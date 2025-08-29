"use client";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Divider,
  Checkbox,
  Grid,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useFormik } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import PrivacyModal from "@/layout/LoginLayout/PrivacyModal";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { apiRouterCall } from "@/api-services/service";
import { api_configs, reCaptacha } from "@/api-services";
import { toast } from "react-hot-toast";
import AppContext from "@/context/AppContext";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt from "jsonwebtoken";
import CustomHead from "@/components/CustomHead";
import moment from "moment";
import { calculateTimeLeft } from "@/utils";
import Link from "next/link";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SecurePassword } from "@/components/PasswordStrengthIndicator";
import Popup from "@/components/DynamicModel";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { LiaKeySolid } from "react-icons/lia";
import HandleGoogleDefaul from "@/components/HandleGoogleDefaul";
import Cookies from "js-cookie";
import SettingsContext from "@/context/SettingsContext";
import dynamic from "next/dynamic";
import { BiWorld } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { PiIdentificationCardLight } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { PaymentButton } from "@/components/PaymentForm";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

const SignupComponent = styled("div")(({ theme }) => ({
  "& .react-tel-input .country-list .country": {
    padding: "7px 9px",
    textAlign: "left",
    backgroundColor: "#2D2D2D",
    color: "#fff",
    "&:hover": {
      background: "#000000e3",
    },
  },
  "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
    {
      backgroundColor: "transparent !important",
    },
  "& .react-tel-input .selected-flag": {
    "&:hover": {
      backgroundColor: "none",
    },
    backgroundColor: "#202020",
  },
  "& .react-tel-input .selected-flag .arrow": {
    left: "20px",
  },
  "& .react-tel-input .country-list .country.highlight": {
    backgroundColor: "#000000e3",
  },
  "& .react-tel-input .flag-dropdown ": {
    backgroundColor: "transparent",
    //   borderRight: "1px solid #949494",
    border: "none",
    height: "44px",
    position: "absolute",
    top: "5px",
  },
  "& .react-tel-input .flag-dropdown.open .selected-flag": {
    background: "#FFFFFF06",
  },

  position: "relative",
  zIndex: "999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
    marginBottom: "20px",
  },
  "& .loginBox": {
    height: "initial",
    margin: "15px auto",
    maxWidth: "90%",
    width: "500px",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    "& .signupButoonBox": {
      margin: "12px 0",
      [theme.breakpoints.down("sm")]: {
        margin: "20px 0",
      },
    },
    "& span": {
      color: "rgba(38, 38, 38,0.7)",
    },
    "& .mainBox": {
      padding: "30px",
      // overflow: "scroll",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "none",
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
    "& .displayBox": {
      paddingBottom: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "10px",
      },
      "& .divider": {
        flex: "1",
        // borderColor: "rgba(255, 255, 255, 0.25)",
      },
      "& .orText": {
        margin: "0px 10px",
      },
    },
    "& .displayButton": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "14px",
      },
    },
    "& .MuiSelect-root": {
      height: "50px",
    },
    "& .agreeBox": {
      [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
      },
      "& p": {
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
        color: theme.palette.text.green,
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
  },
}));
export const PhoneLogoBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  height: "18px",
  width: "18px",
  top: "33%",
  left: "16px",
}));
export const PhoneInputBox = styled(FormControl)(({ theme }) => ({
  position: "relative",
  "& .react-tel-input .form-control": {
    width: "100%",
    color: theme.palette.text.secondary,
    height: "48.69px",
    background: theme.palette.background.textFeild,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "24px",
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.01071em",
    borderRadius: "12px",
  },
  "& .react-tel-input .country-list .country": {
    padding: "7px 9px",
    textAlign: "left",
    backgroundColor: "#2D2D2D",
    color: "#fff",
    "&:hover": {
      background: "#000000e3",
    },
  },
  "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
    {
      backgroundColor: "#28322b !important",
    },
  "& .react-tel-input .selected-flag": {
    backgroundColor: "#262626",
    "&:hover": {
      backgroundColor: "none",
    },
  },
  "& .react-tel-input .selected-flag .arrow": {
    left: "20px",
  },

  "& .react-tel-input .country-list .country.highlight": {
    background: "#000000e3 !important",
    fontSize: "16px",
  },
  "& .react-tel-input .flag-dropdown ": {
    backgroundColor: "transparent",
    border: "none",
    height: "44px",
    position: "absolute",
    top: "5px",
  },
  "& .react-tel-input .flag-dropdown.open .selected-flag": {
    background: "#FFFFFF06",
    fontSize: "16px",
  },
  "& .react-tel-input .country-list .country": {
    padding: "7px 9px",
    textAlign: "left",
    backgroundColor: "#2D2D2D",
    color: "#fff",
    "&:hover": {
      background: "#000000e3",
    },
  },
  "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
    {
      backgroundColor: "transparent !important",
    },
  "& .react-tel-input .selected-flag": {
    "&:hover": {
      backgroundColor: "none",
    },
  },
  "& .react-tel-input .selected-flag .arrow": {
    left: "20px",
  },

  "& .react-tel-input .country-list .country.highlight": {
    background: "#000000e3 !important",
    fontSize: "16px",
    display: "none",
  },
  "& .react-tel-input .flag-dropdown ": {
    backgroundColor: "transparent",
    display: "none",
    height: "44px",
    position: "absolute",
    top: "5px",
  },
  "& .MuiSelect-root": {
    height: "51px",
  },
  "& .react-tel-input .flag-dropdown.open .selected-flag": {
    background: "#FFFFFF06",
    fontSize: "16px",
  },
}));

export default function Signup() {
  const router = useRouter();
  const auth = useContext(AppContext);
  const themeSetting = useContext(SettingsContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [creadentailsData, setcreadentailsData] = useState("");
  const [loginedToken, setloginedToken] = useState("");
  const [open, setOpen] = useState(false);
  const [openReferral, setOpenReferral] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const recaptchaRef = React.createRef();
  const [isChecked, setIsChecked] = useState(false);
  const [countries, setCountries] = useState([]);
  const AcceptTerm_Condition = Cookies.get("AcceptTerm_Condition");
  const [isSubmitted, setisSubmitted] = useState(false);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(
    AcceptTerm_Condition == "ACCEPT" ? false : true
  );
  const [isAccepted, setisAccepted] = useState(AcceptTerm_Condition);
  const onReCaptchaChange = (value) => {
    setDone(value);
  };
  const onVerifyCallback = (response) => {
    if (response) {
      setDone(true);
    } else {
      setDone(false);
    }
  };

  useEffect(() => {
    axios.get("/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
    });
  }, []);

  const handleAcceptPrivacyPolicy = () => {
    setisAccepted("ACCEPT");
    Cookies.set("AcceptTerm_Condition", "ACCEPT", { expires: 30 });
  };
  const handleDeclinePrivacyPolicy = () => {
    setisAccepted("DECLINE");
    Cookies.set("AcceptTerm_Condition", "DECLINE", { expires: 1 });
    Cookies.remove("AcceptTerm_Condition", "DECLINE", { expires: 1 });
  };

  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email.")
      .max(56, "Email should not exceed 56 characters.")
      .required("Email is required."),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email"), null], "Confirm email doesn't match.")
      .required("Confirm email is required."),
    password: yup
      .string()
      .required("Password is required.")
      .max(16, "Password should not exceed 16 characters.")
      .min(8, "Password must be a minimum of 8 characters.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Please enter a valid password."
      ),
    confirmPassword: yup
      .string()
      .required("Confirm password is required.")
      .oneOf([yup.ref("password"), null], "Confirm password Doesn't match."),
    ibiId: yup
      .string()
      .trim()
      .max(25, "IBI Id should not exceed 25 characters.")
      .min(6, "IBI Id must be a minimum of 6 characters.")
      .matches(
        /^\s*(?=.*[a-zA-Z0-9])\S{6,25}\s*$/,
        "Please enter a valid IBI Id."
      ),
    lastName: yup
      .string("Please enter valid last name.")
      .required("Last name is required.")
      .matches(
        /^[a-zA-Z\s,-.']+$/,
        "Only alphabets and white spaces are allowed for this field."
      )
      .min(3, "Please enter atleast 3 characters.")
      .max(60, "You can enter only 60 characters."),
    firstName: yup
      .string("Please enter valid first name.")
      .required("First name is required.")
      .matches(
        /^[a-zA-Z\s,-.']+$/,
        "Only alphabets and white spaces are allowed for this field."
      )
      .min(3, "Please enter atleast 3 characters.")
      .max(60, "You can enter only 60 characters."),
    mobileNumber: yup
      .number()
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .required("Phone number is required."),

    country: yup.string().required("Country is required."),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      confirmPassword: "",
      password: "",
      referralId: "",
      ibiId: "",
      country: "",
      mobileNumber: "",
      referralId: auth.refferalCode ? auth.refferalCode : "",
      countryCode: "",
      skip: auth.refferalCode ? true : false,
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      try {
        if (!values.skip) {
          setOpenReferral(true);
          return;
        }
        window.localStorage.setItem("user_email", values.email);
        setIsLoading(true);
        const bodyData = {
          email: values.email.toLowerCase(),
          password: values.password,
          termsAndConditions: isAccepted,
          firstName: values.firstName,
          lastName: values.lastName,
          countryCode: values.countryCode,
          country: values.country,
          mobileNumber: values.mobileNumber,
        };
        if (values.ibiId) {
          bodyData.ibiId = values.ibiId;
        }
        if (values.referralId) {
          bodyData.referralId = values.referralId;
        }
        const response = await apiRouterCall({
          method: "POST",
          url: api_configs.userSignup,
          bodyData: bodyData,
        });
        if (response.data.responseCode === 200) {
          toast.success(response.data.responseMessage);
          let endTime = moment().add(3, "m").unix();
          if (endTime) {
            const timeLefts = calculateTimeLeft(endTime * 1000);
            sessionStorage.setItem("otpTimer", JSON.stringify(timeLefts));
          }
          sessionStorage.setItem("previousRoute", router.asPath);
          router.replace(`/auth/verify-otp?${values.email.toLowerCase()}`);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(response.data.responseMessage);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
  });
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
        termsAndConditions: isAccepted,
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
      console.log(" ----- error ", error);
      if (error?.response) {
        toast.error(error?.response?.data?.responseMessage);
      } else {
        toast.error(error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  return (
    <SignupComponent>
      <CustomHead
        title="Signup | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="loginBox">
        <Box align="center" mb={2}>
          <Typography variant="h3" color="primary" fontWeight="600">
            SIGN UP
          </Typography>
          <Typography
            variant="body2"
            color="secondary"
            mt={2}
            style={{ textAlign: "center", fontSize: "16px" }}
          >
            Already have an account?{" "}
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
              onClick={() => router.push("/auth/login")}
            >
              Log in
            </span>
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                variant="standard"
                placeholder="First name"
                type="text"
                name="firstName"
                value={formik.values.firstName}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                onBlur={formik.handleBlur}
                disabled={isLoading}
                onChange={formik.handleChange}
                autoComplete="off"
                onKeyPress={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                inputProps={{
                  maxLength: 61,
                }}
                InputProps={{
                  maxLength: 61,

                  startAdornment: (
                    <InputAdornment position="start">
                      <FiUser style={{ color: "#585757", fontSize: "25px" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error>
                {formik.touched.firstName && formik.errors.firstName}
              </FormHelperText>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Last name"
                type="text"
                name="lastName"
                value={formik.values.lastName}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                onBlur={formik.handleBlur}
                disabled={isLoading}
                onChange={formik.handleChange}
                autoComplete="off"
                onKeyPress={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiUser style={{ color: "#585757", fontSize: "25px" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <FormHelperText error>
                {formik.touched.lastName && formik.errors.lastName}
              </FormHelperText>
            </Grid>
          </Grid>

          <Box mt={2}>
            <FormControl
              fullWidth
              sx={{
                "@media(max-width:780px)": {
                  "& .MuiSelect-select": {
                    padding: "11px 0px",
                  },
                },
              }}
            >
              <Select
                name="country"
                value={formik.values.country}
                onBlur={formik.handleBlur}
                disabled={isLoading}
                onChange={formik.handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return (
                      <Typography
                        variant="body2"
                        color="secondary"
                        style={{
                          margin: "0px",
                          fontSize: "15px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BiWorld
                          height={20}
                          width={20}
                          style={{ color: "#585757", fontSize: "25px" }}
                        />{" "}
                        &nbsp; &nbsp; Country
                      </Typography>
                    );
                  }

                  return (
                    <Typography
                      variant="body2"
                      color="secondary"
                      style={{
                        margin: "0px",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <BiWorld
                        height={20}
                        width={20}
                        style={{ color: "#585757", fontSize: "25px" }}
                      />{" "}
                      &nbsp; &nbsp; {selected}
                    </Typography>
                  );
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled>
                  Select country
                </MenuItem>
                {countries &&
                  countries.map((map) => {
                    return (
                      <MenuItem key={map.name} value={map.name}>
                        {map.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormHelperText error>
              {formik.touched.country && formik.errors.country}
            </FormHelperText>
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Email"
              type="text"
              name="email"
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              onChange={formik.handleChange}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineMail
                      style={{ color: "#585757", fontSize: "25px" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText error>
              {formik.touched.email && formik.errors.email}
            </FormHelperText>
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Confirm email"
              type="text"
              name="confirmEmail"
              value={formik.values.confirmEmail}
              error={
                formik.touched.confirmEmail &&
                Boolean(formik.errors.confirmEmail)
              }
              onBlur={formik.handleBlur}
              disabled={isLoading}
              onChange={formik.handleChange}
              autoComplete="off"
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineMail
                      style={{ color: "#585757", fontSize: "25px" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText error>
              {formik.touched.confirmEmail && formik.errors.confirmEmail}
            </FormHelperText>
          </Box>
          <Box mt={2}>
            <PhoneInputBox fullWidth>
              <PhoneInput
                fullWidth
                country={"gb"}
                name="mobileNumber"
                value={formik.values.mobileNumber}
                error={Boolean(
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                )}
                onBlur={formik.handleBlur}
                onChange={(phone, e) => {
                  formik.setFieldValue("countryCode", e.dialCode);
                  formik.setFieldValue("mobileNumber", phone);
                  console.log(e);
                }}
                inputProps={{
                  name: "mobileNumber",
                }}
                disabled={isLoading}
              />
              <PhoneLogoBox>
                <BsTelephone style={{ color: "#585757", fontSize: "20px" }} />
              </PhoneLogoBox>
            </PhoneInputBox>
            <FormHelperText error>
              {formik.touched.mobileNumber && formik.errors.mobileNumber}
            </FormHelperText>
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              onChange={formik.handleChange}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
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
            {formik.touched.password && Boolean(formik.errors.password) && (
              <SecurePassword password={formik.values.password} />
            )}
            <FormHelperText error>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </Box>

          <Box mt={2}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Confirm password"
              type={showPassword1 ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              onBlur={formik.handleBlur}
              disabled={isLoading}
              onChange={formik.handleChange}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
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
                      onClick={() => setShowPassword1(!showPassword1)}
                      edge="end"
                    >
                      {showPassword1 ? (
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
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </FormHelperText>
          </Box>

          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              <Box mt={2}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="IBI Id"
                  type="text"
                  name="ibiId"
                  value={formik.values.ibiId}
                  error={formik.touched.ibiId && Boolean(formik.errors.ibiId)}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PiIdentificationCardLight
                          height={20}
                          width={20}
                          style={{ color: "#585757", fontSize: "25px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormHelperText error>
                  {formik.touched.ibiId && formik.errors.ibiId}
                </FormHelperText>
              </Box>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Box mt={2}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Referral Id"
                  type="text"
                  name="referralId"
                  value={formik.values.referralId}
                  error={
                    formik.touched.referralId &&
                    Boolean(formik.errors.referralId)
                  }
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  onChange={(e) => {
                    let refCode = e.target.value
                      ? e.target.value.includes("refCode=")
                        ? e.target.value.split("refCode=")[1]
                        : e.target.value
                      : "";
                    formik.setFieldValue("skip", true);
                    formik.setFieldValue("referralId", refCode);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlinePeopleAlt
                          style={{ color: "#585757", fontSize: "25px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormHelperText error>
                  {formik.touched.referralId && formik.errors.referralId}
                </FormHelperText>
              </Box>
            </Grid>
          </Grid>

          <Box className="agreeBox displayStart" mt={1} mb={1} align="center">
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
          <Box align="center">
            <form
              onSubmit={() => {
                recaptchaRef.current.execute();
              }}
            >
              <ReCAPTCHA
                verifyCallback={onVerifyCallback}
                sitekey={reCaptacha}
                onChange={onReCaptchaChange}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </form>
          </Box>

          <Box className="displayCenter signupButoonBox">
            <PaymentButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={!done || isLoading || !isChecked}
              sx={{ color: "#9c9e9c" }}
            >
              {isLoading ? <ButtonCircularProgress /> : <>Next</>}
            </PaymentButton>
          </Box>
          <Box className="displayBox">
            <Divider className="divider" sx={{ borderColor: "#9c9e9c" }} />
            <Typography variant="h6" className="orText" color="secondary">
              Or
            </Typography>
            <Divider className="divider" sx={{ borderColor: "#9c9e9c" }} />
          </Box>
          <Box className="displayButton" sx={{ mt: 0, mb: 10 }}>
            <GoogleOAuthProvider
              style={{ height: "50px", marginLeft: "16px" }}
              customStyle="custom-google-login-button"
              clientId="103662991738-80mpu8atsoj7ce9h1ao239avf6kmhj5n.apps.googleusercontent.com"
              disabled={!done || !isChecked}
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
                disabled={!done || !isChecked}
              />
            </GoogleOAuthProvider>
          </Box>
        </form>
      </Box>

      <Popup
        open={openReferral}
        maxWidth="sm"
        handleClose={() => {
          if (!isLoading) {
            setOpenReferral(false);
            formik.setFieldValue("skip", true);
          }
        }}
        isLoading={isLoading}
        title={"Enter referral id if you have one"}
        actions={[
          {
            label: "skip",
            onClick: () => {
              setOpenReferral(false);
              formik.setFieldValue("skip", true);
            },
            color: "secondary",
            variant: "contained",
          },
          {
            label: "Submit",
            onClick: () => {
              formik.handleSubmit();
              setisSubmitted(true);
            },
            type: "submit",
            color: "primary",
            variant: "contained",
            isLoading: isLoading,
          },
        ]}
      >
        <Box>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2" color="primary" mb={0.5}>
              Referral Id
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Referral Id"
            type="text"
            name="referralId"
            value={formik.values.referralId}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            onChange={(e) => {
              let refCode = e.target.value
                ? e.target.value.includes("refCode=")
                  ? e.target.value.split("refCode=")[1]
                  : e.target.value
                : "";
              formik.setFieldValue("skip", true);
              formik.setFieldValue("referralId", refCode);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlinePeopleAlt
                    style={{ color: "#585757", fontSize: "25px" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <FormHelperText error>
            {isSubmitted &&
              !formik.values.skip &&
              "Please enter an refferral id."}
          </FormHelperText>
        </Box>
      </Popup>
      {acceptedPrivacyPolicy && (
        <PrivacyModal
          open={acceptedPrivacyPolicy}
          handleClose={() => setAcceptedPrivacyPolicy(false)}
          onAccept={handleAcceptPrivacyPolicy}
          onDecline={handleDeclinePrivacyPolicy}
        />
      )}
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
