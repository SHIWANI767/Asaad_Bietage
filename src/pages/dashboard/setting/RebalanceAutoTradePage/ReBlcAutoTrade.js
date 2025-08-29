import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import IntraArbitrage from "./IntraArbitrage";
import TriangularArbitage from "./TriangularArbitage";
import { MenuProps } from "@/utils";

const RebalanceAutoTradeBox = styled(Box)(({ theme }) => ({
  "& .filterpaperBox": {
    padding: "10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
    boxShadow: "none",
  },
  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
    background: "transparent",
    borderRadius: "44px",
    padding: "5px !important",
    width: "100%",
    borderBottom: "1px solid gray",
    borderRadius: "0px",
    padding: "0px !important",
    flexWrap: "wrap",
    gap: "20px",
  },
  "& .tabButton": {
    padding: "10px 0",
    fontSize: "12px",
    fontWeight: "400",
    color: theme.palette.text.primary,
    margin: "0px",
    borderRadius: "0px !important",
    borderBottom: "2px solid transparent",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 16px",
      fontSize: "10px !important",
    },
    "&:hover": {
      color: theme.palette.text.primary,
      background: "transparent !important",
      borderBottom: "2px solid #a5ef70 !important",
    },
    "&.active": {
      color: theme.palette.text.green,
      background: "transparent !important",
      borderBottom: "2px solid #a5ef70 !important",
    },
  },
}));
export default function ReBlcAutoTrade() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabView, setTabView] = useState("Triangular");

  return (
    <RebalanceAutoTradeBox>
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <Paper elevation={2} className="paperBox">
            <Box mb={2}>
              <Typography variant="h5" color="primary">
                Strategy
              </Typography>
            </Box>
            {isMobile ? (
              <Box className="mainTab displayStart">
                <FormControl variant="outlined" fullWidth color="primary">
                  <Select
                    labelId="transaction-tab-select"
                    id="transaction-tab-select"
                    value={tabView}
                    onChange={(e) => {
                      setTabView(e.target.value);
                    }}
                    displayEmpty
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Select Transaction Tab" }}
                    color="primary"
                    sx={{ height: "44px" }}
                  >
                    <MenuItem value="Triangular">QuantumLoop</MenuItem>
                    <MenuItem value="Intra">QuantumBridge</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Box className="tabBox">
                <Button
                  className={`tabButton ${
                    tabView === "Triangular" ? "active" : ""
                  }`}
                  onClick={() => setTabView("Triangular")}
                >
                  QuantumLoop
                </Button>
                <Button
                  className={`tabButton ${tabView === "Intra" ? "active" : ""}`}
                  onClick={() => setTabView("Intra")}
                >
                  QuantumBridge
                </Button>
              </Box>
            )}
            {tabView === "Intra" && <IntraArbitrage />}

            {/* {tabView ==="Trigular" && <Intra />} */}

            {tabView === "Triangular" && <TriangularArbitage />}
          </Paper>
        </Grid>
      </Grid>
    </RebalanceAutoTradeBox>
  );
}
