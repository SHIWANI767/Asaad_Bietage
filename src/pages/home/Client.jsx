"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const clientData = [
  {
    image: "/images/client/client1.svg",
  },
  {
    image: "/images/client/client2.1.svg",
  },
  {
    image: "/images/client/client3.svg",
  },
  {
    image: "/images/client/client4.svg",
  },
  {
    image: "/images/client/client5.svg",
  },
  {
    image: "/images/client/client6.svg",
  },

  {
    image: "/images/client/client7.svg",
  },
  {
    image: "/images/client/client8.svg",
  },
  {
    image: "/images/client/client8.svg",
  },
  {
    image: "/images/client/client9.svg",
  },
  {
    image: "/images/client/client10.svg",
  },
  {
    image: "/images/client/client1.svg",
  },
  {
    image: "/images/client/client9.svg",
  },
  {
    image: "/images/client/client5.svg",
  },
  {
    image: "/images/client/client2.1.svg",
  },
];
export default function Client() {
  return (
    <Box className="clientBox">
      <Marquee>
        <Box className="displaySpacebetween" mt={9} style={{ gap: "20px" }}>
          {clientData.map((data, i) => (
            <Image
              src={data.image}
              height={52}
              width={52}
              quality={100}
              alt=""
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />
          ))}
        </Box>
      </Marquee>
      <Box align="center" mt={3}>
        <Typography variant="body2" color="#191D1399" mb={1}>
          TRUSTED BY THOUSANDS OF TRADERS FROM MAJOR CRYPTO EXCHANGES
        </Typography>
      </Box>
    </Box>
  );
}
