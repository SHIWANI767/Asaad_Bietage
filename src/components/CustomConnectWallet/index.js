import { ACTIVE_NETWORK, NetworkContextName } from "@/utils";
import styled from "@emotion/styled";
import { Box, Button, Hidden } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Popup from "../DynamicModel";
import { bsc } from "wagmi/chains";
import { Fiero } from "@/utils/wagmi";
import { useAccount, useWalletClient } from "wagmi";
import toast from "react-hot-toast";
import { DEPOSIT_ABI } from "@/data/abis";
import { handleErrors } from "@/utils/errorHandling";
import ButtonCircularProgress from "../ButtonCircularProgress";

const SettingMainBox = styled(Box)(({ theme }) => ({
  "& .tabButton": {
    padding: "14px 25px",
    // fontSize: theme.breakpoints.down("sm") ? "10px" : "14px",
    color: theme.palette.text.primary,
    fontWeight: "500",
    borderRadius: "50px",
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.02857em",
    borderRadius: "50px",
    borderBottom: "0px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "7px 18px",
      fontSize: "10px !important",
      whiteSpace: "pre",
    },
    "&.connected": {
      "&:hover": {
        color: "#000 !important",
        background:
          "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%) !important",
        borderBottom: "0px solid #a5ef70 !important",
      },
      color: "#000",
      background:
        "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%) !important",
      borderRadius: "100px !important",
    },
    "&.wrong-network": {
      "&:hover": {
        color: "#fff !important",
        background: "#ff0000ad !important",
        borderBottom: "0px solid #ff0000ad !important",
      },
      color: "#fff",
      background: "#ff0000ad !important",
    },
    "&.cursor": {
      cursor: "pointer",
    },
    "&.balance": {
      "&:hover": {
        // color: "#fff !important",
        color: theme.palette.text.primary,
        background: "transparent !important",
      },
      // color: "#fff",
      color: theme.palette.text.primary,
      background: "transparent !important",
      border: "1px solid #a5ef70 !important",
    },
  },
}));

const TabButton = ({ className, onClick, children }) => (
  <Button
    // key={index}

    fullWidth
    variant="contained"
    color="primary"
    className={className}
    onClick={onClick}
    type="button"
    style={{
      display: "flex",
      alignItems: "center",
      borderRadius: "50px",
      background: "transparent",
    }}
  >
    {children}
  </Button>
);

const ChainInfo = ({ chain, openAccountModal }) => (
  <TabButton
    className="tabButton balance cursor"
    onClick={openAccountModal}
    style={{ display: "flex", alignItems: "center" }}
  >
    {chain.hasIcon && (
      <div
        style={{
          background: chain.iconBackground,
          width: 20,
          height: 20,
          borderRadius: 999,
          overflow: "hidden",
          marginRight: 4,
        }}
      >
        {chain.iconUrl && (
          <img
            alt={chain.name ?? "Chain icon"}
            src={chain.iconUrl}
            style={{ width: 20, height: 20 }}
          />
        )}
      </div>
    )}
    {chain?.id === ACTIVE_NETWORK ? NetworkContextName : "Binance Chain"}
  </TabButton>
);

const AccountInfo = ({ account, openAccountModal }) => (
  <TabButton className="tabButton balance cursor" onClick={openAccountModal}>
    {account.displayName}
    {account.displayBalance ? ` (${account.displayBalance})` : ""}
  </TabButton>
);

