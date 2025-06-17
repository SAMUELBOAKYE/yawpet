import React from "react";
import "./payment.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaymentStep({ method, onBack, onConfirm, cartItems, total }) {
  const getPayPalBranding = () => ({
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    color: "#003087",
    description: "Pay securely with your PayPal account.",
  });

  const { logo, color, description } = getPayPalBranding();

  return (
    <div className="payment-container">
      <div className="payment-box">
        <img src={logo} alt="PayPal logo" className="payment-logo" />
        <h2 style={{ color }}>PayPal Checkout</h2>
        <p className="description">{description}</p>

        <div className="payment-summary">
          <h4>Order Summary</h4>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <hr />
          <p>
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
        </div>

        <PayPalScriptProvider
          options={{
            "client-id":
              "AZGRUjdelPh4Sx3Z7abzMYLJIZ8EUv_y9HJ-NmHjT4CpUHiAcFW4Pr_NPV1OxdGFcVCWT--jOzx4nYEr",
          }}
        >
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "blue",
              shape: "pill",
              label: "paypal",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) =>
              actions.order.capture().then((details) => {
                console.log("✅ PayPal Success:", details);
                onConfirm();
              })
            }
            onError={(err) => {
              console.error("❌ PayPal Error:", err);
              alert("Payment failed. Please try again.");
            }}
          />
        </PayPalScriptProvider>

        <div className="payment-actions">
          <button type="button" onClick={onBack} className="back-btn">
            ← Back
          </button>
        </div>

        <div className="secure-notice">
          🔐 Your transaction is protected by PayPal’s security protocols.
          <br />✅ We do not store or access your financial details.
        </div>
      </div>
    </div>
  );
}

export default PaymentStep;
