"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { typography } from "./typography.jsx";

import { merge } from "lodash";
import { borderRadius, padding } from "@mui/system";

const baseOptions = {
  direction: "ltr",
  // themeOption,
  overrides: {
    MuiTableCell: {},
    MuiInputAdornment: {
      positionStart: {
        paddingLeft: "14px",
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Outfit', sans-serif",
          boxShadow: "none",
        },
        containedSizeLarge: { fontSize: "16px", padding: "10px 22px" },
        containedPrimary: {
          borderRadius: "30px",
          fontWeight: "500",
        },

        containedSizeSmall: {
          fontSize: "12px",
          padding: "4px 10px",
        },
      },
    },
  },
};

const themesOptions = [];
export const lighttheme = createTheme({
  palette: {
    mode: "light", // default mode

    primary: {
      main: "#191D13", // customize primary color
    },
    secondary: {
      main: "#191D1399", // customize secondary color
    },
    background: {
      primary: "#E7ECF4",
      secondary: "#E7ECF4",
      taskBg: "#c5d0d985",
      basebutton: "#D0E4E4",
      tooltrip: "rgb(182 190 197 / 24%)",
      newprofitbg: "rgb(205 205 205)",
      custom: "#0000000D",
      timerback: "#fff",
      textFeild: "#fff",
    },
    text: {
      primary: "rgba(38, 38, 38, 1)",
      secondary: "rgba(38, 38, 38,0.7)",
      black: "#fff",
      green: "#1E1E1E",
      active: "#000000",
      faq: "#000000",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          "@media(min-width:1300px)": {
            maxWidth: "1510px",
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: "none",
          borderRadius: "12px",
          border: "none",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          padding: "0px !important",
          // backgroundColor: "#000", // Change the background color here
        },
        inputRoot: {
          minHeight: "54px",
          padding: "5px",
        },
        option: {
          color: "#000",
          fontSize: "14px !important",
          fontWeight: "400",
          lineHeight: "18px",
          letterSpacing: "0px",
          textAlign: "left",
        },
        // input: {
        //   width: "0",
        //   color: "#fff",
        //   fontSize: "13px !important",
        //   fontWeight: "400",
        // },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: "8px 14px",
          fontWeight: "300",
          // color: "#fff",
          whiteSpace: "pre",
        },
        body: {
          // color: "#fff",
          whiteSpace: "pre",
          fontSize: "12px",
        },
        root: {
          borderBottom: "none",
          padding: "8px 12px !important",
          // color: "#fff",
          background: "transparent",
          fontSize: "11px  !important",
          letterSpacing: "0.6px",
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#000",
        },
        root: {
          borderRadius: "12px",
          // height: "49px",
          padding: "0px",
          background: "#FFFFFF",
          position: "relative",
          // border: "none !important",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { backgroundColor: "#ffffff80" },
        rounded: { backgroundColor: "#000", borderRadius: "50%" },
      },
    },

    MuiTouchRipple: {
      styleOverrides: {
        root: {
          color: "#191D13CC",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          position: "relative",
          border: "1px solid #FFFFFF",
          borderRadius: "12px",
          // "height": "48px",
          padding: "7px 16px",
          background: "#FFFFFF",
          "&::before": {
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
          "&::after": {
            borderBottom: "none !important",
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransform: "scaleX(0)",
            MozTransform: "scaleX(0)",
            MsTransform: "scaleX(0)",
            transform: "scaleX(0)",
            WebkitTransition:
              "-webkit-transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
          "@media (max-width: 780px)": {
            height: "48px",

            "& p": {
              fontSize: "12px",
            },
          },
        },

        input: {
          fontSize: 13,
          color: "#191D13CC",
          padding: "7px 0",
          background: "transparent !important",
          fontFamily: "'Sora', sans-serif",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#191D13CC",
          },
          "&:-internal-autofill-selected": {
            color: "#191D13CC",
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: "18px",
        },
        rail: {
          backgroundColor: "#fff",
          opacity: "2",
        },
        track: {
          background: "linear-gradient(90deg, #436DFF 4.74%, #02D1FF 93.1%)",
          border: "none",
        },
        markLabel: {
          top: "50px",
          fontSize: "14px",
          fontWeight: 400,
        },
        mark: {
          width: "0px",
          height: "0px",
        },
        thumb: {
          position: "relative",
          "&::before": {
            position: "absolute",
            content: '""',
            borderRadius: "inherit",
            width: "100%",
            background: "#000",
            padding: "0px",
            height: "100%",
          },

          "&::after": {
            position: "absolute",
            content: '""',
            borderRadius: "50%",
            width: "12px",
            height: "12px",
            top: "50%",
            padding: "-15px",
            left: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            MozTransform: "translate(-50%, -50%)",
            MsTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(90deg, #436DFF 4.74%, #02D1FF 93.1%)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "#fff",
          width: "40px",
          height: "40px",
          padding: "12px",
          fontSize: "20px",
          // "&:hover": {
          //   // backgroundColor: "rgba(255,255,255,0.7)",
          //   backgroundColor: "#000",
          //   color: "#fff",
          // },
        },
        colorSecondary: {
          backgroundColor: "transparent",
          color: "#000",
          "&:hover": {
            backgroundColor: "transparent",
            color: "#000",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          fontFamily: "'Outfit', sans-serif",
          backgroundColor: "rgba(255,255,255,1)",
          padding: "7px 16px",
          border: "1px solid rgba(0,0,0,0.14)",
        },
        notchedOutline: { borderColor: "none", borderWidth: "0px" },
        input: {
          padding: "11px 14px",
          fontSize: "12px",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#000",
          },
          "&:-internal-autofill-selected": {
            color: "#fff",
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          padding: "40px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "8px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          borderTop: "none",
          borderBottom: "none",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paperScrollPaper: {
          Width: 450,
          maxWidth: "100%",
        },

        paper: {
          backgroundColor: "#fff  !important",
          overflow: "auto",
          position: "relative",
          borderRadius: "10px",
          padding: "20px",
          border: "1px solid #b9ff3c0f",
          "@media(max-width:767px)": {
            margin: "16px",
          },
        },
        paperWidthSm: {
          maxWidth: "500px !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxShadow: "none",
          backgroundImage: "none",
          // "&.MuiDialog-paper": {
          //   backgroundImage: "none",
          //   background: "transparent",
          //   backgroundColor: "transparent",
          //   borderRadius: "30px",

          //   "&:before": {
          //     content: "' '",
          //     position: "absolute",
          //     width: "100%",
          //     height: "100%",
          //     backgroundColor: "#E7ECF4",
          //     backdropFilter: "blur(10px)",
          //   },
          // },
          "&.MuiPickersPopper-paper": {
            backgroundImage: "none",
            backgroundColor: "#939393",
            borderRadius: "10px",
          },
          "&.MuiAccordion-root": {
            backgroundColor: "transparent",
            backgroundImage: "none",
            borderRadius: "30px",
            padding: "0",
          },

          "& .MuiAccordionSummary-root": {
            backgroundColor: "rgba(225, 255, 199, 1)",
            background: "rgba(225, 255, 199, 1)",
            borderRadius: "12px !important",
            // padding: "15px 17px !important",
          },
        },

        elevation1: {
          background: "#FFFFFF",
          borderRadius: "12px",
          padding: "12px",
          boxShadow: "10px 10px 0px 0px rgba(130, 130, 130, 0.1)",
          "@media(max-width:767px)": {
            padding: "20px",
          },
        },
        elevation2: {
          background: "rgb(227 227 227)",
          borderRadius: "12px",
          padding: "20px",
          "@media(max-width:767px)": {
            padding: "20px 10px 10px",
          },
        },
        elevation3: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: "24px",
        },
        elevation4: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
          padding: "10px 12px",
        },
        elevation5: {
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderRadius: "24px",
          padding: "50px",
          "@media(max-width:767px)": {
            padding: "20px 10px 10px",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: "12px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "rgba(108, 109, 110, 1)",
          fontSize: "12px",
          "@media (max-width: 780px)": {
            minHeight: "39px",
            "& p": {
              fontSize: "12px",
            },
            "& span": {
              fontSize: "12px",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent !important",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "200px",
          backgroundColor: "#fff",
        },
        paperAnchorDockedLeft: {
          borderRight: "0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Sora, sans-serif",
          boxShadow: "none",
          whiteSpace: "pre",
          // fontSize: "15px",
          padding: "12px 24px",
          // fontWeight: "500",
          textTransform: "capitalize",
          borderRadius: "50px !important",
          // padding: "10px 22px",
          "@media (max-width: 780px)": {
            // padding: "10px 20px",
            padding: "10px 20px",
            fontSize: "12px",
            "& p": {
              fontSize: "12px",
            },
          },
        },
        textSizeLarge: {
          fontSize: "16px",
          padding: "10px 22px",
          fontWeight: "500",
          borderRadius: "30px",
          "@media(max-width:767px)": {
            minWidth: "100px",
            fontSize: "12px",
            padding: "8px 15px",
          },
        },
        containedSizeLarge: {
          fontSize: "16px",
          padding: "10px 22px",
          fontWeight: "500",
          minWidth: "150px",
          "@media(max-width:767px)": {
            minWidth: "100px",
            fontSize: "12px",
            padding: "8px 15px",
          },
        },
        containedSizeSmall: {
          fontSize: "12px",
          padding: "4px 10px",
        },
        containedInfo: {
          backgroundColor: "rgba(0,0,0, 0.5) !important",
          borderRadius: "30px",
        },
        containedPrimary: {
          background:
            "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
          color: "#191D13CC",
          "&:hover": {
            background: "#191D131A",
            color: "#191D13CC",
          },
        },
        containedSecondary: {
          background: "#191D131A",
          color: "#191D13CC",
          "&:hover": {
            color: "#191D13CC",
            background:
              "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
          },
        },
      },
    },
  },
  typography: {
    ...typography.typography,
    body1: {
      color: "#fff", // Example typography color for body1
    },
    // Add more typography color settings as needed
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.8)",
    },
    background: {
      primary: "#05020D",
      secondary: "#FFFFFF0D",
      taskBg: "#101511",
      basebutton: "#1B1B1B",
      tooltrip: "rgb(17, 20, 13)",
      custom: "rgba(255,255,255,0.05)",
      newprofitbg: "rgba(0, 0, 0, 0.15)",
      timerback: "#FFFFFF0D",
      textFeild:
        "linear-gradient(228.52deg, rgba(21, 21, 20, 0.88) -63.21%, rgba(22, 22, 20, 0.83) 116.99%)",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255,255,255,0.7)",
      black: "#000",
      green: "#bef856",
      active: "#bef856",
      faq: "rgba(225, 255, 199, 1)",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          "@media(min-width:1300px)": {
            maxWidth: "1510px",
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: "none",
          borderRadius: "12px",
          border: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(122, 105, 254, 0.25)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "200px",
          backgroundColor: "#000",
        },
        paperAnchorDockedLeft: {
          borderRight: "0",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          height: "40px",
          width: "40px",
          padding: "12px",
          color: "#FFFFFF !important",
          // background: "#1C1C23 ",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#fff",
          lineHeight: "20px",
          "&.Mui-selected": {
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.25)",
            background: "#88e68f",
            color: "#000",
          },
          "&.Mui-selected:hover": {
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.25)",
            background: "#4ddd58",
            color: "#000",
          },
        },
      },
    },
    MuiTableHead: {
      root: {
        // background: "rgba(255, 255, 255, 0.01)",
        borderTop: "1px solid #636262",
        "&:hover": {
          backgroundColor: "none",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        // root: {
        //   background: "rgba(255, 255, 255, 0.03)",
        // },
      },
    },
    MuiTable: {
      styleOverrides: {
        // root: {
        //   background: "rgba(255, 255, 255, 0.03)",
        // },
      },
    },
    MuiTableRow: {
      root: {
        // borderBottom: "1px solid #636262",
        // "&:hover": {
        //   backgroundColor: "#ffffff14",
        // },
        //

        "&:last-child": {
          borderBottom: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: "8px 14px",
          fontWeight: "300",
          color: "rgba(142, 142, 147, 1)",
          whiteSpace: "pre",
        },
        body: {
          color: "#fff",
          whiteSpace: "pre",
          fontSize: "12px",
        },
        root: {
          borderBottom: "1px solid rgba(45, 45, 44, 1) !important",
          padding: "8px 12px !important",
          color: "#fff",
          background: "transparent",
          fontSize: "11px  !important",
          letterSpacing: "0.6px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: "0px",
          border: "none",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          left: "5px",
        },
        track: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          opacity: "1.38",
          height: "20px",
          borderRadius: "25px",
        },
        thumb: {
          background: "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%)",
          width: "16px",
          height: "16px",
          marginTop: "5px",
        },
        root: {
          width: "61px",
          height: "43px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: "#222" },
        colorSecondary: {
          "&.Mui-focused": {
            color: "#222",
          },
        },
      },
    },
    MuiFormHelperText: {
      color: "#d32f2f",
      marginLeft: "0px",
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: "#000000",
          fontSize: "22px",
          fontWeight: "600",
          lineHeight: "33px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        inputMultiline: {
          padding: "1px !important",
        },
        root: {
          position: "relative",
          // border: "1px solid #FFFFFF0D",
          borderRadius: "12px",
          // "height": "48px",
          padding: "7px 16px",
          // background:
          //   "linear-gradient(228.52deg, rgba(21, 21, 20, 0.88) -63.21%, rgba(22, 22, 20, 0.83) 116.99%) !important",

          "&::before": {
            // borderBottom: "1px solid #ffffff",
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
          "&::after": {
            borderBottom: "none !important",
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransform: "scaleX(0)",
            MozTransform: "scaleX(0)",
            MsTransform: "scaleX(0)",
            transform: "scaleX(0)",
            WebkitTransition:
              "-webkit-transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
        },
        notchedOutline: {
          background: "none",
          borderColor: "rgba(39, 39, 39, 1)",
          borderWidth: "0px",
        },
        input: {
          borderRadius: "12px",
          color: "#fff",
          fontSize: "12px",
          background: "none",
          border: "none",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#fff",
          },
          "&:-internal-autofill-selected": {
            color: "#fff",
          },
          padding: "11px 14px",
          "media:(min-width: 567px)": {
            padding: "6px 10px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          padding: "20px",
          width: "100%",
        },
        elevation1: {
          background: "#FFFFFF0D",
          borderRadius: "12px",
          padding: "12px",
          boxShadow: "10px 10px 0px 0px #FFFFFF1C",
          "@media(max-width:767px)": {
            padding: "20px",
          },
        },
        elevation2: {
          position: "relative",
          zIndex: "999",
          // overflow: "hidden",
          padding: "20px",
          borderRadius: "20px",
          border: "1px solid rgba(28, 28, 28, 1)",
          background:
            "linear-gradient(178.65deg, #141413 -0.59%, #0E0F0D 99.02%)",
          "@media(max-width:767px)": {
            padding: "15px !important",
          },
        },
        elevation3: {
          padding: "25px",
          background: "#fff",
          borderRadius: "20px",
          position: "relative",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.08)",
          "@media(max-width:768px)": {
            padding: "15px",
          },
        },
        root: {
          boxShadow: "none",
          color: "#fff",
          width: "Auto",
          // '&.MuiAccordion-root .MuiCollapse-wrapper': {
          //   marginTop: "20px !important",
          // },
          "& .MuiAccordionSummary-root": {
            backgroundColor: "rgba(225, 255, 199, 1)",
            background: "rgba(225, 255, 199, 1)",
            borderRadius: "12px !important",
            // padding: "15px 17px !important",
          },
          "&.MuiAccordion-root": {
            backgroundColor: "rgba(31, 43, 21, 1)",
            background: "rgba(31, 43, 21, 1)",
            boxShadow: "none !important",
            borderRadius: "20px !important",
          },
          "&.MuiAccordion-root.Mui-expanded:last-of-type": {
            backgroundColor: "rgba(31, 43, 21, 1)",
            background: "rgba(31, 43, 21, 1)",
            boxShadow: "none !important",
            borderRadius: "20px !important",
          },
          "& .MuiAccordionSummary-content": {
            margin: "0px",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: 99999,
        },
        paper: {
          background: "rgba(255, 255, 255, 0.03)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          alignItems: "self-start",
        },
        gutters: {
          paddingLeft: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255, 255, 255, 0.40)",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "4px",
          fontSize: "12px",
        },
        colorSecondary: {
          "&.Mui-checked": { color: "#000" },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          paddingBottom: "0",
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          borderTop: "none",
          borderBottom: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperScrollPaper: {
          Width: 450,
          maxWidth: "100%",
        },

        paper: {
          background:
            "linear-gradient(178.65deg, #141413 -0.59%, #0E0F0D 99.02%) !important",
          overflow: "auto",
          position: "relative",
          borderRadius: "10px",
          padding: "20px",
          border: "1px solid #b9ff3c0f",
          "@media(max-width:767px)": {
            margin: "16px",
          },
        },
        paperWidthSm: {
          maxWidth: "500px !important",
        },
      },
    },

    MuiTouchRipple: {
      styleOverrides: {
        root: {
          color: "#FFFFFFCC",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          position: "relative",
          border: "1px solid rgba(39, 39, 39, 1)",
          borderRadius: "12px",
          // "height": "48px",
          padding: "7px 16px",
          // background: "#FFFFFF0D",
          background:
            "linear-gradient(228.52deg, rgba(21, 21, 20, 0.88) -63.21%, rgba(22, 22, 20, 0.83) 116.99%)",

          "&::before": {
            // borderBottom: "1px solid #ffffff",
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
          "&::after": {
            borderBottom: "none !important",
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransform: "scaleX(0)",
            MozTransform: "scaleX(0)",
            MsTransform: "scaleX(0)",
            transform: "scaleX(0)",
            WebkitTransition:
              "-webkit-transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },

          "@media (max-width: 780px)": {
            // height: "48px",

            "& p": {
              fontSize: "12px",
            },
          },
        },

        input: {
          fontSize: 13,
          color: "#FFFFFF99",
          padding: "7px 0",
          fontFamily: "'Sora', sans-serif",
          background: "transparent !important",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#FFFFFF99",
          },
          "&:-internal-autofill-selected": {
            color: "#FFFFFF99",
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          padding: "0px !important",
          backgroundColor: "#000", // Change the background color here
        },
        inputRoot: {
          minHeight: "54px",
          padding: "5px",
        },
        option: {
          color: "#fff",
          fontSize: "14px !important",
          fontWeight: "400",
          lineHeight: "18px",
          letterSpacing: "0px",
          textAlign: "left",
        },
        input: {
          width: "0",
          color: "#fff",
          fontSize: "13px !important",
          fontWeight: "400",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Sora, sans-serif",
          boxShadow: "none",
          whiteSpace: "pre",
          padding: "12px 24px",
          // fontSize: "15px",
          // fontWeight: "500",
          textTransform: "capitalize",
          borderRadius: "50px !important",
          // padding: "10px 22px",
          lineHeight: "21px",
          "@media (max-width: 780px)": {
            // padding: "10px 20px",
            padding: "10px 20px",
            fontSize: "12px",
            "& p": {
              fontSize: "12px",
            },
          },
        },

        containedSecondary: {
          color: "#FFFFFFCC",
          background: "#FFFFFF1A",
          "&:hover": {
            color: "#191D13CC",
            background:
              "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
          },
          "@media (max-width: 780px)": {
            // padding: "10px 20px",
            padding: "10px 20px",
            fontSize: "12px",
            "& p": {
              fontSize: "12px",
            },
          },
        },
        containedPrimary: {
          color: "#191D13CC",
          background:
            "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
          "&:hover": {
            color: "#FFFFFFCC",
            background: "#FFFFFF1A",
          },
        },
        outlinedPrimary: {
          border: "1px solid #81E396 !important",
          "&:hover": {
            color: "#fff",
            boxShadow: "none !important",
            backgroundColor:
              "linear-gradient(180deg, #FDA645 0%, #FF00CD 100%)",
          },
        },
        outlinedSecondary: {
          color: "#161E29",
          display: "flex",

          border: "1px solid #161E2926",
          background: "#fff",
          textTransform: "capitalize",
          "&:hover": {
            color: "#fff",
            background: "#161E29",
            border: "1px solid #161E2926",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#fff",
        },
        root: {
          borderRadius: "12px",
          // height: "49px",
          padding: "0px",
          background:
            "linear-gradient(228.52deg, rgba(21, 21, 20, 0.88) -63.21%, rgba(22, 22, 20, 0.83) 116.99%)",

          position: "relative",
          border: "1px solid rgba(39, 39, 39, 1) !important",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          outline: "0",
          background: "rgba(255, 255, 255, 0.03)",
          boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
          borderRadius: "12px",
          backdropFilter: "blur(40px)",
        },
        paper: {
          borderRadius: "12px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingLeft: "20px",
          fontSize: "12px",
          "@media (max-width: 780px)": {
            minHeight: "39px",
            "& p": {
              fontSize: "12px",
            },
            "& span": {
              fontSize: "12px",
            },
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          background: "transparent !important",
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          // padding: "0px 65px !important",
          "@media (max-width: 780px)": {
            // padding: "0px 16px !important",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none !important",
          cursor: "pointer",
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0c1719",
          color: "#fff",
          "& .MuiPickersArrowSwitcher-button": {
            // backgroundColor: "transparent !important",
            // color: "#000 !important",
          },
          "& .MuiPickersCalendarHeader-switchViewButton": {
            backgroundColor: "transparent !important",
            color: "#000 !important",
            marginLeft: "-15px !important",
          },
          "& .css-1jsy6pn-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
            {
              color: "#fff !important",
              backgroundColor: "#000 !important",
              border: "none !important",
              borderRadius: "10px !important",
            },
          "& .MuiPaper-root-MuiPickersPopper-paper": {
            background: "#000 !important",
          },
          "& .Mui-selected": {
            backgroundColor: "#88e58f !important",
            color: "#fff !important",
            border: "none !important",
            borderRadius: "10px !important",
          },
          "& .MuiPickersCalendarHeader-root": {
            paddingLeft: "30px",
          },
          "& .MuiDayCalendar-slideTransition": {
            minHeight: "210px !important",
          },
          "& .MuiPickersCalendarHeader-labelContainer": {
            fontSize: "15px",
          },
        },
      },
    },
  },
  typography: {
    ...typography.typography,
    body1: {
      color: "#fffeff", // Example typography color for body1
    },
    // Add more typography color settings as needed
  },
});

/**
 * Creates a custom theme based on the provided theme configuration.
 *
 * @param {Object} themeConfig - The configuration for the theme.
 * @param {string} themeConfig.theme - The selected theme mode.
 * @param {string} themeConfig.direction - The text direction.
 * @param {boolean} themeConfig.responsiveFontSizes - Whether to enable responsive font sizes.
 * @returns {Object} The created custom theme.
 */
export const createCustomTheme = ({
  theme: selectedTheme = "light",
  direction = "ltr",
  responsiveFontSizes = false,
} = {}) => {
  const themeOption = themesOptions.find(
    (theme) => theme.mode === selectedTheme
  );

  const baseThemeOptions = {
    direction,
  };

  const selectedThemeOptions = themeOption || themesOptions[0];

  const mergedThemeOptions = merge(
    baseOptions,
    selectedThemeOptions,
    baseThemeOptions
  );

  let theme = createTheme(mergedThemeOptions);

  if (responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
