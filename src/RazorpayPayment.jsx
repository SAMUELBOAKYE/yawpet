// src/RazorpayPayment.jsx
import React, { useEffect } from "react";

function RazorpayPayment({ amount = 4999 }) {
  useEffect(() => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: amount * 100,
      currency: "INR",
      name: "Pet Store",
      description: "Test Transaction",
      handler: function (response) {
        alert("Payment successful: " + response.razorpay_payment_id);
      },
      theme: { color: "#3399cc" },
    };
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
    document.body.appendChild(script);
  }, [amount]);

  return <p>Redirecting to Razorpay...</p>;
}

export default RazorpayPayment;
