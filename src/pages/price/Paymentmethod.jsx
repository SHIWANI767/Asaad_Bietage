import { Box, Container, Grid, Paper, styled, Typography } from "@mui/material";
import React from "react";
const PaymentBoxStyle = styled(Box)(({ theme }) => ({
  marginTop: "120px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "28px",
  },
  "& img": {
    width: "auto",
    maxWidth: "106px",
    height: "69px",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "86px",
      height: "46px",
    },
  },
}));

const paymentData = [
  {
    image: "/images/payment/visa.png",
  },
  {
    image: "/images/payment/mastercard.png", // Updated to use 'image' key
  },
  {
    image: "/images/payment/visa.png",
  },
];

export default function Paymentmethod() {
  return (
    <PaymentBoxStyle>
      <Container>
        <Box align="center">
          <Typography variant="h2" color="primary" mb={4}>
            Our Payment Methods
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {paymentData.map((item, index) => (
              <Grid item lg={2} md={2} sm={6} xs={6} key={index}>
                <Paper elevation={1} style={{ boxShadow: "none" }}>
                  {item.image ? (
                    <img src={item.image} alt={`Payment method ${index + 1}`} />
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      No image available
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </PaymentBoxStyle>
  );
}
