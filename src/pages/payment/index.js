"use client";
import { useRouter } from "next/router";
// pages/payment.js
// import PaymentIframe from '../components/PaymentIframe';

import PaymentIframe from "./PaymentIframe";

export default function PaymentPage() {
  const router = useRouter();

  console.log("routerrouter", router);

  const order = {
    amount: 1000, // Amount in smallest currency unit
    currency: "USD",
    orderReference: "ORDER123",
    customerEmail: "re-suraj@mobiloitte.com",
    firstName: "Suraj",
    lastName: "Pandey",
  };

  return (
    <div>
      <h1>Complete Your Payment</h1>
      <PaymentIframe order={order} />
    </div>
  );
}