export const CustomConnectWallet = () => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoading1, setIsLoading1] = React.useState(false);
  const [isLoading2, setIsLoading2] = React.useState(false);
  const { data: walletClient } = useWalletClient();
  const { chain: ChainId } = useAccount();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const SwitchToFiero = async () => {
    try {
      setIsLoading2(true);
      setIsLoading(true);
      const response = await walletClient.switchChain({ id: Fiero.id });
      handleClose();
      toast.success(`Successfully switched to Fiero Mainnet chain`);
      setIsLoading2(false);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading2(false);
      setIsLoading(false);
      const message = handleErrors(error, DEPOSIT_ABI);
      toast.error(`Switching to Fiero chain failed: ${message}`);
    }
  };
  const SwitchToBinance = async () => {
    try {
      setIsLoading1(true);
      setIsLoading(true);
      const response = await walletClient.switchChain({
        id: bsc.id,
      });
      handleClose();
      toast.success(`Successfully switched to Binance chain`);
      setIsLoading1(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading1(false);
      setIsLoading(false);
      const message = handleErrors(error, DEPOSIT_ABI);
      toast.error(`Switching to binance chain failed: ${message}`);
      console.log("error", error);
    }
  };
  const networks = [
    {
      name: "Binance Smart",
      switchTo: SwitchToBinance,
      isActive: ChainId ? ChainId?.id === ACTIVE_NETWORK : true,
      iconUrl: "/images/bsc.svg",
    },
    {
      name: NetworkContextName, // Replace with actual network name or context variable
      switchTo: SwitchToFiero,
      isActive: ChainId ? ChainId?.id !== ACTIVE_NETWORK : true,
      iconUrl: Fiero.iconUrl,
    },
  ];
  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <SettingMainBox
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {!connected ? (
                <TabButton
                  className="tabButton connected cursor"
                  onClick={openConnectModal}
                >
                  Connect Wallet
                </TabButton>
              ) : chain.unsupported ? (
                <TabButton
                  className="tabButton wrong-network cursor"
                  onClick={handleOpen}
                  sx={{
                    background: "red !important",
                    backgroundColor: "red !important",
                  }}
                >
                  Wrong network
                </TabButton>
              ) : (
                <div style={{ display: "flex", gap: 12 }}>
                  {" "}
                  <AccountInfo
                    account={account}
                    openAccountModal={openAccountModal}
                  />
                  <Hidden smDown>
                    <ChainInfo chain={chain} openAccountModal={handleOpen} />
                  </Hidden>
                </div>
              )}
            </SettingMainBox>
          );
        }}
      </ConnectButton.Custom>

      <Popup
        maxWidth="xs"
        open={open}
        isClose={true}
        handleClose={handleClose}
        title="Switch Network"
        actions={[
          {
            label: "Back",
            onClick: handleClose,
            color: "secondary",
            variant: "contained",
          },
        ]}
      >
        <Box sx={{ pt: 4, pb: 4, pr: 2, pl: 2 }}>
          {networks.map((network, index) => (
            <Button
              key={index}
              size="md"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mb: 2,
                justifyContent: "space-between",
                color: (theme) =>
                  !network.isActive ? theme.palette.text.primary : "#000",
                border: "1px solid #a5ef70 !important",
                background: network.isActive
                  ? isLoading
                    ? "transparent !important"
                    : "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%)"
                  : "transparent !important",
                "&.Mui-disabled": {
                  color: (theme) => theme.palette.text.primary, // "#fff !important",
                },
                padding: "8px 35px !important",
                "&:hover": {
                  borderRadius: "50px",
                  borderColor: "transparent",
                  padding: "8px 35px !important",
                  // color: network.isActive ? "#000" : "#fff !important",
                  color: (theme) => theme.palette.text.primary,
                  background: network.isActive
                    ? isLoading
                      ? "transparent !important"
                      : "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%)"
                    : "transparent !important",
                  boxShadow:
                    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                },
                "& .nameBox": {
                  color: (theme) => theme.palette.text.primary,
                  // color: network.isActive
                  //   ? isLoading
                  //     ? "#fff !important"
                  //     : "#000"
                  //   : "#fff !important",
                },
                "& .greenBox": {
                  height: "8px",
                  width: "8px",
                  background: "green",
                  borderRadius: "50%",
                  mr: 1,
                },
                "& img": {
                  width: "20px",
                  height: "20px",
                },
                pointerEvents: network.isActive
                  ? isLoading
                    ? "none"
                    : "auto"
                  : "none",
              }}
              onClick={network.switchTo}
              // disabled={isLoading && network.isActive}
            >
              <Box className="nameBox displayStart">
                {network?.iconUrl && (
                  <div
                    // onClick={openAccountModal}
                    style={{
                      background: network?.iconBackground,
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      overflow: "hidden",
                      marginRight: 2,
                    }}
                  >
                    {network?.iconUrl && (
                      <img
                        alt={network?.name ?? "Chain icon"}
                        src={network?.iconUrl}
                        // style={{ width: 20, height: 20 }}
                      />
                    )}
                  </div>
                )}
                {network.name}
                {isLoading1 && index === 0 && <ButtonCircularProgress />}
                {isLoading2 && index === 1 && <ButtonCircularProgress />}
              </Box>
              {!network.isActive && (
                <Box className="displayStart">
                  <Box className="greenBox"></Box>
                  Connected
                </Box>
              )}
            </Button>
          ))}
        </Box>
      </Popup>
    </>
  );
};
