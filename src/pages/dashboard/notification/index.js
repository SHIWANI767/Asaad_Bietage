import { Box, styled, Typography, IconButton, Paper } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import DataLoader from "@/components/DataLoader";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";
import { Notifications } from "@mui/icons-material";
import { api_configs } from "@/api-services";
import DashboardLayout from "@/layout/DashboardLayout";
import AppContext from "@/context/AppContext";

const NotificationBox = styled("div")(({ theme }) => ({
  "& .mainBoxPaper": {
    position: "relative",
    zIndex: "999",
    "& .MuiIconButton-root": {
      padding: "0px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .headingBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& p": {
        color: "#F44336",
      },
    },
    "& .ListBox": {
      position: "relative",
      // padding: "20px 0px",
      marginBottom: "10px",
      "& .notificationDate": {
        whiteSpace: "pre",
        position: "absolute",
        right: "12px",
        bottom: "12px",
        "& p": {
          fontSize: "12px",
        },
      },
    },
  },
}));

export default function Notification() {
  // const classes = useStyles();

  const token = window.localStorage.getItem("user_token");
  const [notificationData, setNotificationData] = useState([]);
  const [page, setPage] = useState(1); // eslint-disable-line
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AppContext);
  //readNotification
  const getNotificationHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "get",
        url: api_configs.listNotification,
        headers: {
          token: token,
        },
        params: {
          page: page.toString(),
          limit: "1000",
        },
      });

      if (res.data.responseCode === 200) {
        setNotificationData(res.data.result.docs);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (token) getNotificationHandler(); // eslint-disable-next-line
  }, [token, page]);
  const handleReadNotification = async () => {
    try {
      const res = await axios({
        method: "get",
        url: api_configs.readNotification,
        headers: {
          token: token,
        },
      });

      if (res.data.responseCode === 200) {
        setIsLoading(false);
        auth.getNotificationHandler();
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (token) {
      timeoutId = setTimeout(() => {
        handleReadNotification();
      }, 10000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token]);

  const clearNotificationHandler = async () => {
    try {
      const res = await axios({
        method: "DELETE",
        url: api_configs.clearNotification,
        headers: {
          token: token,
        },
      });
      if (res.status === 200) {
        toast.success("All notifications cleared");
        getNotificationHandler();
        auth.getNotificationHandler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Notifications");
    }
  }, []);
  return (
    <NotificationBox>
      <Box className="mainBoxPaper">
        <Box className="" mb={3} align="right">
          {notificationData && notificationData.length > 0 ? (
            <Typography
              variant="body2"
              color="red"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={clearNotificationHandler}
            >
              Clear All
            </Typography>
          ) : (
            ""
          )}
        </Box>
        {notificationData &&
          notificationData?.map((data, i) => (
            <Paper
              elevation={2}
              className="ListBox"
              display="flex"
              alignItems="center"
            >
              <Box
                className="displayStart"
                style={{ alignItems: "flex-start" }}
              >
                <IconButton
                  style={{
                    background:
                      "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%)",
                    color: "#fff",
                    marginRight: "12px",
                  }}
                >
                  <Notifications size={16} />
                </IconButton>
                <Box pl={0}>
                  <Typography variant="body2" color="primary">
                    {data.title}
                  </Typography>
                  <Typography variant="body2" color="secondary" fontSize="10px">
                    {data.body}
                  </Typography>
                </Box>
              </Box>

              <Box className="notificationDate3 displayEnd">
                <Typography variant="body2" color="secondary" fontSize="9px">
                  {data.createdAt ? moment(data.createdAt).format("lll") : ""}
                </Typography>
              </Box>
            </Paper>
          ))}
        {!isLoading && notificationData && notificationData.length === 0 && (
          <NoDataFoundFrame data={"No notifications found"} />
        )}
        {isLoading && <DataLoader />}
      </Box>
    </NotificationBox>
  );
}

Notification.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
