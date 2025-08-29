import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Dialog,
  Divider,
  Autocomplete,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { styled } from "@mui/system";
import { Close, ExpandMore } from "@mui/icons-material";
import { api_configs } from "@/api-services";
import axios from "axios";

const FilterModalBox = styled(Box)(({ theme }) => ({
  position: "relative",

  [theme.breakpoints.down("xs")]: {
    padding: "10px",
  },
  "& h6": {
    fontSize: "20px",
    fontWeight: "600",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
    color: "#fff",
    "-webkit-text-fill-color": "#fff !important",
  },
  "& .MuiSelect-selectMenu": {
    fontSize: "14px",
  },

  "& .textBox": {
    "& .MuiInputBase-root": {
      background: "transparent",
      boxShadow: "none",
      color: "#fff",
      borderRadius: "0px !important",
      fontSize: "14px",
      height: "33px",
    },

    "& .MuiInput-underline:before": {
      left: "0",
      right: "0",
      bottom: "0",
      content: '"\\00a0"',
      position: "absolute",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderBottom: "1px solid gray",
      pointerEvents: "none",
    },
  },

  "& .buttonBox": {
    padding: "24px 0 0px",
  },
}));

const CancelButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  svg: {
    fontWeight: "700",
  },
}));

function FilterModal({
  open,
  setOpen,
  filterData,
  setFilterData,
  setFilterStatus,
  type,
  filterStatus,
}) {
  const [exchangeList, setExchangeList] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const token = window.localStorage.getItem("user_token");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const getCurrentExchangeListHandler = async () => {
    try {
      // const response = await getDataHandlerAPI("listExchange", token);
      const response = await axios({
        method: "GET",
        url: api_configs.listExchange,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode == 200) {
        let exchangeListData = [];
        for (var i = 0; i < response.data.result.length; i++) {
          exchangeListData.push(response.data.result[i]?.uid);
        }

        setExchangeList(
          exchangeListData?.filter((item) => item !== "coinbasepro")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTokenListHandler = async (_id) => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.exchangeCoins,
        headers: {
          token: token,
        },
        params: {
          uid: _id,
        },
      });
      if (response.data.responseCode === 200) {
        setCoinList(response.data.result.coins);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentExchangeListHandler();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
      classes={{
        paper: "dialog",
      }}
      keepMounted
      sx={{
        "& .MuiDialog-paper": {
          padding: "15px",
        },
      }}
    >
      <FilterModalBox
        sx={{
          justifyContent: "center",
          "& .MuiAutocomplete-inputRoot": {
            height: isMobile ? "40px" : "46px",
            minHeight: "30px !important",
          },
          "& .MuiAutocomplete-popper": {
            fontSize: (theme) =>
              isMobile
                ? theme.typography.pxToRem(10)
                : theme.typography.fontSize,
          },
          "& input": {
            height: (theme) => {
              const buttonHeight = isMobile ? "12px" : "12px";
              return `${buttonHeight} !important`;
            },
            fontSize: (theme) =>
              isMobile
                ? theme.typography.pxToRem(10)
                : theme.typography.fontSize,
          },
        }}
      >
        <Typography variant="h6" color="primary">
          Apply Filters
        </Typography>
        <Box mt={1} mb={1}>
          <Divider />
        </Box>
        <Box mt={1} mb={1}>
          <Typography variant="body2" color="primary">
            Primary Filter
          </Typography>
        </Box>

        <Box mt={1}>
          <Typography variant="body2" color="primary">
            From exchange (Max 10 exchange)
          </Typography>

          <Box
            mt={1}
            style={{ width: "100%", position: "relative" }}
            className="autocompleBox"
          >
            <Autocomplete
              freeSolo
              disableClearable
              fullWidth
              size="small"
              multiple
              limitTags={4}
              options={exchangeList.filter(function (x) {
                return (
                  filterData.fromExchange.filter(function (y) {
                    return y == x;
                  }).length == 0
                );
              })}
              value={filterData.fromExchange}
              onChange={(e, v) => {
                setFilterData({
                  fromExchange: v,
                  toExchange: filterData.toExchange,
                  toExchange1: filterData.toExchange1,
                  startToken: filterData.startToken,
                });
                getTokenListHandler(v[0]);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <InputAdornment position="end">
                        <ExpandMore style={{ color: "#fff" }} {...params} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
        </Box>
        {type !== "triangular" && (
          <>
            {" "}
            <Box align="center" mt={1}>
              <IconButton>
                <img
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src="/images/exchangearbitrage.png"
                  alt="icon"
                />
              </IconButton>
            </Box>
            <Box mt={1}>
              <Typography variant="body2" color="primary">
                To exchange (Max 10 exchange)
              </Typography>

              <Box
                mt={1}
                style={{ width: "100%", position: "relative" }}
                className="autocompleBox"
              >
                <Autocomplete
                  freeSolo
                  disableClearable
                  fullWidth
                  size="small"
                  multiple
                  limitTags={4}
                  options={exchangeList.filter(function (x) {
                    return (
                      filterData.fromExchange.filter(function (y) {
                        return y == x;
                      }).length == 0
                    );
                  })}
                  value={filterData.toExchange}
                  onChange={(e, v) => {
                    setFilterData({
                      fromExchange: filterData.fromExchange,
                      toExchange: v,
                      toExchange1: filterData.toExchange1,
                      startToken: filterData.startToken,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                        endAdornment: (
                          <InputAdornment position="end">
                            <ExpandMore style={{ color: "#fff" }} {...params} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
          </>
        )}
        {type == "loop" && (
          <>
            {" "}
            <Box align="center" mt={1}>
              <IconButton>
                <img
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src="/images/exchangearbitrage.png"
                  alt="icon"
                />
              </IconButton>
            </Box>
            <Box mt={1}>
              <Typography variant="body2" color="primary">
                To exchange (Max 10 exchange)
              </Typography>

              <Box
                mt={1}
                style={{ width: "100%", position: "relative" }}
                className="autocompleBox"
              >
                <Autocomplete
                  freeSolo
                  disableClearable
                  fullWidth
                  size="small"
                  multiple
                  limitTags={4}
                  options={exchangeList.filter(function (x) {
                    return (
                      filterData.fromExchange.filter(function (y) {
                        return y == x;
                      }).length == 0
                    );
                  })}
                  value={filterData.toExchange1}
                  onChange={(e, v) => {
                    setFilterData({
                      fromExchange: filterData.fromExchange,
                      toExchange: filterData.toExchange,
                      toExchange1: v,
                      startToken: filterData.startToken,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                        endAdornment: (
                          <InputAdornment position="end">
                            <ExpandMore style={{ color: "#fff" }} {...params} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
          </>
        )}

        <Box mt={3}>
          <Typography variant="body2">Secondary Filter</Typography>
          <TextField
            fullWidth
            variant="standard"
            placeholder="(This filter is applied on the current exchange list)"
            inputProps={{
              readOnly: true,
            }}
          />
        </Box>

        <Box mt={1}>
          <Typography variant="body2" color="primary">
            Buy coin
          </Typography>

          <Box
            mt={1}
            style={{ width: "100%", position: "relative" }}
            className="autocompleBox"
          >
            <Autocomplete
              freeSolo
              disableClearable
              fullWidth
              size="small"
              multiple
              limitTags={4}
              options={coinList}
              value={filterData.startToken}
              onChange={(e, v) => {
                setFilterData({
                  fromExchange: filterData.fromExchange,
                  toExchange: filterData.toExchange,
                  startToken: v,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <InputAdornment position="end">
                        <ExpandMore style={{ color: "#fff" }} {...params} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
        </Box>

        <Box
          className="displayCenter buttonBox"
          sx={{
            justifyContent: "center",
            "& button": {
              height: (theme) => {
                const buttonHeight = isMobile ? "30px" : "40px";
                return `${buttonHeight} !important`;
              },
              fontSize: (theme) =>
                isMobile
                  ? theme.typography.pxToRem(10)
                  : theme.typography.fontSize,
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setFilterStatus(!filterStatus);
              setOpen(false);
            }}
          >
            Apply
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setFilterData({
                fromExchange: [],
                toExchange: [],
                toExchange1: [],
                startToken: [],
              });
              setFilterStatus(!filterStatus);
            }}
          >
            Reset
          </Button>
        </Box>
        <CancelButton onClick={() => setOpen(false)}>
          <Close fontSize="20px" color="primary" />
        </CancelButton>
      </FilterModalBox>
    </Dialog>
  );
}

export default FilterModal;
