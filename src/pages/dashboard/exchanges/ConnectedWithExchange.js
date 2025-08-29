import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Typography,
  Container,
  Paper,
  Select,
  MenuItem,
  Avatar,
  TextField,
  FormHelperText,
  styled,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { ExchangeArray, funConEx, sortAddress } from "@/utils";
import AppContext from "@/context/AppContext";
import { api_configs } from "@/api-services";
import SortAddress from "@/utils/SortAddress";
import HandleDocusealContract from "./HandleDocusealContract";

const ConnectExchangeBox = styled("div")(({ theme }) => ({
  "& .forgetBox": {
    margin: "15px auto",
    maxWidth: "90%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
    "& .MuiSelect-root": {
      padding: "0px !important",
    },

    "& h4": {
      fontSize: "20px",
    },
    "& h2": {
      textAlign: "center",
    },
    "& .serverBox": {
      background: "#1a271abd",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "24px",

      "& span": {
        textTransform: "initial",
        marginTop: "50px",
        // color: "#9090A3",
        lineHeight: "1",
      },
    },
    "& .forwardBox": {
      textAlign: "center",
    },
    "& h5": {
      lineHeight: "normal",
    },
  },

  "& .exchangeBox": {
    position: "relative",
    zIndex: "999",

    "& h4": {
      color: "#E9CB59",
    },
    "& h2": {
      color: "#9090A3",
      fontWeight: 500,
      textAlign: "center",
      margin: "8px 0px",
    },
    "& p": {
      fontWeight: "400",
      color: "#9090A3",
    },

    // "& .MuiInput-underline:before": {
    //   borderBottom: "2px solid rgba(255, 255, 255, 0.25)",
    // },
  },
  "& .avtClx": {
    "& .MuiAvatar-root": {
      width: "20px",
      height: "20px",
      marginLeft: "5px",
    },
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
      color: "#81E396",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "& a": {
      color: "#81E396",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));

export default function ConnectedWithExchange() {
  const token = window.localStorage.getItem("user_token");
  const [exchangeList, setExchangeList] = useState([]);
  const [serverIPAddress, setServerIPAddress] = useState("");
  const [sbmtBtnTxt, setSbmtBtnTxt] = useState("Submit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [useDocusealContract, setUseDocusealContract] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const auth = useContext(AppContext);

  const [exchnageType, setExchangeType] = useState(0);
  let maxAPILength = 510;
  const formInitialSchema = {
    apikey: "",
    secretkey: "",
    passphrase: "",
    apiMemo: "",
    exchnageType: "",
  };
  const formValidationSchema = yep.object().shape(
    exchnageType === "coinbasepro"
      ? {
          exchnageType: yep.string().required("Please select your exchange."),
          apikey: yep
            .string()
            .required("Please enter your API key.")
            .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          secretkey: yep
            .string()
            .required("Please enter your secret key.")
            .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          // apiMemo: yep
          //   .string()
          //   .required("Please enter your passphrase key")
          //   .min(10, "Please enter atleast 10 characters.")
          //   .max(
          //     maxAPILength,
          //     `You can enter only ${maxAPILength} characters.`
          //   ),
        }
      : exchnageType === "bitmart"
      ? {
          exchnageType: yep.string().required("Please select your exchange."),
          apikey: yep
            .string()
            .required("Please enter your API key.")
            .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          secretkey: yep
            .string()
            .required("Please enter your secret key.")
            .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          apiMemo: yep
            .string()
            .required("Please enter your apiMemo key")
            .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
        }
      : {
          exchnageType: yep.string().required("Please select your exchange."),
          apikey: yep
            .string()
            .required("Please enter your API key.")
            .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
          secretkey: yep
            .string()
            .required("Please enter your secret key.")
            .min(10, "Please enter atleast 10 characters.")
            .max(
              maxAPILength,
              `You can enter only ${maxAPILength} characters.`
            ),
        }
  );

  const getExchangeListHandler = async (token) => {
    try {
      // const response = await getDataHandlerAPI("listExchange", token);
      const response = await axios({
        method: "GET",
        url: api_configs.listExchange,
        headers: {
          token: token,
        },
      });
      if (response) {
        const filterFun = response.data.result;
        // cansole.log("filterFun", filterFun);
        // let newArray = [];
        // for (let i = 0; i < filterFun.length; i++) {
        //   newArray.push({ ...filterFun[i], ...ExchangeArray[i] });
        // }
        setExchangeList(filterFun);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getServerIPHandler = async (token) => {
    try {
      // const response = await getDataHandlerAPI("serverIPAddress");
      const response = await axios({
        method: "GET",
        url: api_configs.serverIPAddress,
      });
      if (response) {
        setServerIPAddress(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectExchangeHandler = async (values, resetForm) => {
    try {
      setSbmtBtnTxt("Processing...");
      let apiMemo = values.exchnageType === "bitmart" ? values.apiMemo : null;
      let passphrase =
        values.exchnageType !== "bitmart" ? values.apiMemo : null;
      const dataToSend = {
        uid: values.exchnageType,
        apiKey: values.apikey,
        secretKey:
          exchnageType == "coinbase"
            ? String(values.secretkey).replace(/\\n/g, "\n")
            : values.secretkey,
        // passphrase: values.passphrase,
        customerId: "",
        tradePassword: "",
        passphrase: passphrase,
        apiMemo: apiMemo,
      };

      setIsProcessing(true);
      // const response = await dataPostHandler("connectExchange", dataToSend);
      const response = await axios({
        method: "POST",
        url: api_configs.connectExchange,
        headers: {
          token: token,
        },
        // data: formData,
        data: dataToSend,
      });
      if (response.status === 200) {
        setIsProcessing(false);
        resetForm({ values: "" });
        toast.success(response.data.responseMessage);
        auth.getConnectedExchangeList(token);
        setSbmtBtnTxt("Submit");
      } else {
        setIsProcessing(false);
        toast.error(response.data.responseMessage);
        setSbmtBtnTxt("Submit");
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }

      setSbmtBtnTxt("Submit");
    }
  };

  useEffect(() => {
    if (token) {
      getExchangeListHandler(token);
      getServerIPHandler(token);
    }
  }, [token]); // eslint-disable-line

  function filterExchanges(exchangeNames, exchanges) {
    return exchanges.filter((exchange) =>
      exchangeNames.includes(exchange.exchangeName)
    );
  }

  // const result =
  //   exchangeList &&
  //   isAccessPlansExchange &&
  //   filterExchanges(exchangeList, isAccessPlansExchange);
  const handleChangeCheck = (event) => {
    setUseDocusealContract(event.target.checked);
  };

  useEffect(() => {
    if (auth?.userData?.isDocuseal) {
      setIsChecked(auth?.userData?.isDocuseal);
    }
  }, [auth?.userData?.isDocuseal]);

  return (
    <ConnectExchangeBox>
      <Box className=" paperBox">
        <Paper elevation={2} className="paperBox">
          <Formik
            initialValues={formInitialSchema}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={formValidationSchema}
            onSubmit={(values, { resetForm }) => {
              connectExchangeHandler(values, resetForm);
              // console.log(("Values", values));
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue,
            }) => (
              <Form>
                <Box mb={1}>
                  <Typography variant="body2" mb={2}>
                    Connected Exchange
                  </Typography>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className="formControl"
                  >
                    <Select
                      name="exchnageType"
                      // name="apikey"
                      value={exchnageType}
                      error={Boolean(
                        touched.exchnageType && errors.exchnageType
                      )}
                      onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(e) => {
                        handleChange(e);
                        console.log("e.target.value", e.target.value);
                        setExchangeType(e.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value="0">
                        <Typography
                          variant="body2"
                          color="primary"
                          fontSize="13px"
                        >
                          Choose your Exchange
                        </Typography>
                      </MenuItem>
                      {exchangeList &&
                        funConEx(exchangeList)?.map((map, i) => {
                          return (
                            <MenuItem value={map?.uid}>
                              <Box
                                className="avtClx"
                                value={map?.uid}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar
                                  src={map?.img}
                                  alt={map?.exchangeName}
                                  style={{
                                    height: "26px",
                                    width: "26px",
                                    marginLeft: "0px",
                                  }}
                                />

                                <span
                                  style={{
                                    padding: "0 0 0 10px",
                                    fontSize: "13px",
                                  }}
                                >
                                  {map?.exchangeName}
                                </span>
                              </Box>
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <FormHelperText error className={"classes.helperText"}>
                    {touched.exchnageType && errors.exchnageType}
                  </FormHelperText>
                </Box>
                <Typography variant="body2" mb={1} mt={3}>
                  Enter API Key
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  id="standard-basic"
                  placeholder="Please enter your API Key"
                  name="apikey"
                  value={values.apikey}
                  error={Boolean(touched.apikey && errors.apikey)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{ maxLength: maxAPILength + 1 }}
                />
                <FormHelperText error className={"classes.helperText"}>
                  {touched.apikey && errors.apikey}
                </FormHelperText>
                <Box my={2}>
                  <Typography variant="body2" mb={1}>
                    Enter Secret Key
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    id="standard-basic"
                    placeholder="Please enter your secret key"
                    name="secretkey"
                    type="text"
                    value={values.secretkey.toString()}
                    error={Boolean(touched.secretkey && errors.secretkey)}
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    onChange={(e) => {
                      setFieldValue("secretkey", e.target.value.toString());
                    }}
                    inputProps={{ maxLength: maxAPILength + 1 }}
                  />
                  <FormHelperText error className={"classes.helperText"}>
                    {touched.secretkey && errors.secretkey}
                  </FormHelperText>
                </Box>
                {exchnageType === "bitmart" && (
                  <Box mt={2.5}>
                    <Typography variant="body2" mb={1}>
                      Enter API Memo
                    </Typography>
                    <TextField
                      fullWidth
                      variant="standard"
                      id="standard-basic"
                      placeholder="Enter api memo"
                      name="apiMemo"
                      value={values.apiMemo}
                      error={Boolean(touched.apiMemo && errors.apiMemo)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{ maxLength: maxAPILength + 1 }}
                    />
                    <FormHelperText error className={"classes.helperText"}>
                      {touched.apiMemo && errors.apiMemo}
                    </FormHelperText>
                  </Box>
                )}
                {/* <Box>
                <Typography variant="h5" fontWeight="600" mb={1}>
                  Move forward for OTP Verification
                </Typography>
                <Typography
                  variant="body1"
                  color="secondary"
                  style={{ maxWidth: "300px" }}
                >
                  You'll receive a 6-digit verification code in your registered
                  email. Please check your mailbox.
                </Typography>
              </Box> */}

                <Box
                  my={2}
                  display="flex"
                  alignItems="center"
                  onClick={() => setUseDocusealContract(!useDocusealContract)}
                  sx={{
                    cursor: "pointer",
                    userSelect: "none",
                    "& .MuiCheckbox-root": { padding: 0 },
                    pointerEvents: auth?.userData?.isDocuseal ? "none" : "auto",
                  }}
                >
                  <Checkbox
                    name="useDocusealContract"
                    checked={auth?.userData?.isDocuseal || isChecked}
                    onChange={handleChangeCheck}
                    onClick={(event) => event.stopPropagation()}
                  />{" "}
                  &nbsp;
                  <Typography variant="body2" color="secondary">
                    Sign in with docuseal contract.
                  </Typography>
                </Box>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isProcessing || !auth?.userData?.isDocuseal}
                  >
                    {sbmtBtnTxt}
                    {/* {isProcessing && <ButtonCircularProgress />} */}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Paper elevation={2} style={{ marginTop: "20px" }}>
            <Typography variant="body2" color="primary">
              Server IP Addresses:
            </Typography>
            <Box className="displayStart">
              <SortAddress
                address={"13.43.178.122"}
                showAll={true}
                isStart={true}
              />
            </Box>
            <Box className="displayStart">
              <SortAddress
                address={"13.42.214.167"}
                showAll={true}
                isStart={true}
              />
            </Box>
            <Box className="displayStart">
              <SortAddress
                address={"18.130.209.222"}
                showAll={true}
                isStart={true}
              />
            </Box>
            <Typography
              variant="body2"
              style={
                {
                  /* textTransform: "initial", marginTop: "50px",color:"#9090A3" */
                }
              }
            >
              Please whitelist the above IP in your exchange before connecting
              with it.
            </Typography>
          </Paper>
        </Paper>
        {useDocusealContract && (
          <HandleDocusealContract
            open={useDocusealContract}
            handleClose={() => setUseDocusealContract()}
            email={auth.userData.email}
            name={auth.userData.firstName + " " + auth.userData.lastName}
          />
        )}
      </Box>
    </ConnectExchangeBox>
  );
}
