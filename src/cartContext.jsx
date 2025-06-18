import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    if (!item?.id || item.price <= 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart[item.id];
      if (existingItem) {
        return {
          ...prevCart,
          [item.id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      } else {
        return {
          ...prevCart,
          [item.id]: {
            id: item.id,
            name: item.name,
            breed: item.breed,
            image: item.image,
            price: item.price,
            quantity: 1,
          },
        };
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updated = { ...prevCart };
      delete updated[id];
      return updated;
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) => {
      const item = prevCart[id];
      if (!item) return prevCart;

      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        const updated = { ...prevCart };
        delete updated[id];
        return updated;
      }

      return {
        ...prevCart,
        [id]: {
          ...item,
          quantity: newQty,
        },
      };
    });
  };

  const clearCart = () => setCart({});

  const getTotalPrice = () => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
