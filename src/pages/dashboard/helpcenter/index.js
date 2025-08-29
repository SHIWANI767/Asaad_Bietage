import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
  Paper,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import styled from "@emotion/styled";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import DashboardLayout from "@/layout/DashboardLayout";
import CustomHead from "@/components/CustomHead";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { checkNumber } from "@/utils";

const MainBoxInput = styled("div")(({ theme }) => ({
  "& .MuiInputBase-root": {
    fontWeight: "300",
    fontSize: "12px",
    fontFamily: "'Sora', sans-serif",
    lineHeight: "1.4375em",
    letterSpacing: "0.00938em",
    color: "#fff",
    boxSizing: "border-box",
    position: "relative",
    cursor: "text",
    display: "inline-flex",
    WebkitAlignItems: "center",
    WebkitBoxAlign: "center",
    MsFlexAlign: "center",
    alignItems: "center",
    padding: "16.5px 14px",
    width: "100%",
    border: "1px solid #80808014",
    // borderRadius: "5px",
    // background: "#1e2720",
    borderBottom: "none !important",
    height: "148px !important",
    borderRadius: "5px !important",
  },
}));
const HelpCenterStyle = styled("div")(({ theme }) => ({
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
    width: "698px",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    "& .mainBox": {
      // backgroundColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "none",
      padding: "40px",
      [theme.breakpoints.down("xs")]: {
        padding: "20px",
      },
      "& h2": {
        textAlign: "center",
        paddingBottom: "40px",
        [theme.breakpoints.down("xs")]: {
          paddingBottom: "20px",
        },
      },
    },
    "& .displayBox": {
      paddingBottom: "20px",
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
      paddingTop: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .agreeBox": {
      "& p": {
        color: "rgba(255, 255, 255, 0.87)",
        width: "100%",
        maxWidth: "536px",
        paddingBottom: "20px",
        margin: "0 auto",
        fontSize: "16px",
      },
      "& span": {
        color: "#81E396",
      },
    },
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
}));

export default function HelpCenter() {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const formInitialSchema = {
    name: "",
    email: "",
    mobile: "",
    message: "",
  };
  const formValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required.")
      .max(256, "Should not exceed 256 characters."),
    // mobile: yup
    //   .string()
    //   .matches(/^[0-9]+$/, "Mobile number must contain only digits.")
    //   .min(10, "Mobile number must be at least 10 characters.")
    //   .max(15, "Mobile number must not exceed 15 characters.")
    //   .required("Mobile number is required."),
    message: yup.string().required("Message is required."),
  });

  const handleSubmit = async (values, resetForm) => {
    if (!isValidNumber) {
      return;
    }
    setIsLoading(true);
    try {
      // addContactUs
      const bodyData = {
        email: values.email.toLowerCase(),
        name: values.name,
        // mobileNo: values.mobile?.toString(),
        message: values.message,
      };
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.addContactUs,
        bodyData: bodyData,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        resetForm({
          values: {
            // mobile: "+44",
            name: "",
            email: "",
            // mobile: "",
            message: "",
          },
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <HelpCenterStyle>
      <CustomHead
        title="Contact Us | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="loginBox">
        <Paper className="mainBox" elevation={2}>
          <Box align="center">
            <Typography variant="h3" color="primary">
              Contact Us
            </Typography>
          </Box>

          <Formik
            initialValues={formInitialSchema}
            validationSchema={formValidationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, resetForm);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              setFieldValue,
              touched,
              values,
            }) => (
              <Form>
                <Box>
                  <Box mt={2}>
                    <Typography variant="body2" color="primary">
                      Full Name
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Enter full name..."
                    type="text"
                    name="name"
                    value={values.name}
                    error={Boolean(touched.name && errors.name)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      textTransform: "lowerCase",
                    }}
                  />
                  <FormHelperText error>
                    {touched.name && errors.name}
                  </FormHelperText>
                </Box>
                <Box>
                  <Box mt={2}>
                    <Typography variant="body2" color="primary">
                      Email
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Enter email address..."
                    type="text"
                    name="email"
                    value={values.email.toLowerCase()}
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{ style: { textTransform: "lowercase" } }}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </Box>

                <Box>
                  <Box mt={2}>
                    <Typography variant="body2" color="primary">
                      Message
                    </Typography>
                  </Box>
                  <MainBoxInput>
                    <Input
                      fullWidth
                      variant="outlined"
                      type="text"
                      multiline
                      rows="6"
                      name="message"
                      placeholder="Enter message..."
                      value={values.message}
                      error={Boolean(touched.message && errors.message)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.message && errors.message}
                    </FormHelperText>
                  </MainBoxInput>
                </Box>
                <Box className="displayCenter" mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    Submit {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </HelpCenterStyle>
  );
}

HelpCenter.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
