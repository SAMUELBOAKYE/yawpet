import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripePayment = ({ amount = null, priceId = null }) => {
  useEffect(() => {
    const redirectToStripe = async () => {
      const stripe = await stripePromise;

      try {
        if (priceId) {
          const result = await stripe.redirectToCheckout({
            lineItems: [{ price: priceId, quantity: 1 }],
            mode: "payment",
            successUrl: `${window.location.origin}/payment-success`,
            cancelUrl: `${window.location.origin}/payment-cancel`,
          });

          if (result.error) throw result.error;
        } else if (amount) {
          const res = await fetch("/create-stripe-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
          });

          const session = await res.json();
          await stripe.redirectToCheckout({ sessionId: session.id });
        } else {
          throw new Error("Missing Stripe pricing info.");
        }
      } catch (err) {
        console.error("Stripe redirect failed:", err.message);
        alert("❌ Payment failed: " + err.message);
      }
    };

    redirectToStripe();
  }, [amount, priceId]);

  return (
    <div className="payment-loading">
      <h2>Redirecting to Stripe...</h2>
    </div>
  );
};

export default StripePayment;
