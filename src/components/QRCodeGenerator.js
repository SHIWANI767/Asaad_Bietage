"use client";
import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ qrCodeText }) => {
  return <QRCode value={qrCodeText} />;
};

export default QRCodeGenerator;
