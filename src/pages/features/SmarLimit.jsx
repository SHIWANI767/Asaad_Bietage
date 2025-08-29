import { Box, Button, Grid, Paper, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CgArrowTopRightO } from "react-icons/cg";
import { useRouter } from "next/router";
import SettingsContext from "@/context/SettingsContext";
import AppContext from "@/context/AppContext";
const FeaturesSimpleStyleBox = styled(Box)(({ theme }) => ({
  marginBottom: "170px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "70px",
  },
  "& .featuresworkcradBox": {
    padding: "20px",
    minHeight: "145px",
    cursor: "pointer",
    transition: "box-shadow 0.9s ease, transform 0.5s ease", // Adding box-shadow and transform animations

    img: {
      transition: "transform 0.3s ease, filter 0.3s ease",
    },
    "&:hover": {
      background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
      transform: "scale(1.05)", // Slightly scaling the element on hover
      "& h6": {
        color: "rgba(25, 29, 19, 1)",
      },
      "& p": {
        color: "rgba(25, 29, 19, 0.8)",
      },

      img: {
        filter: "brightness(0.3)" /* Makes the image darker */,
      },
    },

    "@media(max-width:1024px)": {
      minHeight: "170px",
    },
  },
  "& h6": {
    fontSize: "16px",
    fontWeight: "700",
  },
}));
const workData = [
  {
    imgIccon: "/images/Features/features_1.svg",
    name: "Active Alternative Search",
    description:
      "Actively searches for alternative order iterations, reducing the number of pending orders.",
  },
  {
    imgIccon: "/images/Features/features_2.svg",
    name: "Risk Reduction",
    description:
      "Lowers the risk associated with pending orders by finding optimal order placements.",
  },
  {
    imgIccon: "/images/Features/features_3.svg",
    name: "User Control and Responsibility",
    description:
      "Users retain full control over trading decisions, with the system enhancing their strategies.",
  },
  {
    imgIccon: "/images/Features/features_4.svg",
    name: "Efficient Order Management",
    description:
      "Minimises delays and inefficiencies by continuously optimising order placements.",
  },

  {
    imgIccon: "/images/Features/features_5.svg",
    name: "Enhanced Trading Performance",
    description:
      "Improves the likelihood of successful trades by dynamically adjusting limit orders.",
  },
];
export default function SmarLimit() {
  const themeSetting = useContext(SettingsContext);
  const router = useRouter();
  const auth = useContext(AppContext);
  return (
    <>
      <FeaturesSimpleStyleBox>
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={4} sm={12} md={4} xs={12}>
            <Box mb={2}>
              <Typography variant="h2" color="primary">
                Smart Limit
                <br /> Order
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="secondary"
              style={{ maxWidth: "628px" }}
            >
              Our unique smart limit order option sets Bitedge.app apart. This
              feature actively searches for alternative iterations to reduce
              pending orders, lowering the risk for users. Users retain full
              control and are responsible for all trading decisions made using
              Bitedge.app.
            </Typography>

            <Box mt={3} className="displayStart">
              <Button
                variant="contained"
                color="primary"
                endIcon={<CgArrowTopRightO />}
                onClick={() => {
                  if (auth.userLoggedIn) {
                    router.push("/dashboard");
                  } else {
                    router.push("/auth/login");
                  }
                }}
              >
                Get Started
              </Button>
            </Box>
          </Grid>
          <Grid item lg={8} sm={12} md={8} xs={12}>
            <Grid container spacing={4}>
              {workData.map((item) => (
                <Grid item lg={6} sm={6} md={6} xs={12}>
                  <>
                    <Paper elevation={1} className="featuresworkcradBox">
                      <Box>
                        <Box className="displayStart" style={{ gap: "10px" }}>
                          <img
                            src={item.imgIccon}
                            alt="Image"
                            width="32px"
                            height="32px"
                          />
                          <Typography variant="h6" color="primary">
                            {item.name}
                          </Typography>
                        </Box>

                        <Typography variant="body2" color="primary" mt={3}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </FeaturesSimpleStyleBox>
    </>
  );
}
