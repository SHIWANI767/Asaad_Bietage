import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Button,
  Grid,
  Switch,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  InputAdornment,
  Link,
  useTheme,
} from "@mui/material";
import {
  borderRadius,
  fontSize,
  fontWeight,
  padding,
  styled,
} from "@mui/system";
import OTPInput from "react-otp-input";
import DashboardLayout from "@/layout/DashboardLayout";
import {
  apiRouterCall,
  getAPIHandler,
  patchAPIHandler,
  putAPIHandler,
} from "@/api-services/service";
import * as yup from "yup";
import { HiEye, HiEyeOff } from "react-icons/hi";
import AppContext from "@/context/AppContext";
import toast from "react-hot-toast";
import WestIcon from "@mui/icons-material/West";
import Popup from "@/components/DynamicModel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { MenuProps, checkNumber, replacetext } from "@/utils";
import { api_configs } from "@/api-services";
import SortAddress from "@/utils/SortAddress";
import { Form, Formik } from "formik";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import { SecurePassword } from "@/components/PasswordStrengthIndicator";
import { MdOutlineMail, MdOutlinePeopleAlt } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { LiaKeySolid } from "react-icons/lia";
import SettingsContext from "@/context/SettingsContext";
import { useRouter } from "next/router";
import CountrySelectModal from "@/components/CountrySelectModal";

export const PhoneInputBox = styled(FormControl)(({ theme }) => ({
  position: "relative",
  "& h4": {
    fontWeight: "400",
  },
  "& .react-tel-input .form-control": {
    width: "100%",
    color: theme.palette.text.secondary,
    height: "48.69px",
    // background: theme.palette.background.textFeild,
    // border: "1px solid rgba(255, 255, 255, 0.1)",

    border: `1px solid ${
      theme.palette.mode === "dark" ? "#FFFFFF1A" : "transparent"
    }`,
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(228.52deg, rgba(21, 21, 20, 0.88) -63.21%, rgba(22, 22, 20, 0.83) 116.99%)"
        : "#ff",
    paddingLeft: "57px !important",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "24px",
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.01071em",
    borderRadius: "12px",
    // color: #FFFFFF99;
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
  // },
  // "& .outlineborder2": {

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
    // backgroundColor: "#202020",
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
    height: "55px",
  },
  "& .react-tel-input .flag-dropdown.open .selected-flag": {
    background: "#FFFFFF06",
    fontSize: "16px",
  },
}));
export const PhoneLogoBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  height: "18px",
  width: "18px",
  top: "33%",
  left: "16px",
}));
const SettingProfileBox = styled(Box)(({ theme }) => ({
  marginTop: "25px",
  "& label": {
    color: "#fff",
  },
  "& .filterpaper": {
    "& p": {
      fontSize: "12px",
    },
  },
  "& h4": {
    fontSize: "18px",
    fontWeight: "500",
  },
  "& .MuiOutlinedInput-input.MuiSelect-select": {
    padding: "0px",
  },
  "& .MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {
    height: "55px",
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.primary,

    // border: "1px solid #80808014",
  },
}));
const DisplayStart = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});
const OTPVerificationBox = styled("div")(({ theme }) => ({
  "& input": {
    border: "none",
    borderRadius: "8px",
    fontSize: "20px",
    height: "55px !important",
    width: "55px !important",
    marginRight: "10px",
    color: theme.palette.text.primary,
    background: theme.palette.background.textFeild,
    [theme.breakpoints.down("sm")]: {
      height: "30px !important",
      width: "30px !important",
      marginRight: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "30px !important",
      width: "30px !important",
      marginRight: "5px",
    },
  },
}));

