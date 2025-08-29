import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import { putAPIHandler } from "@/api-services/service";
import AppContext from "@/context/AppContext";
import toast from "react-hot-toast";
import Popup from "@/components/DynamicModel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useRouter } from "next/router";

export const PhoneInputBox = styled(FormControl)(({ theme }) => ({
  "& .react-tel-input .selected-flag": {
    display: "none",
  },
  "& .react-tel-input .form-control": {
    width: "100%",
    borderRadius: "8px",
    height: "59px",
    color: theme.palette.text.primary,
    background: theme.palette.background.textFeild,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    paddingLeft: "44px !important",
  },
  "& .react-tel-input .country-list .country": {
    display: "none",
    padding: "7px 9px",
    textAlign: "left",
    backgroundColor: "#2D2D2D",
    color: "#fff",
    "&:hover": {
      background: "#000000e3",
    },
  },
  "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
    { display: "none", backgroundColor: "#28322b !important" },
  "& .react-tel-input .selected-flag": {
    display: "none",
    background: theme.palette.background.primary,
    "&:hover": {
      backgroundColor: "none",
    },
  },
  "& .react-tel-input .selected-flag .arrow": { display: "none", left: "20px" },
  "& .react-tel-input .country-list .country.highlight": {
    background: "#000000e3 !important",
    fontSize: "16px",
  },
  "& .react-tel-input .flag-dropdown": {
    backgroundColor: "transparent",
    border: "none",
    height: "44px",
    position: "absolute",
    top: "5px",
  },
  "& .react-tel-input .flag-dropdown.open .selected-flag": {
    background: "#FFFFFF06",
    fontSize: "16px",
    display: "none",
  },
}));

const SettingProfileBox = styled(Box)(({ theme }) => ({
  marginTop: "25px",
  "& label": {
    color: "#fff",
  },
  "& .filterpaper": {
    padding: "25px",
    minHeight: "150px",
    "& p": {
      fontSize: "12px",
    },
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.primary,
    background: theme.palette.background.textFeild,
    paddingLeft: "10px",
    borderRadius: "10px",
    height: "59px",
    // border: "1px solid #80808014",
  },
}));

export default function HandleGoogleDefaul({
  open,
  handleClose,
  values,
  creadentailsData,
}) {
  const auth = useContext(AppContext);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isSubmit, setisSubmit] = useState(false);
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [countryCode, setCountryCode] = useState(false);
  const router = useRouter();
  console.log(" ------------------ refferalCode ", values);

  useEffect(() => {
    axios.get("/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
    });
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    mobileNumber: "",
    countryCode: "",
  });

  const handleEdit = async () => {
    setisSubmit(true);
    if (
      //   formData.firstName == "" ||
      //   formData.lastName == "" ||
      formData.mobileNumber == "" ||
      formData.country == "" ||
      countryCode == ""
    ) {
      return;
    }
    setisSubmit(false);
    try {
      setIsLoading1(true);
      let dataToSend = {
        // email: formData.email,
        // firstName: formData.firstName,
        // lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        country: formData.country,
        countryCode: countryCode,
      };
      const response = await putAPIHandler({
        endPoint: "editUserProfile",
        dataToSend: dataToSend,
        token: values,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        setIsEdit(false);
        setIsLoading1(false);
        // auth.getProfileDataHandler();
        // getProfileDataHandler();
        sessionStorage.setItem("user_token", values);
        auth.userLogIn(true, values);
        toast.success("log in successfully.");
        router.replace(`/`);
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading1(false);
    } catch (error) {
      setIsLoading1(false);
      // if(err)
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
    <SettingProfileBox>
      <Popup
        maxWidth="sm"
        open={open}
        handleClose={() => {
          if (!isLoading1) {
            handleClose(false);
          }
        }}
        title={"Fill Details"}
        actions={[
          //   {
          //     title: "Submit",
          //     color: "primary",
          //     onClick: () => {
          //       handleEdit();
          //     },
          //   },

          {
            label: "Submit",
            onClick: () => handleEdit(),
            color: "primary",
            variant: "contained",
            isLoading: isLoading1,
          },
        ]}
        isShowIcon={true}
      >
        <Box className="displaySpacebetween">
          <Typography variant="h6" color="primary">
            Account
          </Typography>
          {/* <Button
                variant="contained"
                color={isEdit ? "primary" : "secondary"}
                onClick={() => {
                  if (!isEdit) {
                    setIsEdit(!isEdit);
                  } else {
                    handleEdit();
                  }
                }}
                disabled={isLoading1}
              >
                {isEdit ? (isLoading1 ? "Saving..." : "Saved") : "Edit"}{" "}
              </Button> */}
        </Box>
        <Box mt={1}>
          <Typography variant="body2" color="secondary" mb={3}>
            The Info provided won't be shared with any other parties
          </Typography>

          <Typography variant="body2" color="primary" mb={1}>
            Email
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Email"
            value={creadentailsData.email}
            inputProps={{
              readOnly: true,
            }}
          />

          <Typography variant="body2" color="primary" mt={2} mb={1}>
            First Name
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Enter first name"
            value={creadentailsData?.firstName}
            //   onChange={(e) =>
            //     setFormData({ ...formData, firstName: e.target.value })
            //   }
            inputProps={{
              readOnly: true,
            }}
          />
          <FormHelperText error>
            {/* {isSubmit &&
                formData.firstName == "" &&
                "Please enter first name."} */}
          </FormHelperText>

          <Typography variant="body2" color="primary" mt={2} mb={1}>
            Last Name
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Enter last name"
            value={creadentailsData?.lastName}
            inputProps={{
              readOnly: true,
            }}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <FormHelperText error>
            {/* {isSubmit && formData.lastName == "" && "Please enter last name."} */}
          </FormHelperText>

          <PhoneInputBox fullWidth>
            <Typography variant="body2" color="primary">
              Mobile Number
            </Typography>
            <PhoneInput
              fullWidth
              country={"gb"}
              placeholder="Enter phone number"
              name="mobileNumber"
              value={formData.mobileNumber}
              error={Boolean(isSubmit && !isValidNumber)}
              inputProps={{
                name: "mobileNumber",
                // readOnly: !isEdit,
              }}
              onChange={(phone, e) => {
                setFormData({ ...formData, mobileNumber: phone });
                setCountryCode(e.dialCode);
                //   const number = phone.slice(e.dialCode.length, phone.length);
                //   const check = checkNumber(number);
                //   setIsValidNumber(check);
              }}
              disabled={isLoading1}
            />
          </PhoneInputBox>
          <FormHelperText error>
            {Boolean(formData.mobileNumber == "" && isSubmit) &&
              "Enter a valid mobile number."}

            {/* {isSubmit &&
                formData.mobileNumber !== "" &&
                !isValidNumber &&
                "Please enter mobile number."} */}
          </FormHelperText>

          <FormControl fullWidth>
            <Typography variant="body2" color="primary">
              Country
            </Typography>
            <Select
              name="country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <p>Select country</p>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{
                "aria-label": "Without label",
                // readOnly: !isEdit,
              }}
            >
              <MenuItem value="">Select country</MenuItem>
              {countries &&
                countries.map((map) => {
                  return (
                    <MenuItem key={map.name} value={map.sortname}>
                      {map.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText error>
              {isSubmit && formData.country == "" && "Please select country."}
            </FormHelperText>
          </FormControl>
        </Box>
      </Popup>
    </SettingProfileBox>
  );
}
