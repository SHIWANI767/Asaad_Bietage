import React, { useState, useContext } from "react";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  Dialog,
  Avatar,
  FormHelperText,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { styled } from "@mui/system";
import { api_configs } from "@/api-services";
import axios from "axios";
import { funConEx } from "@/utils";
import AppContext from "@/context/AppContext";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
import Popup from "@/components/DynamicModel";

const FilterModalBox = styled(Box)(({ theme }) => ({
  position: "relative",

  [theme.breakpoints.down("xs")]: {
    padding: "10px",
  },
  "& h6": {
    fontSize: "20px",
    fontWeight: "600",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
    color: "#fff",
    "-webkit-text-fill-color": "#fff !important",
  },
  "& .MuiSelect-selectMenu": {
    fontSize: "14px",
  },

  "& .textBox": {
    "& .MuiInputBase-root": {
      background: "transparent",
      boxShadow: "none",
      color: "#fff",
      borderRadius: "0px !important",
      fontSize: "14px",
      height: "33px",
    },

    "& .MuiInput-underline:before": {
      left: "0",
      right: "0",
      bottom: "0",
      content: '"\\00a0"',
      position: "absolute",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderBottom: "1px solid gray",
      pointerEvents: "none",
    },
  },

  "& .buttonBox": {
    padding: "24px 0 0px",
  },
}));

function GenerateAddress({ open, setOpen, callBack }) {
  const auth = useContext(AppContext);
  const [exchangeId, setExchangeId] = useState("0");
  const token = window.localStorage.getItem("user_token");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const HandleGenerate = async () => {
    try {
      setIsSubmit(true);
      if (exchangeId == "0") {
        return;
      }
      setIsSubmit(false);
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: api_configs.generateAddress,
        headers: {
          token: token,
        },
        data: {
          exchangeId: exchangeId,
        },
      });
      if (response.data.responseCode == 200) {
        setOpen(false);
        callBack();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Popup
        maxWidth="sm"
        open={open}
        handleClose={() => {
          if (!isLoading) {
            setOpen(false);
          }
        }}
        title="Generate Whitelist Address"
        actions={[
          {
            label: "Cancel",
            onClick: () => setOpen(false),
            color: "secondary",
            variant: "contained",
          },
          {
            label: "Submit",
            onClick: HandleGenerate,
            color: "primary",
            variant: "contained",
          },
        ]}
      >
        <FilterModalBox>
          <Box mt={2}>
            <Typography variant="body2" color="primary">
              Generate Whitelist Address
            </Typography>

            <Box
              mt={1}
              style={{ width: "100%", position: "relative" }}
              className="autocompleBox"
            >
              <FormControl
                variant="outlined"
                fullWidth
                className="formControl"
                disabled={isLoading}
              >
                <Select
                  value={exchangeId}
                  onChange={(e) => {
                    setExchangeId(e.target.value);
                  }}
                  fullWidth
                  disabled={isLoading}
                >
                  <MenuItem value="0" disabled>
                    <Typography variant="body1" color="primary">
                      Choose your connected exchange
                    </Typography>
                  </MenuItem>
                  {auth?.connectedExchangeList &&
                    funConEx(auth?.connectedExchangeList)?.map((map, i) => {
                      return (
                        <MenuItem key={map?._id} value={map?._id}>
                          <Box
                            className="avtClx"
                            value={map?._id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              src={map?.img}
                              alt={map?.exchangeName}
                              style={{ height: "26px", width: "26px" }}
                            />

                            <span style={{ padding: "0 0 0 10px" }}>
                              {map?.exchangeName}
                            </span>
                          </Box>
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText error>
                  {isSubmit &&
                    exchangeId === "0" &&
                    "Please select an exchange"}
                </FormHelperText>
              </FormControl>
            </Box>
          </Box>
        </FilterModalBox>
      </Popup>
    </>
  );
}

export default GenerateAddress;
