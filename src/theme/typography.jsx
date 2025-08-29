import { letterSpacing, lineHeight } from "@mui/system";
export const typography = {
  typography: {
    h1: {
      fontWeight: 400,
      fontSize: 44,
      lineHeight: "60px",
      fontFamily: "'Righteous', cursive",
      "@media(max-width:1024px)": {
        fontSize: "38px !important",
      },
      "@media(max-width:767px)": {
        fontSize: "26px !important",
        lineHeight: "40px",
      },
    },
    h2: {
      fontFamily: "'Righteous', cursive",
      fontWeight: 400,
      fontSize: 42,
      wordBreak: "break-word",
      lineHeight: "60px",
      "@media(max-width:767px)": {
        fontSize: "22px !important",
        lineHeight: "35px",
      },
    },
    h3: {
      fontFamily: "'Sora', sans-serif",
      fontWeight: 400,
      fontSize: 37,
      color: "#161E29",

      "@media(max-width:767px)": {
        fontSize: "18px !important",
      },
    },
    h4: {
      fontFamily: "'Sora', sans-serif",
      fontWeight: 600,
      fontSize: 32,
      "@media(max-width:767px)": {
        fontSize: "18px !important",
      },
    },
    h5: {
      fontFamily: "'Sora', sans-serif",
      fontWeight: 700,
      fontSize: 22,
      lineHeight: "35px",
      "@media(max-width:767px)": {
        fontSize: "15px !important",
        lineHeight: "25px",
      },
    },
    h6: {
      fontFamily: "'Sora', sans-serif",
      fontWeight: 500,
      fontSize: 18,
      "@media(max-width:767px)": {
        fontSize: "14px !important",
      },
    },
    button: {
      textTransform: "capitalize",
      borderRadius: 27,
      fontFamily: "'Sora', sans-serif",
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: "24px",
      fontFamily: "'Sora', sans-serif",
      letterSpacing: "0.62px",
      "@media(max-width:767px)": {
        fontSize: "12px",
      },
    },
    body1: {
      fontWeight: 300,
      fontSize: 12,
      fontFamily: "'Sora', sans-serif",
    },
    subTitle1: {
      fontFamily: "'Sora', sans-serif",
      fontWeight: 300,
      fontSize: 12,
      lineHeight: "21px",
    },
  },
};
