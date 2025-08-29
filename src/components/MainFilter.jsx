import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { borderRadius, padding, styled } from "@mui/system";
import { CSVLink } from "react-csv";
import moment from "moment";
import { replaceValue } from "@/utils";
import { Padding } from "@mui/icons-material";

const MainFilterBox = styled(Box)(({ theme }) => ({
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
const flattenObject = (obj, parent = "", res = {}) => {
  for (let key in obj) {
    let propName = parent ? parent + "." + key : key;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else {
      let readableKey = parent ? toReadableFormat(key) : toReadableFormat(key);
      res[readableKey] = obj[key];
    }
  }
  return res;
};

// const flattenObject = (obj, parent = "", res = {}) => {
//   for (let key in obj) {
//     let propName = parent ? parent + "." + key : key;
//     if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//       flattenObject(obj[key], propName, res);
//     } else {
//       let readableKey = parent ? toReadableFormat(key) : toReadableFormat(key);
//       res[readableKey] = obj[key];
//     }
//   }
//   return res;
// };

const toReadableFormat = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Add a space before capital letters
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
};
export default function MainFilter({
  filter,
  setFilter,
  clearFilters,
  onClickFun,
  userData,
  type,
  placeholder,
  fileNames = "user_details",
  isRemove,
  isDownLoading,
  onDownload,
  limit,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const statusType = [
    {
      label: "ACTIVE",
      value: "ACTIVE",
    },
    {
      label: "BLOCK",
      value: "BLOCK",
    },
  ];
  const registerType = [
    {
      label: "REGISTER",
      value: "REGISTER",
    },
    {
      label: "CURRENT SUBSRCIPTION",
      value: "SUBSRCIPTION",
    },
    {
      label: "PREVIOUS SUBSRCIPTION",
      value: "SUBSRCIPTION_PREVIOUS",
    },
  ];
  const planStatus = [
    {
      label: "ACTIVE",
      value: "ACTIVE",
    },
    {
      label: "INACTIVE",
      value: "INACTIVE",
    },
  ];

  const paymentStatus = [
    {
      label: "waiting",
      value: "waiting",
    },
    {
      label: "confirming",
      value: "confirming",
    },
    {
      label: "confirmed",
      value: "confirmed",
    },
    {
      label: "sending",
      value: "sending",
    },
    {
      label: "partially_paid",
      value: "partially_paid",
    },
    {
      label: "finished",
      value: "finished",
    },
    {
      label: "failed",
      value: "failed",
    },
    {
      label: "refunded",
      value: "refunded",
    },
    {
      label: "expired",
      value: "expired",
    },
  ];
  const arbitrageType = [
    {
      label: "AUTO",
      value: "AUTO",
    },
    {
      label: "MANUAL",
      value: "MANUAL",
    },
  ];
  const transactionArbitrage = [
    {
      label: "PENDING",
      value: "PENDING",
    },
    {
      label: "COMPLETED",
      value: "COMPLETED",
    },
    {
      label: "CANCELLED",
      value: "CANCELLED",
    },
    {
      label: "FAILED",
      value: "FAILED",
    },
  ];

  const isFilterApplied = () => {
    return (
      filter.fromDate !== null ||
      filter.toDate !== null ||
      filter.search !== "" ||
      (filter.planStatus && filter.planStatus !== "1") ||
      (filter.arbitrageType && filter.arbitrageType !== "1") ||
      (filter.registerType && filter.registerType !== "1") ||
      (filter.statusType && filter.statusType !== "1") ||
      (filter.paymentStatus && filter.paymentStatus !== "1")
    );
  };

  const ITEM_HEIGHT = isMobile ? 36 : 48;
  const ITEM_PADDING_TOP = isMobile ? 2 : 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
        // width: isMobile ? "100%" : 250,
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
    getContentAnchorEl: isMobile ? null : undefined,
  };
  return (
    <MainFilterBox>
      <Grid container spacing={1} alignItems="flex-end">
        {type !== "transactionArbitrage" && (
          <Grid item xs={12} sm={6} md={4}>
            <Box mt={isMobile ? 0.5 : 2} mb={isMobile ? 0.5 : 1}>
              <Typography variant="body2" color="primary">
                Search
              </Typography>
            </Box>
            <TextField
              variant="standard"
              fullWidth
              placeholder={placeholder}
              onChange={(e) => {
                setFilter({ ...filter, ["search"]: e.target.value });
              }}
              value={filter.search}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={2}>
          <Box className="textFieldBox">
            <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
              <Typography variant="body2" color="primary">
                From
              </Typography>
            </Box>
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
                value={filter.fromDate}
                disableFuture
                onChange={(date) => {
                  setFilter({
                    ...filter,
                    ["fromDate"]: new Date(date),
                  });
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
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Box className="textFieldBox">
            <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
              <Typography variant="body2" color="primary">
                To
              </Typography>
            </Box>
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
                value={filter.toDate}
                disableFuture
                onChange={(date) => {
                  setFilter({
                    ...filter,
                    ["toDate"]: new Date(date),
                  });
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{
                  readOnly: true,
                }}
                inputProps={{
                  readOnly: true,
                }}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        {type === "userManagement" && (
          <>
            <Grid item xs={12} sm={6} md={2}>
              <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
                <Typography variant="body2" color="primary">
                  Type
                </Typography>
              </Box>
              <FormControl variant="outlined" fullWidth className="formControl">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.registerType}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      registerType: e.target.value,
                    });
                  }}
                  displayEmpty
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"1"} disabled>
                    Select type
                  </MenuItem>
                  {registerType &&
                    registerType.map((option) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
                <Typography variant="body2" color="primary">
                  {" "}
                  Status
                </Typography>
              </Box>
              <FormControl variant="outlined" fullWidth className="formControl">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.planStatus}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      planStatus: e.target.value,
                    });
                  }}
                  displayEmpty
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"1"} disabled>
                    Select Status
                  </MenuItem>
                  {planStatus &&
                    planStatus.map((option) => (
                      <MenuItem value={option.label}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
                <Typography variant="body2" color="primary">
                  Status Type
                </Typography>
              </Box>
              <FormControl variant="outlined" fullWidth>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.statusType}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      statusType: e.target.value,
                    });
                  }}
                  displayEmpty
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"1"} disabled>
                    Select Type
                  </MenuItem>
                  {statusType &&
                    statusType.map((option) => (
                      <MenuItem value={option.label}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {type === "transactionMgmt" && (
          <Grid item xs={12} sm={6} md={2}>
            <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
              <Typography variant="body2" color="primary">
                Status
              </Typography>
            </Box>
            <FormControl variant="outlined" fullWidth className="formControl">
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={filter.planStatus}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    planStatus: e.target.value,
                  });
                }}
                displayEmpty
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"1"} disabled>
                  Select Status
                </MenuItem>
                {planStatus &&
                  planStatus.map((option) => (
                    <MenuItem value={option.label}>{option.label}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        )}{" "}
        {type === "transactionMgmt" && (
          <Grid item xs={12} sm={6} md={2}>
            <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
              <Typography variant="body2" color="primary">
                Payment Status
              </Typography>
            </Box>
            <FormControl variant="outlined" fullWidth className="formControl">
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={filter.paymentStatus}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    paymentStatus: e.target.value,
                  });
                }}
                displayEmpty
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"1"} disabled>
                  Select Status
                </MenuItem>
                {paymentStatus &&
                  paymentStatus.map((option) => (
                    <MenuItem
                      value={option.label}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {replaceValue(option.label, "_", " ")}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {type === "transactionArbitrage" && (
          <>
            <Grid item xs={12} sm={6} md={2}>
              <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
                <Typography variant="body2" color="primary">
                  Trade type
                </Typography>
              </Box>
              <FormControl variant="outlined" fullWidth className="formControl">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.arbitrageType}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      arbitrageType: e.target.value,
                    });
                  }}
                  displayEmpty
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"1"} disabled>
                    Select status
                  </MenuItem>
                  {arbitrageType &&
                    arbitrageType.map((option) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box mt={isMobile ? 0.5 : 0} mb={isMobile ? 0.5 : 1}>
                <Typography variant="body2" color="primary">
                  Trade status{" "}
                </Typography>
              </Box>
              <FormControl variant="outlined" fullWidth className="formControl">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter.planStatus}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      planStatus: e.target.value,
                    });
                  }}
                  displayEmpty
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"1"} disabled>
                    Select status
                  </MenuItem>
                  {transactionArbitrage &&
                    transactionArbitrage.map((option) => (
                      <MenuItem value={option.label}>{option.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        <Grid item xs={6} sm={6} md={4} className="sideButton">
          <Box className="displayStart">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                clearFilters();
              }}
              // fullWidth={!isMobile}
              sx={{
                pointerEvents: !isFilterApplied() ? "none" : "",
              }}
            >
              Clear
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              // fullWidth={!isMobile}
              onClick={() => {
                if (isFilterApplied()) {
                  onClickFun();
                }
              }}
              // disabled={!isFilterApplied()}
              sx={{
                pointerEvents: !isFilterApplied() ? "none" : "",
              }}
            >
              Apply
            </Button>{" "}
            &nbsp;&nbsp;
            {!isRemove && (
              <>
                {/* <CSVLink
              data={userData.map((payment) => flattenObject(payment))}
              filename={fileNames + "_" + moment(new Date()).unix() + ".csv"}
            > */}
                <Button
                  variant="contained"
                  color="primary"
                  // fullWidth
                  onClick={() => onDownload()}
                  disabled={isDownLoading}
                  sx={{
                    pointerEvents: isDownLoading
                      ? "none"
                      : limit > 0
                      ? "auto"
                      : "none",
                  }}
                >
                  {isDownLoading ? "Downloading..." : "Download XLSX"}
                </Button>
                {/* </CSVLink> */}
              </>
            )}
          </Box>
        </Grid>
        {/* {!isRemove && (
          <Grid item xs={6} sm={6} md={2} className="sideButton1">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onDownload()}
              disabled={isDownLoading}
              sx={{
                pointerEvents: isDownLoading
                  ? "none"
                  : limit > 0
                  ? "auto"
                  : "none",
              }}
            >
              {isDownLoading ? "Downloading..." : "Download XLSX"}
            </Button>
          </Grid>
        )} */}
      </Grid>
    </MainFilterBox>
  );
}
