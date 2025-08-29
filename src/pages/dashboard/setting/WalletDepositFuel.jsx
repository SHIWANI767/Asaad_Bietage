// WalletDepositFuel

import {
  Box,
  FormHelperText,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import Popup from "@/components/DynamicModel";
import axios from "axios";
import { api_configs } from "@/api-services";
import { useWriteContract } from "@/hooks/useWriteContract";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import AppContext from "@/context/AppContext";
import { ACTIVE_NETWORK } from "@/utils";
import { useReadContract } from "@/hooks/useReadContract";

const WalletDepositFuelBox = styled(Box)(({ theme }) => ({
  paddingTop: "30px",
}));
export default function WalletDepositFuel({ open, callBack, isWithdraw }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [amount, setAmount] = useState("");
  const { address, isConnected, chain } = useAccount();
  const { deposit_usdt, deposit_fiero, withdraw_fiero, withdraw_usdt } =
    useWriteContract();
  const { total_balance_usdt, total_balance_fiero } = useReadContract();
  const { userData, getProfileDataHandler } = useContext(AppContext);

  useEffect(() => {
    getProfileDataHandler();
    getBalanceAdmin();
  }, []);
  const getBalanceAdmin = async () => {
    try {
      // let response = {
      //   status: false,
      // };
      if (chain.id != ACTIVE_NETWORK) {
        let response = await total_balance_usdt();
        console.log(response.data.balance, " ------------ response ", response);
        if (response.success) {
          setAmount(response.data.balance);
        }
      } else {
        let response = await total_balance_fiero();
        console.log(response.data.balance, " ------------ response ", response);
        if (response.success) {
          setAmount(response.data.balance);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleSubmit = async () => {
    try {
      if (isWithdraw) {
        HandleWithdraw();
      } else {
        HandleDeposit();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleWithdraw = async () => {
    setErrorMsg();
    if (!isConnected) {
      setErrorMsg("Please connect your wallet.");
      return;
    }
    setErrorMsg("");
    try {
      setIsLoading(true);

      if (chain.id == ACTIVE_NETWORK) {
        let response = await withdraw_fiero();
        // console.log(" ------ response ", response);
        if (response.success) {
          setIsLoading(false);
          toast.success("Withdraw successfully");
          callBack();
        } else {
          setIsLoading(false);
          setErrorMsg(response.error);
        }
      } else {
        let response = await withdraw_usdt();
        // console.log(" ------ response ", response);
        if (response.success) {
          setIsLoading(false);
          setAmount("");
          callBack();
          toast.success("Withdraw successfully");
        } else {
          setIsLoading(false);
          setErrorMsg(response.error);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const HandleDeposit = async () => {
    if (!isConnected) {
      setErrorMsg("Please connect your wallet.");
      return;
    }
    setErrorMsg("");
    try {
      setIsLoading(true);

      if (chain.id == ACTIVE_NETWORK) {
        let response = await deposit_fiero(
          amount,
          userData?.walletFieroAddress
        );
        console.log(" ------ response ", response);
        if (response.success) {
          setIsLoading(false);
          setAmount("");
          setIsSubmit(!isSubmit);
          handleStakeAPI(response.data, "FIERO");
        } else {
          setIsLoading(false);
          setErrorMsg(response.error);
          // setTimeout(() => {
          // setErrorMsg(false);
          // }, 10000);
        }
      } else {
        let response = await deposit_usdt(amount, userData?.walletUsdAddress);
        console.log(" ------ response ", response);
        if (response.success) {
          setIsLoading(false);
          setAmount("");
          setIsSubmit(!isSubmit);
          handleStakeAPI(response.data, "USD");
        } else {
          setIsLoading(false);
          setErrorMsg(response.error);
          // setTimeout(() => {
          // setErrorMsg(false);
          // }, 10000);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleStakeAPI = async (hash, coinName) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      let bodyData = {
        amount: amount,
        fromAddress: address,
        transactionHash: hash,
        coinName: coinName,
      };
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs["fuelWallet"],
        bodyData: bodyData,
      });
      console.log("response----", response);
      if (response.status === 200) {
        getProfileDataHandler();
        callBack(false);
        toast.success(response.data.responseMessage);
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <Box style={{ marginTop: "25px" }}>
      <Popup
        maxWidth="sm"
        open={open}
        handleClose={() => {
          if (!isLoading) {
            callBack(false);
          }
        }}
        title={isWithdraw ? "Fuel Wallet Withdrawal" : "Fuel Wallet Deposit"}
        actions={[
          {
            label: "Cancel",
            onClick: () => callBack(false),
            color: "secondary",
            variant: "contained",
          },
          {
            label: "Submit",
            onClick: HandleSubmit,
            color: "primary",
            variant: "contained",
            isLoading: isLoading,
          },
        ]}
      >
        <WalletDepositFuelBox sx={{ pt: 2, pb: 2 }}>
          <Typography variant="h6" pb={1}>
            {isWithdraw ? "Withdraw Amount" : "Deposit Amount"}
          </Typography>
          <TextField
            fullWidth
            placeholder="0.00"
            value={amount}
            variant="outlined"
            type="number"
            // disabled={isLoading || isWithdraw}
            onChange={(e) => setAmount(e.target.value)}
            error={errorMsg}
            sx={{
              pointerEvents: isLoading || isWithdraw ? "none" : "auto",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="h6">
                    {chain.id == ACTIVE_NETWORK ? "FIERO" : "USDT"}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
          {errorMsg && (
            <FormHelperText error sx={{ fontSize: "14px", fontWeight: 400 }}>
              {errorMsg}
            </FormHelperText>
          )}
        </WalletDepositFuelBox>
      </Popup>
    </Box>
  );
}
WalletDepositFuel.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
