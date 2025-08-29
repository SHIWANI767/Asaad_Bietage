import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Form, Formik } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import LoginLayout from "@/layout/LoginLayout/LoginLayout";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import { toast } from "react-hot-toast";
import CustomHead from "@/components/CustomHead";
import { SecurePassword } from "@/components/PasswordStrengthIndicator";
import { PaymentButton } from "@/components/PaymentForm";

const ResetComponent = styled(Box)(({ theme }) => ({
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
  },
}));

export default function ResetPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(" ---------------- router.query.query", router.query);
  const formInitialSchema = {
    password: "",
    confirmPassword: "",
  };
  const formValidationSchema = yup.object().shape({
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

    confirmPassword: yup
      .string()
      .required("Please enter the confirmation password.")
      .oneOf([yup.ref("password"), null], "Passwords Doesn't match."),
  });
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = {
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const response = await apiRouterCall({
        method: "PATCH",
        url: api_configs.resetPasswordU,
        bodyData: formData,
        token: router.query.query,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        router.replace("/auth/login");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ResetComponent>
      <CustomHead
        title="Reset Password | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="loginBox">
        <Box align="center">
          {" "}
          <Typography variant="h3" color="primary" fontWeight="600">
            Create New Password
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
              <Box>
                {/* <Box mt={2} mb={1}>
                    <Typography variant="body2" color="#fff">
                      Create Password
                    </Typography>
                  </Box> */}
                <Box mt={5} mb={2}>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Please enter a password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{
                              marginBottom: "7px",
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
                </Box>
                {/* <FormHelperText error>
                    {touched.password && errors.password}
                  </FormHelperText> */}

                {touched.password && (
                  <SecurePassword password={values.password} />
                )}

                {/* <Typography variant="body2" color="#fff">
                      Confirm Password
                    </Typography> */}

                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Please enter a password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            marginBottom: "7px",
                            background: "transparent",
                          }}
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
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
                  {touched.confirmPassword && errors.confirmPassword}
                </FormHelperText>
              </Box>
              <Box mt={2} align="center">
                <PaymentButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Reset Password
                </PaymentButton>
              </Box>

              <Box mt={2} className="displayCenter">
                <Typography
                  variant="body2"
                  style={{ textAlign: "center", fontSize: "13px" }}
                >
                  <span
                    style={{
                      color: "#fff",
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
                  style={{ textAlign: "center", fontSize: "13px" }}
                >
                  <span
                    style={{ color: "#fff", cursor: "pointer" }}
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
    </ResetComponent>
  );
}

ResetPassword.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
