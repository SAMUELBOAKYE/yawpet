import React from "react";
import { useParams } from "react-router-dom";
import PayPalPayment from "./PayPalPayment";
import StripePayment from "./StripePayment";
import RazorpayPayment from "./RazorpayPayment";

const PaymentRouter = () => {
  const { method } = useParams();
  const amount = 49.99;

  if (method === "paypal") return <PayPalPayment amount={amount} />;
  if (method === "stripe") return <StripePayment amount={amount} />;
  if (method === "razorpay") return <RazorpayPayment amount={amount} />;

  return <div>Unsupported payment method: {method}</div>;
};

export default PaymentRouter;
