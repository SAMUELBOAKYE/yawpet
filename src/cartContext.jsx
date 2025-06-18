import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const CartContext = createContext();

// Provider component
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

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Add a pet to the cart.
   * If already in cart, increases quantity.
   */
  const addToCart = (item) => {
    if (!item?.id || item.price <= 0) return; // 🚨 Prevent invalid entries

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

  /**
   * Remove an item completely from the cart
   */
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updated = { ...prevCart };
      delete updated[id];
      return updated;
    });
  };

  /**
   * Update quantity of an item by delta (+1, -1)
   * Removes item if quantity reaches zero or below
   */
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

  /**
   * Clear entire cart
   */
  const clearCart = () => setCart({});

  /**
   * Get total price of items in cart
   */
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
        getTotalPrice, // ✅ included
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => useContext(CartContext);
