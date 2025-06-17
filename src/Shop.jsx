// Shop.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";
import Checkout from "./Checkout";
import catA from "./assets/ussian Blue.jpg";
import catB from "./assets/Scottish Fold.jpg";
import catC from "./assets/Abyssinian.jpg";
import catD from "./assets/Sphynx.jpg";
import dogA from "./assets/Boxer.jpg";
import dogB from "./assets/Chihuahua.jpg";
import dogC from "./assets/Siberian Husky.jpg";
import dogD from "./assets/Yorkshire Terrier.jpg";
import "./shop.css";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "ussian",
    price: 29.99,
    type: "Cat",
    rating: 4.5,
    size: "very large",
    image: catA,
    description: "Traditionally used to guard livestock.",
  },
  {
    id: 2,
    name: "Scottish Fold",
    price: 35.99,
    type: "Cat",
    rating: 4.2,
    size: "medium",
    image: catB,
    description: "They have soft voices and aren’t overly vocal.",
  },
  {
    id: 3,
    name: "Abyssinian",
    price: 19.99,
    type: "Cat",
    rating: 4.2,
    size: "short",
    image: catC,
    description: "Often called the 'gymnast' of the cat world.",
  },
  {
    id: 4,
    name: "Sphynx",
    price: 24.99,
    type: "Cat",
    rating: 4.2,
    size: "medium",
    image: catD,
    description: "Loves to cuddle, greets at the door.",
  },
  {
    id: 5,
    name: "Boxer",
    price: 45.99,
    type: "Dog",
    rating: 4.2,
    size: "medium",
    image: dogA,
    description: "Intelligent, responds best to positive reinforcement.",
  },
  {
    id: 6,
    name: "Chihuahua",
    price: 40.99,
    type: "Dog",
    rating: 4.2,
    size: "medium",
    image: dogB,
    description: "Keep your dog entertained and active for hours.",
  },
  {
    id: 7,
    name: "Siberian Husky",
    price: 30,
    type: "Dog",
    rating: 4.2,
    size: "large",
    image: dogC,
    description: "Keep your dog entertained and active for hours.",
  },
  {
    id: 8,
    name: "Yorkshire Terrier",
    price: 20,
    type: "Dog",
    rating: 4.2,
    size: "small",
    image: dogD,
    description: "Keep your dog entertained and active for hours.",
  },
];

const ProductCard = ({ product, onAddToCart, onView }) => (
  <motion.div
    className="product-card"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={product.image} alt={product.name} className="product-image" />
    <h4>{product.name}</h4>
    <p>${product.price.toFixed(2)}</p>
    <div className="product-buttons">
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      <button onClick={() => onView(product)}>View</button>
    </div>
  </motion.div>
);

const Shop = () => {
  const [filter, setFilter] = useState({ type: "All", sort: "none" });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);

  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleViewPet = (pet) => {
    navigate(`/pet/${pet.id}`, { state: { pet, from: "shop" } });
  };

  const filteredProducts = products
    .filter((p) => filter.type === "All" || p.type === filter.type)
    .sort((a, b) => {
      if (filter.sort === "price-asc") return a.price - b.price;
      if (filter.sort === "price-desc") return b.price - a.price;
      if (filter.sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const totalCartPrice = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartItems = Object.values(cart);

  return (
    <main className="shop-container">
      <header className="shop-header">
        <h2>Pet Shop</h2>
        <button className="cart-icon" onClick={() => setShowCart(!showCart)}>
          🛒 {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        </button>
      </header>

      {!isCheckingOut && (
        <>
          <section className="filters">
            <label>
              Filter:
              <select
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              >
                <option value="All">All</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </label>
            <label>
              Sort:
              <select
                value={filter.sort}
                onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
              >
                <option value="none">None</option>
                <option value="price-asc">Price Low to High</option>
                <option value="price-desc">Price High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </section>

          <section className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onView={handleViewPet}
              />
            ))}
          </section>
        </>
      )}

      {isCheckingOut && (
        <Checkout
          cartItems={cartItems}
          totalPrice={totalCartPrice}
          onPlaceOrder={(formData) => {
            clearCart();
            setIsCheckingOut(false);
            toast.success("🎉 Order placed successfully!");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      <AnimatePresence>
        {showCart && !isCheckingOut && (
          <motion.div
            className="cart-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div style={{ height: "100px" }} />
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="cart-total">
                  <strong>Total:</strong> ${totalCartPrice.toFixed(2)}
                </div>
                <button
                  className="checkout-btn"
                  onClick={() => {
                    setShowCart(false);
                    setIsCheckingOut(true);
                    setTimeout(
                      () => window.scrollTo({ top: 0, behavior: "smooth" }),
                      100
                    );
                  }}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Shop;