const ReadProfileBox = styled("div")(({ theme }) => ({
  "& .MuiTypography-root-MuiDialogTitle-root": {
    // color: theme.palette.test.primary,
    fontFamily: "Sora',sans-serif;",
    texAlign: "center",
    fontSize: "28px",
    paddingBottom: "16px",
    margin: "0px !important",
    padding: "0px !important",
  },

  "& .closeIcon": {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
  "& .textField": {
    marginTop: "24px",
    "& .css-gz0g0y-MuiInputBase-root-MuiOutlinedInput-root": {
      borderRadius: "16px !important",
    },
  },
  "& .confirmationDialogBox": {
    "& .titleBox": {
      "& h4": {
        // color: theme.palette.test.primary,
        fontFamily: "Sora',sans-serif;",
        texAlign: "center",
        margin: "16px 0px",
      },
    },

    "& h6": {
      // color: theme.palette.test.primary,
      fontFamily: "Sora',sans-serif;",
      texAlign: "center",
      marginTop: "10px",
      fontWeight: "400",
    },
    "& p": {
      color: "rgba(0, 0, 0, 0.60)",
      fontFamily: "Gilroy-Light",
      textAlign: "center",
      width: "100%",
      maxWidth: "320px",
      margin: "16px 0px",
    },
  },
  "& .disclaimerBox": {
    background: "rgba(0, 0, 0, 0.08)",
    borderRadius: "10px",
    padding: "10px",
    "& p": {
      color: "rgba(0, 0, 0, 0.60)",
      fontFamily: "Gilroy-Regular",
    },
  },
}));
export default function SettingProfile() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const themeSetting = useContext(SettingsContext);
  const [isNext, setIsNext] = useState(false);
  const [OTP, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tabView, setTabView] = useState("Account");
  const [showQRModal, setShowQRModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [qrCodeURL, setQRCodeURL] = useState({
    secret: "",
    url: "",
  });
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState(false); //setCountryCode

  useEffect(() => {
    axios.get("/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
    });
  }, []);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    mobileNumber: "",
    countryCode: "",
  });

  useEffect(() => {
    if (auth.userData) {
      const { email, firstName, lastName, mobileNumber, country, countryCode } =
        auth?.userData;
      setCountryCode(countryCode);
      setFormData({
        email,
        firstName,
        lastName,
        mobileNumber,
        country: country
          ? country?.length > 2
            ? country
            : countries?.find((item) => item.sortname === country)?.name
          : "",
        countryCode,
      });
    }
  }, [countries, auth.userData]);

  const handleClose = () => {
    setShowQRModal(false);
    setTimeout(() => {
      setIsNext(false);
      setOTP("");
    }, 500);
  };
  const handleAuthentication = async (source) => {
    if (auth.userData.speakeasy) {
      setShowQRModal(true);
      setIsNext(true);
    } else {
      try {
        setIsLoading(true);
        const response = await getAPIHandler({
          endPoint: "enableDisableGoogleAuthenction",
          source: source,
        });
        if (response.data.responseCode === 200) {
          toast.success(response.data.responseMessage);
          auth.getProfileDataHandler();
          setIsNext(false);
          setIsLoading(false);
        }
        if (response.data.result && response.data.result.url) {
          setQRCodeURL({
            url: response.data.result.url,
            secret: response.data.result.secret,
          });
          setShowQRModal(true);
          setIsNext(false);
        } else {
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  const handleSubmitVerify = async () => {
    try {
      setIsLoading(true);
      let paramsData = {
        email: auth.userData.email,
        code: OTP,
        type: auth.userData.speakeasy ? "disable" : "enable",
      };
      // const response = await getAPIHandler({
      //   endPoint: "verifyGoogleAuthenctionCodeForEnableDisable",
      //   paramsData: paramsData,
      // });
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.verifyGoogleAuthenctionCodeForEnableDisable,
        paramsData: paramsData,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        handleClose();
        setIsLoading(false);
        auth.getProfileDataHandler();
        setOTP("");
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleSubmit = () => {
    router.push({
      pathname: "/checkout/[id]",
      query: {
        id: "update-payment-method",
        // type:"hdjghdjhh"
      },
    });
  };

  return (
    <SettingProfileBox>
      <Paper
        elevation={2}
        className=" "
        sx={{
          minHeight: 0,
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            pt: 1,
            pb: 1,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack on small screens
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2, // Add spacing between stacked elements on mobile
          }}
        >
          {auth?.userData?.paymentType && (
            <>
              <Box
                sx={{
                  display: "flex",
                  // flexDirection: { xs: "column", sm: "row" }, // Stack text on mobile
                  // JustifyContent: { xs: "space-between", sm: "flex-start" }, // Stack text on mobile
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1,
                }}
              >
                <Typography variant="body2" color="primary">
                  Payment Type
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    wordBreak: "break-word", // Handle long payment type names gracefully
                  }}
                >
                  {replacetext(auth?.userData?.paymentType, "_", " ")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // flexDirection: { xs: "column", sm: "row" }, // Stack button on mobile
                  gap: 1,
                  "& a": {
                    cursor: "pointer",
                    background:
                      themeSetting?.settings?.theme === "DARK"
                        ? "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)"
                        : "linear-gradient(90.73deg, rgb(21 47 26) 2.09%, rgb(37 49 15) 34.92%)",
                    fontWeight: 700,
                    // padding: "5px 10px",
                    // borderRadius: "4px",
                    // textDecoration: "none",
                    // color: "inherit",
                    // textAlign: "center",
                  },
                }}
              >
                <Typography variant="body2" color="secondary">
                  Change Payment Method
                </Typography>
                <Link className="textShadowBox" onClick={handleSubmit}>
                  Update
                </Link>
              </Box>
            </>
          )}
          {auth?.userData?.country && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "& a": {
                  cursor: "pointer",
                  background:
                    themeSetting?.settings?.theme === "DARK"
                      ? "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)"
                      : "linear-gradient(90.73deg, rgb(21 47 26) 2.09%, rgb(37 49 15) 34.92%)",
                  fontWeight: 700,
                },
              }}
            >
              <Typography variant="subtitle1" color="secondary">
                Update Country
              </Typography>
              <Link
                className="textShadowBox"
                onClick={() => setOpenCountryModal(true)}
              >
                Update
              </Link>
            </Box>
          )}
        </Box>
      </Paper>

      <Paper elevation={2}>
        <Box className="displaySpacebetween">
          <Typography variant="h4" color="primary">
            Account
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="secondary">
            The Info provided won't be shared with any other parties
          </Typography>

          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography
                variant="body2"
                color="primary"
                fontSize="12px"
                mb={1}
              >
                First Name
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Enter first name"
                value={formData?.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                inputProps={{
                  readOnly: !isEdit,
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
                {isSubmit &&
                  formData.firstName == "" &&
                  "Please enter first name."}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography
                variant="body2"
                color="primary"
                fontSize="12px"
                mb={1}
              >
                Last Name
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Enter last name"
                value={formData?.lastName}
                inputProps={{
                  readOnly: !isEdit,
                }}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiUser style={{ color: "#585757", fontSize: "25px" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error>
                {isSubmit &&
                  formData.lastName == "" &&
                  "Please enter last name."}
              </FormHelperText>
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography
                variant="body2"
                color="primary"
                fontSize="12px"
                mb={1}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Email"
                value={formData?.email}
                inputProps={{
                  readOnly: true,
                }}
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
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              {" "}
              <Typography
                variant="body2"
                color="primary"
                fontSize="12px"
                mb={1}
              >
                Phone No
              </Typography>
              <PhoneInputBox fullWidth>
                <PhoneInput
                  fullWidth
                  country={"gb"}
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  error={Boolean(isSubmit && !isValidNumber)}
                  inputProps={{
                    name: "mobileNumber",
                    readOnly: !isEdit,
                  }}
                  onChange={(phone, e) => {
                    setFormData({ ...formData, mobileNumber: phone });
                    setCountryCode(e.dialCode);
                    const number = phone.slice(e.dialCode.length, phone.length);
                    const check = checkNumber(number);
                    setIsValidNumber(check);
                  }}
                  disabled={isLoading}
                />
                <PhoneLogoBox>
                  <BsTelephone style={{ color: "#585757", fontSize: "20px" }} />
                </PhoneLogoBox>
              </PhoneInputBox>
              <FormHelperText error>
                {Boolean(
                  formData.mobileNumber == "" && isSubmit && !isValidNumber
                ) && "Enter a valid mobile number."}

                {isSubmit &&
                  formData.mobileNumber !== "" &&
                  !isValidNumber &&
                  "Please enter mobile number."}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography
                variant="body2"
                color="primary"
                fontSize="12px"
                mb={1}
              >
                Country
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Country"
                value={formData?.country}
                inputProps={{
                  readOnly: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiWorld
                        height={20}
                        width={20}
                        style={{ color: "#585757", fontSize: "25px" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error>
                {isSubmit && formData.country == "" && "Please select country."}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography
                variant="body2"
                color="primary"
                fontSize="12px"
                mb={1}
              >
                Referral Code
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Enter last name"
                value={auth?.userData?.referralCode}
                inputProps={{
                  readOnly: true,
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
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Grid item lg={6} md={6} sm={6} xs={12} mt={2}>
        <Paper elevation={2} className="filterpaper">
          <Box>
            <Typography variant="h4" color="primary" mb={2}>
              Change Password
            </Typography>

            <Typography variant="body2" color="secondary" mb={2}>
              Ensure your new password is strong and secure. Use at least 8
              characters, including uppercase letters, numbers, and special
              symbols."
            </Typography>

            <Formik
              initialValues={{
                oldPassword: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={yup.object().shape({
                oldPassword: yup
                  .string()
                  .trim()
                  .required("Please enter old password.")
                  .min(6, "Please enter at least 6 characters.")
                  .max(18, "You can enter up to 18 characters."),
                password: yup
                  .string()
                  .trim()
                  .notOneOf(
                    [yup.ref("oldPassword"), null],
                    "Password cannot be the same as old password."
                  )
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Please enter a valid password."
                  )
                  .required("Please enter password.")
                  .min(6, "Please enter at least 6 characters.")
                  .max(18, "You can enter up to 18 characters."),
                confirmPassword: yup
                  .string()
                  .required("Confirm password and new password should match.")
                  .oneOf(
                    [yup.ref("password"), null],
                    "Confirm password does not match."
                  ),
              })}
              onSubmit={async (values, { resetForm }) => {
                try {
                  setIsUpdating(true);
                  const response = await putAPIHandler({
                    endPoint: "changePasswordUser",
                    dataToSend: {
                      oldPassword: values.oldPassword,
                      password: values.password,
                      confirmPassword: values.confirmPassword,
                    },
                  });
                  if (response.data.responseCode === 200) {
                    resetForm({
                      values: {
                        oldPassword: "",
                        password: "",
                        confirmPassword: "",
                      },
                    });
                    // window.sessionStorage.setItem("token", response.data.result.token);
                    toast.success(response.data.responseMessage);
                    // history("/dashboard");
                  } else {
                    toast.error(response.data.responseMessage);
                  }
                  setIsUpdating(false);
                } catch (error) {
                  setIsUpdating(false);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
              }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {/* <Box mb={1}> */}
                      <Typography variant="body2" color="primary" mb={1}>
                        Old Password
                      </Typography>
                      {/* </Box> */}

                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Please enter current password"
                        type={showPassword ? "text" : "password"}
                        name="oldPassword"
                        value={values.oldPassword}
                        error={Boolean(
                          touched.oldPassword && errors.oldPassword
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        InputProps={{
                          autoComplete: "off",
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
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword ? (
                                    <HiEye className={"iconClass1"} />
                                  ) : (
                                    <HiEyeOff className={"iconClass1"} />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error className={"helperText"}>
                        {touched.oldPassword && errors.oldPassword}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={12}>
                      {/* <Box mb={1}> */}
                      <Typography variant="body2" color="primary" mb={1}>
                        New Password
                      </Typography>
                      {/* </Box> */}

                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter new password"
                        type={showPassword1 ? "text" : "password"}
                        name="password"
                        value={values.password}
                        error={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                                onClick={() => setShowPassword1(!showPassword1)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword1 ? (
                                    <HiEye className={"iconClass1"} />
                                  ) : (
                                    <HiEyeOff className={"iconClass1"} />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <SecurePassword password={values.password} />
                      {/* <FormHelperText error className={"helperText"}>
                          {touched.password && errors.password}
                        </FormHelperText> */}
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} sm={12}>
                      {/* <Box mb={1}> */}
                      <Typography variant="body2" color="primary" mb={1}>
                        Confirm Password
                      </Typography>
                      {/* </Box> */}

                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter confirm password"
                        type={showPassword2 ? "text" : "password"}
                        name="confirmPassword"
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        value={values.confirmPassword}
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
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
                                onClick={() => setShowPassword2(!showPassword2)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword2 ? (
                                    <HiEye className={"iconClass1"} />
                                  ) : (
                                    <HiEyeOff className={"iconClass1"} />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error className={"helperText"}>
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="displayStart">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={isUpdating}
                        >
                          Submit
                          {isUpdating && <ButtonCircularProgress />}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
        <Paper elevation={2} className="filterpaper" sx={{ mt: 2 }}>
          <Box mb={3} className="flexBox">
            <Box>
              <Typography variant="h4" color="primary">
                Security
              </Typography>
              <Typography variant="body2" color="secondary" mt={1}>
                Secure Your Account with Two-Factor Authentication (2FA)
              </Typography>
              <Typography variant="body2" color="primary" mt={1}>
                Add an extra layer of security using 2FA
              </Typography>
            </Box>

            <DisplayStart onClick={handleAuthentication}>
              <Switch
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
                checked={auth?.userData?.speakeasy}
                disabled={isLoading}
                sx={{
                  pointerEvents: "none",
                }}
              />
            </DisplayStart>
          </Box>
        </Paper>
      </Grid>

      <Popup
        maxWidth="sm"
        open={showQRModal}
        handleClose={() => {
          if (!isLoading) {
            handleClose(false);
          }
        }}
        title={!isNext ? "Link an Authenticator" : "Verify Authenticator"}
        actions={[]}
        titleIcon={
          isNext &&
          !auth.userData?.speakeasy && (
            <Box display="flex" justifyContent="start" alignItems="center">
              <IconButton
                onClick={() => {
                  setIsNext(false);
                  setOTP("");
                }}
                sx={{ width: 0 }}
                size="large"
                disabled={isLoading}
              >
                <WestIcon />
              </IconButton>
            </Box>
          )
        }
      >
        <ReadProfileBox>
          {isNext ? (
            <>
              <Box className="confirmationDialogBox displayStart">
                <Typography variant="body2">
                  Enter the 6-digit code generated by the Authenticator App.
                </Typography>
              </Box>
              <Box className="displayCenter" mt={3} pb={1}>
                <OTPVerificationBox>
                  <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    inputType="number"
                    numInputs={6}
                    autoFocus={true}
                    renderInput={(props) => <input {...props} />}
                    secure
                  />
                </OTPVerificationBox>
              </Box>
              <Box mt={3} pb={1} className="displayCenter">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitVerify()}
                  disabled={!OTP || OTP.length !== 6 || isLoading}
                >
                  Submit
                </Button>
              </Box>
            </>
          ) : (
            <Box className="confirmationDialogBox displayColumn">
              <Typography variant="body2" pb={4} alignItems="center">
                Scan this QR code with an authenticator app to generate
                time-based login codes for enhanced security. Save the secret
                key for backup.
              </Typography>

              <img
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                src={qrCodeURL?.url}
                alt="QR Code"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />

              <Box className="imgBox" mt={1}>
                <Typography
                  variant="body2"
                  color="primary"
                  className="displayCenter"
                >
                  Secret: &nbsp; <SortAddress address={qrCodeURL?.secret} />
                </Typography>
              </Box>

              <Box mt={2} pb={1} className="displayCenter">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsNext(true)}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}
        </ReadProfileBox>
      </Popup>
      {openCountryModal && (
        <CountrySelectModal
          open={openCountryModal}
          handleClose={() => setOpenCountryModal(false)}
          type="update"
        />
      )}
    </SettingProfileBox>
  );
}

SettingProfile.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
