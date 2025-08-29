import React, { useContext, useState } from "react";
import { Box, Button, Typography, Paper, Avatar, Grid } from "@mui/material";
import { toast } from "react-hot-toast";
import { AiFillInfoCircle } from "react-icons/ai";
import { sortAddress, funConEx } from "@/utils";
import axios from "axios";
import AppContext from "@/context/AppContext";
import { api_configs } from "@/api-services";
import CommonConfirmationDialog from "@/components/CommonConfirmationDialog";
import Image from "next/image";
import HandleDocusealContract from "./HandleDocusealContract";

export default function RecentConnectedExchange({ isDisconnected, list }) {
  const token = window.localStorage.getItem("user_token");
  const auth = useContext(AppContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [idData, setIdData] = useState("");
  const [useDocusealContract, setUseDocusealContract] = useState(false);

  const handleDisconnect = async (data) => {
    setIdData(data);
    setOpen(true);
  };
  const disConnectExchangeHandler = async () => {
    try {
      setIsDeleting(true);
      const dataToSend = {
        _id: idData._id,
      };

      const response = await axios({
        method: "DELETE",
        url: api_configs.removeConnectedExchange,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.data.responseCode == 200) {
        setIsDeleting(false);
        toast.success("Exchange has been disconnected successfully.");
        auth.getConnectedExchangeList(token);
        setOpen(false);
      } else {
        setIsDeleting(false);
      }
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Box className={"classes.forgetBox"}>
      <Grid container spacing={2}>
        {list &&
          funConEx(list)?.map((data, i) => (
            <Grid item xs={12}>
              <Paper elevation={2}>
                <Typography variant="body2" mb={2}>
                  Recent Connected Exchange
                </Typography>
                <Box className={`${"classes.avtClass"} displayStart`}>
                  <Image
                    height={35}
                    width={35}
                    quality={100}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    src={data?.img}
                    alt={data?.exchangeName}
                  />
                  &nbsp;&nbsp;
                  <Typography
                    variant="body2"
                    color="primary"
                    textTransform="capitalize"
                  >
                    {data?.exchangeName}
                  </Typography>
                </Box>
                <Box mt={1}>
                  <Box>
                    <Typography
                      variant="body2"
                      color="secondary"
                      style={{ fontSize: "12px" }}
                    >
                      API KEY :
                    </Typography>
                  </Box>
                  <Box className="displaySpacebetween">
                    <Typography
                      variant="body2"
                      color="secondary"
                      className="displayCenterAli"
                      style={{ fontSize: "12px" }}
                    >
                      {/* {data?.apiKey && sortAddress(data?.apiKey)} */}
                      XXXXXXXXXXXXXXXXXXXX
                    </Typography>
                    {isDisconnected && (
                      <Button
                        variant="contained"
                        className="disconnectButton"
                        color="primary"
                        style={{ borderRadius: "12px !important" }}
                        onClick={() =>
                          !auth?.userData?.isDocuseal
                            ? setUseDocusealContract(true)
                            : handleDisconnect(data)
                        }
                        disabled={isDeleting}
                      >
                        Disconnect
                      </Button>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
      </Grid>
      {list?.length === 0 && (
        <Paper elevation={2} style={{ marginTop: "12px" }}>
          <Box className="displayCenterAli">
            <Typography
              variant="body2"
              color="primary"
              mb={2}
              sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
                gap: "4px",
                // cursor: "pointer",
              }}
            >
              <AiFillInfoCircle />
              Information
            </Typography>
          </Box>
          <Box display="flex" style={{ marginBottom: "16px" }}>
            <li />
            <Box>
              <Typography variant="body2" color="primary">
                Select exchange
              </Typography>
              <Typography variant="body2" color="secondary">
                Choose the exchange where your bot will trade. If you don't have
                an account yet, create one first.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" style={{ marginBottom: "16px" }}>
            <li />
            <Box>
              <Typography variant="body2" color="primary">
                API key
              </Typography>
              <Typography variant="body2" color="secondary">
                To connect your bot to the exchange, you need to obtain an API
                key and an API secret key. Log into your exchange account and
                generate these keys in your profile settings. Ensure you have
                enabled the "read balance" and "place order" permissions, and
                disabled the "withdrawal" permission.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" style={{ marginBottom: "16px" }}>
            <li />
            <Box>
              <Typography variant="body2" color="primary">
                API secret key
              </Typography>
              <Typography variant="body2" color="secondary">
                As with the API key, look for the API secret key in the settings
                of the exchange you want to connect.
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
      {useDocusealContract && (
        <HandleDocusealContract
          open={useDocusealContract}
          handleClose={() => setUseDocusealContract(false)}
          email={auth.userData.email}
          name={auth.userData.firstName + " " + auth.userData.lastName}
        />
      )}
      <CommonConfirmationDialog
        open={open}
        handleClose={() => setOpen(false)}
        type="Disconnect"
        title="Disconnect Exchange"
        heading={`Are you sure you want to disconnect the Bitmart  ${idData?.exchangeName} exchange?`}
        handleSubmit={(v) => disConnectExchangeHandler(v)}
        // setOTP={(e) => setOTPV(e)}
        // OTPV={OTPV}
        isLoading={isDeleting}
      />
    </Box>
  );
}
