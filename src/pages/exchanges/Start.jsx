import {
  Box,
  Paper,
  styled,
  TextField,
  Typography,
  Button,
  Container,
} from "@mui/material";
import React, { useContext, useState } from "react";
import SettingsContext from "@/context/SettingsContext";
import { postAPIHandler } from "@/api-services/service";
import toast from "react-hot-toast";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";
const StartStyleBox = styled("div")(({ theme }) => ({
  marginTop: "100px",
  marginBottom: "100px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "60px",
    marginBottom: "90px",
  },
  "& .startButton": {
    position: "absolute",
    right: "8px",
    bottom: "7px",
    height: "40px !important",
    borderRadius: "10px !important",
    padding: "12px 18px",
    [theme.breakpoints.down("sm")]: {},
  },
  "& .MuiOutlinedInput-root": {
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(25, 29, 19, 1)"
    }`,
  },
  "& .MuiOutlinedInput-input": {
    padding: "11px 0",
    marginRight: "131px",
  },
  "& .textFieldContainer": {
    position: "relative",
  },
}));

export default function Tutorial() {
  const [newLetter, setNewLetter] = useState("");
  const themeSetting = useContext(SettingsContext);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation
    return emailRegex.test(email);
  };

  const PostNewLetter = async () => {
    if (!isValidEmail(newLetter)) {
      setError(true); // Show error if email is invalid
      toast.error("Please enter a valid email address.");
      return;
    }
    setError(false);
    setIsLoading(true);
    try {
      const dataToSend = { email: newLetter };
      const response = await postAPIHandler({
        endPoint: "newLetter",
        dataToSend,
      });

      console.log(response);
      if (response?.data?.responseCode === 200) {
        toast.success(response?.data?.responseMessage);
        console.log("Subscribe ===>", response?.data?.responseMessage);
      } else {
        toast.error(response?.data?.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Something went wrong");
      toast.error(response?.data?.responseMessage);
      setIsLoading(false);
    }
  };

  return (
    <StartStyleBox>
      <Container maxWidth="lg">
        <Paper elevation={1} sx={{ padding: 3 }}>
          <Box align="center">
            <Box style={{ maxWidth: "600px" }}>
              <Typography variant="h2" color="primary">
                Start Your Journey With Us
              </Typography>

              <Typography variant="body2" color="secondary" mt={3}>
                Empower yourself by taking control of your security, allowing
                you to proactively manage and safeguard your digital assets with
                confidence.
              </Typography>

              <Box
                className="textFieldContainer"
                mt={3}
                style={{ maxWidth: "500px" }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Enter Email Address"
                  fullWidth
                  error={error} // Add error state to TextField
                  helperText={
                    error ? "Please enter a valid email address." : ""
                  }
                  onChange={(e) => setNewLetter(e.target.value)}
                  value={newLetter}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="startButton"
                  disabled={isLoading}
                  onClick={() => PostNewLetter()}
                >
                  Start Now {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </StartStyleBox>
  );
}
