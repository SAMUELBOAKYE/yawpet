import React from "react";
import Checkout from "./Checkout";

const CheckoutWrapper = () => {
  const cartItems = [
    { id: 1, name: "Organic Dog Food", quantity: 2, price: 29.99 },
    { id: 2, name: "Catnip Toy", quantity: 1, price: 9.99 },
  ];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleOrder = (orderData) => {
    console.log("✅ Order placed:", orderData);
    alert("🎉 Your order has been received!");
  };

  return (
    <Checkout
      cartItems={cartItems}
      totalPrice={totalPrice}
      onPlaceOrder={handleOrder}
    />
  );
};

export default CheckoutWrapper;
