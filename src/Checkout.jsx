import React, { useState } from "react";
import "./checkout.css";
import PaymentStep from "./paymentStep";

function Checkout({ cartItems, totalPrice, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    shipping: "standard",
    payment: "cod",
    coupon: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showPaymentStep, setShowPaymentStep] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (form.payment === "cod") {
      setSubmitted(true);
      onPlaceOrder(form);

      // ✅ Send Order Details to Web3Forms
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "e2158152-919f-402f-8674-9aa76afdc614",
          subject: "🐾 New Pet Shop Order (Cash on Delivery)",
          name: form.name,
          email: form.email,
          message: `
Order Details:
---------------------
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Address: ${form.address}
Shipping: ${form.shipping}
Payment Method: ${form.payment}
Coupon Used: ${form.coupon || "N/A"}
Total: $${totalPrice.toFixed(2)}

🛒 Items:
${cartItems
  .map(
    (item) =>
      `- ${item.name} × ${item.quantity} = $${(
        item.price * item.quantity
      ).toFixed(2)}`
  )
  .join("\n")}
          `,
        }),
      });
    } else {
      setShowPaymentStep(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setShowPaymentStep(false);
  };

  const handleConfirmPayment = () => {
    setSubmitted(true);
    onPlaceOrder(form);
  };

  if (submitted) {
    return (
      <div className="checkout-confirmation">
        <h2>🎉 Thank you for your order!</h2>
        <p>
          A confirmation has been sent to <strong>{form.email}</strong>.
        </p>
      </div>
    );
  }

  if (
    showPaymentStep &&
    ["paypal", "stripe", "razorpay"].includes(form.payment)
  ) {
    return (
      <PaymentStep
        method={form.payment}
        user={form}
        cartItems={cartItems}
        total={totalPrice}
        onBack={handleBack}
        onConfirm={handleConfirmPayment}
      />
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="boakyesamuel@gmail.com"
          />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="tel...."
          />
        </div>
        <div className="input-group">
          <label>Address</label>
          <textarea
            name="address"
            required
            value={form.address}
            onChange={handleChange}
            placeholder="Where do you want to receive your order?"
          ></textarea>
        </div>
        <div className="input-group">
          <label>Shipping Method</label>
          <select name="shipping" value={form.shipping} onChange={handleChange}>
            <option value="standard">Standard (3-5 days)</option>
            <option value="express">Express (1-2 days)</option>
          </select>
        </div>
        <div className="input-group">
          <label>Payment Method</label>
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option value="cod">Cash on Delivery</option>
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="razorpay">Razorpay</option>
          </select>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>

        <button type="submit" className="place-order-btn">
          {form.payment === "cod" ? "Place Order" : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
