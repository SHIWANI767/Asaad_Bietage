import {
  Box,
  Typography,
  Paper,
  Grid,
  useMediaQuery,
  Button,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import TradeCheck from "@/components/TradeCheck";
import { MenuProps } from "@/utils";

const BotSettingBox = styled(Box)(({ theme }) => ({
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
    flexWrap: "wrap",
    gap: "20px",
    borderBottom: "1px solid gray",
  },
  "& .tabButton2": {
    borderRadius: "0px !important",
    padding: "10px 0",
    fontSize: "13px",
    fontWeight: "400",
    color: theme.palette.text.primary,
    margin: "0px",
    borderBottom: "2px solid transparent",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 16px",
      fontSize: "10px !important",
    },

    "&.active": {
      color: theme.palette.text.green,
      background: "transparent !important",
      borderBottom: "2px solid",
      borderRadius: "0px !important",
      borderColor: theme.palette.text.green,
    },
  },
}));
export default function BotSetting({ botType }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabView, setTabView] = useState("Direct");

  return (
    <BotSettingBox>
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <Paper elevation={2} className="paperBox">
            <Box mb={2}>
              <Typography variant="h6" color="primary">
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
                    <MenuItem value="Direct">QuantumFlow</MenuItem>
                    <MenuItem value="Triangular">QuantumLoop</MenuItem>
                    <MenuItem value="Intra">QuantumBridge</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Box className="tabBox">
                <Button
                  className={`tabButton2 ${
                    tabView === "Direct" ? "active" : ""
                  }`}
                  onClick={() => setTabView("Direct")}
                >
                  QuantumFlow
                </Button>

                <Button
                  className={`tabButton2 ${
                    tabView === "Triangular" ? "active" : ""
                  }`}
                  onClick={() => setTabView("Triangular")}
                >
                  QuantumLoop
                </Button>
                <Button
                  className={`tabButton2 ${
                    tabView === "Intra" ? "active" : ""
                  }`}
                  onClick={() => setTabView("Intra")}
                >
                  QuantumBridge
                </Button>
              </Box>
            )}
            {tabView === "Triangular" && (
              <TradeCheck type="Triangular" botType={botType} />
            )}
            {tabView === "Intra" && (
              <TradeCheck type="Intra" botType={botType} />
            )}
            {tabView === "Direct" && (
              <TradeCheck type="Direct" botType={botType} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </BotSettingBox>
  );
}
