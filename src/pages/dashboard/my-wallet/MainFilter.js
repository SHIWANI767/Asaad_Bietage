import React from "react";
import {
  Box,
  styled,
  Grid,
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Padding } from "@mui/icons-material";

const PerformingCryptoAssestsBox = styled("div")(({ theme }) => ({
  "& button": {
    fontSize: "12px",
    borderRadius: "12px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      // height: "36px !important",
      padding: "10px 48px",
    },
  },

  "& .textFieldBox": {
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiOutlinedInput-input": {
      padding: "7px 0px !important",
    },
    "& .MuiButtonBase-root": {
      zIndex: "1",
    },
    "&  .MuiAutocomplete-endAdornment": {
      position: "absolute",
      right: "0px",
      top: "calc(30% - 14px) !important",
    },
  },
  "& .csvButton": {},
  "& .MuiAutocomplete-endAdornment": {
    marginRight: "0px",
  },
  "& .MuiAutocomplete-endAdornment": {
    position: "absolute",
    right: "0px",
    top: "calc(40% - 14px)",
  },
  "& .sideButton": {
    [theme.breakpoints.down("md")]: {
      marginTop: "0px",
    },
  },
  "& .MuiSelect-select": {
    borderRadius: "12px",
  },
  "& .MuiButtonBase-root": {
    // height: "44px",

    // [theme.breakpoints.down("sm")]: {
    //   // fontSize: "10px",
    //   height: "36px !important",
    // },
    "& button": {
      paddingRight: "20px",
    },
  },
  "& .MuiInputBase-root": {
    // height: "44px",
    paddingRight: "16px",
    [theme.breakpoints.down("sm")]: {
      // fontSize: "10px",
    },
  },

  "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
    color: "#00000",
    "-webkit-text-fill-color": "#00000 !important",
  },
  "& .MuiList-root-MuiMenu-list": {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  "& .MuiMenuItem": {
    // [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
    minHeight: "35px",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingRight: "8px",
    paddingLeft: "10px",
    // },
    // },
  },
}));

export default function MainFilter(props) {
  const {
    type,
    setToDate,
    toDate,
    setExchanges,
    exchanges,
    fromDate,
    setFromDate,
    setSearch,
    search,
    searchPlaceHolder,
    setisSearch,
    isSearch,
  } = props;

  // console.log(" ----- isSearch ", isSearch);
  return (
    <PerformingCryptoAssestsBox>
      <Box className={"mainfilter"} mb={2}>
        <Box className="filterpaper">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Box mb={1}>
                <Typography variant="body2" color="primary">
                  Search
                </Typography>
              </Box>
              <TextField
                variant="standard"
                fullWidth
                placeholder={
                  searchPlaceHolder ? searchPlaceHolder : "Search..."
                }
                name="search"
                value={search}
                onChange={(e) => {
                  if (e.target.value.length <= 256) {
                    setSearch(e.target.value);
                  }
                }}
              />
            </Grid>
            {exchanges && (
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <Box mb={1}>
                  <Typography variant="body2" color="primary">
                    Select
                  </Typography>
                </Box>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className="formControl"
                >
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={exchanges}
                    onChange={(e) => setExchanges(e.target.value)}
                  >
                    <MenuItem value={"1"}>Select Exchange</MenuItem>
                    <MenuItem value={"Binance"}>Binance</MenuItem>{" "}
                    <MenuItem value={"Mexc"}>Mexc</MenuItem>
                    <MenuItem value={"Kraken"}>Kraken</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Box className="textFieldBox">
                <Typography variant="body2" color="primary" mb={1}>
                  From
                </Typography>

                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  inputProps={{
                    readOnly: true,
                  }}
                  style={{ width: "100%" }}
                >
                  <DatePicker
                    fullWidth
                    value={fromDate}
                    disableFuture
                    onChange={(date) => {
                      setFromDate(new Date(date));
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    inputProps={{
                      readOnly: true, // Make the input field read-only
                    }}
                  />
                </LocalizationProvider>
              </Box>
              {/* <LocalizationProvider
                dateAdapter={AdapterDayjs}
                fullWidth
                variant="standard"
                style={{ width: "100%" }}
              >
                <DatePicker
                  fullWidth
                  value={fromDate}
                  onChange={(date) => {
                    setFromDate(new Date(date));
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  placeholder="DD/MM/YYYY"
                  disableFuture
                  InputProps={{ readOnly: true }}
                />
              </LocalizationProvider> */}
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Box className="textFieldBox">
                <Typography variant="body2" color="primary" mb={1}>
                  To
                </Typography>

                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  fullWidth
                  style={{ width: "100%" }}
                >
                  <DatePicker
                    fullWidth
                    value={toDate}
                    onChange={(date) => {
                      setToDate(new Date(date));
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    placeholder="DD/MM/YYYY"
                    disableFuture
                    // minDate={fromDate}
                    InputProps={{ readOnly: true }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Box className="displayStart responsiveManage">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setisSearch(!isSearch)}
                >
                  Search
                </Button>{" "}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => {
                  setFromDate(null);
                  setToDate(null);
                  setSearch("");
                  type === "wallet" && setExchanges("1");
                  setisSearch(!isSearch);
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PerformingCryptoAssestsBox>
  );
}
