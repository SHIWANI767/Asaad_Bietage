import React, { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import DetailsComponent from "./DetailsComponent";
import { styled } from "@mui/system";
import Popup from "@/components/DynamicModel";
import toast from "react-hot-toast";
import { api_configs } from "@/api-services";

const LivetableBox = styled(Box)(({ theme }) => ({
  "& .MuiDivider-root": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  "& .MuiPaper-root": {
    padding: "18px",
  },
}));

function LiveTracking({ data, open, onClose }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const token = window.localStorage.getItem("user_token");

  const tradeProfitPathsDirectHandler = async (value) => {
    try {
      setIsProcessing(true);
      // return;
      const dataToSend = {
        base: value.base,
        pair: value.pair,
        buy: value.buy,
        exchange1_price: value.exchange1_price,
        sell: value.sell,
        exchange2_price: value.exchange2_price,
        capital: value.baseCapital,
        capitalInUSDT: value.capital,
      };
      const apiEndPointCheck = "tradeProfitPathsDirectArb";
      const response = await axios({
        method: "POST",
        url: api_configs[apiEndPointCheck],
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.status == 200) {
        toast.success(response.data.responseMessage);
        onClose(false);
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
        onClose(false);
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
        toast.error(error.message);
      }
    }
  };
  return (
    <LivetableBox>
      <Popup
        maxWidth="xs"
        open={open}
        handleClose={() => {
          if (!isProcessing) {
            onClose(false);
          }
        }}
        isLoading={isProcessing}
        title="Live tracking"
        actions={[
          {
            label: "Submit",
            onClick: () => tradeProfitPathsDirectHandler(data),
            color: "primary",
            variant: "contained",
            isLoading: isProcessing,
          },
        ]}
      >
        <Box
          className="livetrackBox"
          sx={{
            position: "relative",
            [(theme) => theme.breakpoints.down("xs")]: {
              padding: "10px",
            },
            "& .MuiSelect-selectMenu": {
              fontSize: "14px",
            },
            "& .greenprogressbar": {
              position: "relative",
            },
          }}
        >
          <DetailsComponent
            data={data}
            ExecuteButtonType={true}
            onClose={() => onClose()}
          />
        </Box>
      </Popup>
    </LivetableBox>
  );
}

export default LiveTracking;
