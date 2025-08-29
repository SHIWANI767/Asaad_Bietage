import React, { useContext } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import AppContext from "@/context/AppContext";
import { CgArrowTopRightO } from "react-icons/cg";

import JourneySection from "./JourneySection";

export default function Secure() {
  const router = useRouter();
  const auth = useContext(AppContext);

  return (
    <>
      <Box className="SecureSection" style={{ position: "relative" }}>
        <Container>
          <Box className="secureContentBox" align="center">
            <Box mt={2} mb={4}>
              <Typography variant="h2" color="primary">
                Start Your
                <br />
                Journey Today
              </Typography>
            </Box>
            {/* <Typography
              variant="body2"
              color="secondary"
              style={{ margin: "20px 0", maxWidth: "500px" }}
            >
              Every significant exchange is supported, and more are being added
              all the time.
            </Typography> */}
            <JourneySection />
          </Box>
        </Container>
      </Box>
    </>
  );
}
