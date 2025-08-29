import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, Button, Collapse, ListItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { styled } from "@mui/system"; // Import styled from @mui/system
import { useRouter } from "next/router";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "block",
  paddingTop: 0,
  paddingBottom: 0,
  [theme.breakpoints.up("md")]: {
    // display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.secondary,
    transition: "color 0.3s",
  },
}));

const StyledButton = styled(Button)(({ theme, open }) => ({
  color: open ? "#fff" : "#000",
  textTransform: "none",
  letterSpacing: 0,
  width: "100%",
  fontSize: "14px",
  padding: "14px",
  fontWeight: 400,
  justifyContent: "flex-start",
  marginBottom: "5px",
  // marginLeft: "16px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0px",
    fontSize: "12px",
  },
  // "@media(min-width: 900px)": {
  //   marginLeft: "0px",
  // },
  "&:hover": {
    color: "rgba(129, 227, 150, 1)",
    backgroundColor: "transparent",
    "& $icon": {
      color: "rgba(129, 227, 150, 1)",
    },
    "& span": {
      color: theme.palette.text.secondary,
      justifyContent: "center",
    },
  },
  "& svg": {
    color: open ? "rgba(129, 227, 150, 1)" : "",

    marginRight: "6px",
  },
  "&.Mui-disabled": {
    color: "#fff !important",
  },
  "&:hover, &.active": {
    color: "rgba(129, 227, 150, 1)",
    backgroundColor: "transparent",
    "& svg": {
      color: "rgba(129, 227, 150, 1)",
    },
    "& span": {
      color: theme.palette.text.secondary,
      justifyContent: "center",
    },
  },
}));

const StyledButtonLeaf = styled(Button)(({ theme, open }) => ({
  color: theme.palette.text.secondary,
  justifyContent: "center",
  textTransform: "none",
  letterSpacing: 0,
  width: "100%",
  marginBottom: "5px",
  borderRadius: 0,
  opacity: 1,
  fontSize: "14px",
  fontWeight: 500,
  pointerEvents: open ? "none" : "",
  display: "flex",
  alignItems: "center",
  padding: "14px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
  "& svg": {
    marginRight: "6px",
  },
  "&.Mui-disabled": {
    color: "#fff !important",
  },
  "&:hover, &.active": {
    // color: "rgba(129, 227, 150, 1)",
    color: "#000 !important",
    background: "linear-gradient(90.73deg, #86E591 2.09%, #B9F65B 34.92%)",
    borderRadius: "15px !important",
    "& svg": {
      color: "#000 !important",
    },
    "& span": {
      color: "#000 !important",
      justifyContent: "center",
    },
  },
  "& li": {
    "& $title": {
      marginLeft: "30px",
    },
  },
  "&.depth-0": {
    "& $title": {
      fontWeight: 400,
      fontSize: "14px",
      whiteSpace: "pre",
    },
  },
}));

const StyledIcon = styled("span")(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StyledTitle = styled("span")(({ theme, open }) => ({
  marginRight: "auto",
  color: theme.palette.text.secondary,
  wordBreak: "break-word",
  lineHeight: "normal",
  fontWeight: "400",
  fontSize: "13px",
}));

const StyledCollapse = styled(Collapse)({
  margin: "0 27px",
  // border: "1px solid #474b47",
});

const NavItem = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProp,
  title,
  tabview,
  setSelectedTab,
  onMobileClose,
  ...rest
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(openProp);

  useEffect(() => {
    if (tabview === "Sniper") {
      setSelectedTab(tabview);
    }
  }, [tabview]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const isActive = router.asPath === href;
  function isGettingQuantum(value) {
    const regex = /quantum/;
    if (regex.test(value)) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  useEffect(() => {
    if (isGettingQuantum(router.route)) {
      setOpen(true);
    } else setOpen(false);
  }, [router.route]);
  if (children) {
    return (
      <StyledListItem
        className={clsx(className)}
        disableGutters
        key={title}
        {...rest}
      >
        <StyledButton open={open} onClick={handleToggle}>
          {" "}
          <Box className="displayStart">
            {Icon && <StyledIcon open={open}>{<Icon size="20" />}</StyledIcon>}
            <StyledTitle open={open}>{title}</StyledTitle>
          </Box>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledButton>
        <StyledCollapse in={open}>{children}</StyledCollapse>
      </StyledListItem>
    );
  }

  return (
    <StyledListItem
      className={clsx(className)}
      disableGutters
      key={title}
      {...rest}
    >
      <StyledButtonLeaf
        className={clsx(`depth-${depth}`, isActive && "active")}
        onClick={() => {
          if (!isActive) {
            onMobileClose();
            router.push(href);
          }
        }}
        open={isActive}
        exact
      >
        {Icon && <StyledIcon>{<Icon size="20" />}</StyledIcon>}
        <StyledTitle open={false}>{title}</StyledTitle>
        {Info && <Info />}
      </StyledButtonLeaf>
    </StyledListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
