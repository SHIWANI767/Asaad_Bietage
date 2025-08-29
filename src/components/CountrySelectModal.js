import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Button,
  Box,
  DialogTitle,
  DialogActions,
  Autocomplete,
  TextField,
  FormHelperText,
  IconButton,
} from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonCircularProgress from "./ButtonCircularProgress";
import AppContext from "@/context/AppContext";
import { api_configs } from "@/api-services";
import CloseIcon from "@mui/icons-material/Close";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiPaper-root-MuiDialog-paper": {
    maxWidth: "550px",
    boxShadow: "none",
  },
}));
const ReadProfileBox = styled("div")(({ theme }) => ({}));

function CountrySelectModal({ open, handleClose, type }) {
  const auth = useContext(AppContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false); // Track if there's an error

  useEffect(() => {
    axios.get("/json/countries.json").then((response) => {
      setCountries(response.data.countries);
      type &&
        setSelectedCountry(
          response.data.countries.find((item) =>
            auth?.userData?.country?.length > 2
              ? item?.name === auth?.userData?.country
              : item?.sortname === auth?.userData?.country
          )
        );
    });
  }, []);

  const handleUpdateCountry = async () => {
    if (!selectedCountry) {
      setError(true);
      return;
    }
    setError(false);
    try {
      setIsLoading(true);
      const response = await axios({
        method: "PUT",
        url: api_configs.editUserProfile,
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
        data: {
          country: selectedCountry?.sortname,
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        auth?.getProfileDataHandler();
        handleClose();
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <MainBox>
      <Dialog
        open={open}
        onClose={() => type && !isLoading && handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        keepMounted
      >
        <ReadProfileBox>
          <DialogTitle
            sx={{ m: 0, padding: 0, fontSize: "30px" }}
            id="customized-dialog-title"
          >
            {type && (
              <IconButton
                onClick={() => handleClose()}
                size="large"
                disabled={isLoading}
                className="closeIconButton"
              >
                <CloseIcon />
              </IconButton>
            )}
            <Box className="displayCenter" mb={2}>
              <Typography variant="h6">Select your country</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option.name} // Show country names in dropdown
              value={selectedCountry}
              onChange={(event, newValue) => {
                setSelectedCountry(newValue);
                setError(false); // Clear error on selection
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Country"
                  error={error} // Highlight the field in red if there's an error
                />
              )}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              disabled={isLoading}
              mt={1}
            />
            {error && (
              <FormHelperText error>Please select a country.</FormHelperText>
            )}

            <Box pb={1} mt={2}>
              <Typography
                variant="body2"
                style={{
                  fontSize: "11px",
                  textAlign: "center",
                  lineHeight: "18px",
                  fontWeight: 300,
                }}
              >
                <strong>Note:</strong> We need this information to identify the
                country where you’re adding exchanges. This ensures accurate
                exchange data and helps us notify you of region-specific
                updates, such as the delisting of USDT in some European
                countries.{" "}
                <span
                  style={{
                    cursor: "pointer",
                    color: "#00b2ff",
                    textDecoration: "underline",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.binance.com/en-IN/square/post/18332721703321"
                    )
                  }
                >
                  Learn more here.
                </span>
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "16px" }}
              small
              onClick={handleUpdateCountry}
              disabled={isLoading}
            >
              Save {isLoading && <ButtonCircularProgress />}
            </Button>
          </DialogActions>
        </ReadProfileBox>
      </Dialog>
    </MainBox>
  );
}

export default React.memo(CountrySelectModal);
