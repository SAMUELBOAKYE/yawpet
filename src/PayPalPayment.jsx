import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalPayment({ amount = 49.99 }) {
  const clientID =
    import.meta.env.VITE_PAYPAL_CLIENT_ID ||
    process.env.VITE_APP_PAYPAL_CLIENT_ID;

  if (!clientID) {
    return (
      <p style={{ color: "red" }}>❌ PayPal Client ID not found in .env file</p>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": clientID }}>
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Pay with PayPal</h2>
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "pill",
            color: "blue",
            label: "paypal",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: amount.toFixed(2) },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(
                `✅ Transaction completed by ${details.payer.name.given_name}`
              );
            });
          }}
          onError={(err) => {
            console.error("❌ PayPal Error:", err);
            alert("Payment failed. Please try again.");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;
