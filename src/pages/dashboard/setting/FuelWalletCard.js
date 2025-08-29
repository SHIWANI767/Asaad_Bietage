import {
  Box,
  IconButton,
  Paper,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { ACTIVE_NETWORK, fixDecimal } from "@/utils";
import AppContext from "@/context/AppContext";
import WalletDepositFuel from "./WalletDepositFuel";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { useReadContract } from "@/hooks/useReadContract";
import SortAddress from "@/utils/SortAddress";

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: "0 0 20px",
  },
  "& .DepositeCardBox": {
    width: "100%",
    borderRadius: "5px",
    "& .headingBox": {
      "& p": {},
      "& h5": {
        fontWeight: 400,
        marginLeft: "8px",
        fontSize: "16px",
      },
      "& .whiteBox": {
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        "& img": {
          position: "relative",
          width: "100%",
          backgroundSize: "cover !important",
          backgroundRepeat: "no-repeat !important",
          objectFit: "cover !important",
        },
      },
      "& .filtersButton": {
        "& .filterIcon1": {
          "& button": {
            background: "#4A4A57 !important",
            width: "37px",
            height: "37px",
            borderRadius: "10px",
            padding: "0px",
            "& svg": {
              position: "absolute",
              zIndex: 3,
            },
          },
        },
      },
    },
    "& .contentBox": {
      "& p": {
        // color: "#9090A3",
        [theme.breakpoints.down("sm")]: {
          fontSize: "11px",
        },
      },
      "& .boldText": {
        "& p": {
          fontWeight: 300,
          textAlign: "left",
          marginLeft: "0px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "11px",
          },
        },
      },
    },
  },
}));

export default function FuelWalletCard({ data, exchangeName, setIsSubmit }) {
  const { address, isConnected, chain } = useAccount();
  const [openWalletWithdraw, setOpenWalletWithdraw] = useState(false);
  const [openWalletSend, setOpenWalletSend] = useState(false);
  const [amount, setAmount] = useState("");
  const [usdtInfo, setUsdtInfo] = useState("");
  const { userData, isAdminTab } = useContext(AppContext);
  const { total_balance_usdt, total_balance_fiero, user_balance_usdt } =
    useReadContract();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  useEffect(() => {
    // if (!walletClient) return;
    getBalanceAdmin();
    getUserBalanceUsdt();
  }, [walletClient, publicClient]);
  const getUserBalanceUsdt = async () => {
    try {
      let response = await user_balance_usdt();
      // console.log(" --------- response ", response);
      if (response.success) {
        setUsdtInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalanceAdmin = async () => {
    try {
      if (chain?.id != ACTIVE_NETWORK) {
        let response = await total_balance_usdt();
        if (response.success) {
          setAmount(response.data.balance);
        }
      } else {
        let response = await total_balance_fiero();
        if (response.success) {
          setAmount(response.data.balance);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainBox>
      {" "}
      <Box className={"DepositeCardBox"}>
        <Box className="headingBox displayStart" mb={2}>
          <Typography variant="h6" color="primary" mr={2}>
            Fuel Wallet
          </Typography>

          <Box className={`filtersButton displayEnd`}>
            {!isAdminTab && (
              <Tooltip
                title={
                  (!address &&
                    "First connect wallet for deposit fund to fuel wallet. ") ||
                  (address &&
                    !chain &&
                    "Wrong network detected. Please switch to the Binance or Fiero network.")
                }
                arrow
              >
                <Box className="filterIcon1">
                  <IconButton
                    onClick={() => {
                      setOpenWalletSend(true);
                    }}
                    disabled={!address || !isConnected || !chain}
                  >
                    <img
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      src="/images/Arbitrage/upTransactionIcon.png"
                      alt=""
                    />
                  </IconButton>
                </Box>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Box className="contentBox">
          <Box className="displayStart" style={{ flexWrap: "wrap" }}>
            {" "}
            <Box className="boldText displayStart">
              <Typography
                variant="body2"
                color="primary"
                style={{ minWidth: "175px" }}
              >
                {isAdminTab && "Total "} Fuel Balance (FIERO)
              </Typography>
              <span style={{ margin: "0px 10px" }}>:</span>
            </Box>
            <Box className="displayStart">
              <Box className="boldText">
                {!isAdminTab ? (
                  <Typography variant="body2" color="primary">
                    {userData?.fuelFIEROBalance
                      ? parseFloat(userData?.fuelFIEROBalance).toFixed(3)
                      : 0}{" "}
                    FIERO :
                  </Typography>
                ) : chain?.id == ACTIVE_NETWORK ? (
                  <Typography variant="body2" color="primary">
                    {amount} FIERO
                  </Typography>
                ) : (
                  <Typography variant="body2" color="primary" ml={1}>
                    Switch to Fieres network
                  </Typography>
                )}
              </Box>
              <Typography
                variant="body2"
                color="primary"
                style={{ marginLeft: "8px" }}
              >
                {/* USDT */}
              </Typography>
            </Box>
          </Box>
          <Box className="displayStart" style={{ flexWrap: "wrap" }}>
            {" "}
            <Box className="boldText displayStart">
              <Typography
                variant="body2"
                color="primary"
                style={{ minWidth: "175px" }}
              >
                {isAdminTab && "Total "} Fuel Balance (USDT)
              </Typography>
              <span style={{ margin: "0px 10px" }}>:</span>
            </Box>
            <Box className="displayStart">
              <Box className="boldText">
                {!isAdminTab ? (
                  <Typography variant="body2" color="primary">
                    ${" "}
                    {userData?.fuelUSDBalance
                      ? fixDecimal(userData?.fuelUSDBalance)
                      : 0}
                  </Typography>
                ) : isConnected && chain?.id != ACTIVE_NETWORK ? (
                  <Typography variant="body2" color="primary">
                    {amount} USDT
                  </Typography>
                ) : (
                  <Typography variant="body2" color="primary">
                    Switch to Binance network
                  </Typography>
                )}
              </Box>
              <Typography
                variant="body2"
                color="primary"
                style={{ marginLeft: "8px" }}
              ></Typography>
            </Box>
          </Box>

          {usdtInfo?.usdtTokenAddress && (
            <Box className="displayStart" style={{ flexWrap: "wrap" }}>
              <Box className="boldText displayStart">
                <Typography
                  variant="body2"
                  color="primary"
                  style={{ minWidth: "175px" }}
                >
                  USDT token address{" "}
                </Typography>
                <span style={{ margin: "0px 10px" }}>:</span>
              </Box>
              <Box className="displayStart">
                <Box className="boldText">
                  <SortAddress
                    address={usdtInfo?.usdtTokenAddress}
                    isLink={true}
                    url={
                      "https://bscscan.com/address/" +
                      usdtInfo?.usdtTokenAddress
                    }
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        {openWalletSend && (
          <WalletDepositFuel
            open={openWalletSend}
            callBack={() => {
              setOpenWalletSend(false);
              setIsSubmit();
            }}
            isWithdraw={false}
          />
        )}
        {openWalletWithdraw && (
          <WalletDepositFuel
            open={openWalletWithdraw}
            callBack={() => {
              setOpenWalletWithdraw(false);
              setIsSubmit();
            }}
            isWithdraw={true}
          />
        )}
      </Box>
    </MainBox>
  );
}
