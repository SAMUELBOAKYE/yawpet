import React, { useState } from "react";
import "./AdoptionPage.css";
import { useCart } from "./cartContext";

// ✅ Pet images
import myCat from "./assets/British Shorthair.jpg";
import myCat1 from "./assets/Bengal.jpg";
import myCat2 from "./assets/Ragdoll.jpg";
import myCat3 from "./assets/Siamese.jpg";
import myCat4 from "./assets/Maine Coon.jpg";
import myCat5 from "./assets/Persian.jpg";
import myDog from "./assets/Beagle.jpg";
import myDog1 from "./assets/Bulldog.jpg";
import myDog2 from "./assets/Poodle.jpg";
import myDog3 from "./assets/Golden Retriever.jpg";
import myDog5 from "./assets/German Shepherd.jpg";
import myDog6 from "./assets/Labrador Retriever.jpg";

// ✅ Sample pets data
const samplePets = [
  /* unchanged pet array */ // your original samplePets list here
  {
    id: 1,
    name: "British Shorthair",
    age: "1 years",
    breed: "Dense",
    species: "Cat",
    location: "United Kingdom",
    vaccinated: true,
    size: "Medium",
    health: "Healthy",
    image: myCat,
    price: 20,
  },

  {
    id: 2,
    name: "Bengal",
    age: "1.5 year",
    breed: "Persian Cat",
    species: "Cat",
    location: "United States",
    vaccinated: false,
    size: "Large",
    health: "Healthy",
    image: myCat1,
    price: 25,
  },
  {
    id: 3,
    name: "Ragdoll",
    age: "1 years",
    breed: "Siberian Cat",
    species: "Cat",
    location: "United States",
    vaccinated: true,
    size: "Medium",
    health: "Healthy",
    image: myCat2,
    price: 30,
  },
  {
    id: 4,
    name: "Siamese",
    age: "2 months",
    breed: "Thai Cat",
    species: "Cat",
    location: "Thailand",
    vaccinated: false,
    size: "Small",
    health: "Healthy",
    image: myCat3,
    price: 15,
  },
  {
    id: 5,
    name: "Maine Coon",
    age: "1.5 years",
    breed: "British Shorthair",
    species: "Cat",
    location: "United States",
    vaccinated: true,
    size: "Large",
    health: "Healthy",
    image: myCat4,
    price: 35,
  },
  {
    id: 6,
    name: "Persian",
    age: "1 years",
    breed: "White Cat",
    species: "Cat",
    location: "Iran",
    vaccinated: false,
    health: "Needs attention",
    image: myCat5,
    price: 40,
  },
  {
    id: 7,
    name: "Beagle",
    age: "1 year",
    breed: "Beagle",
    species: "Dog",
    location: "England",
    vaccinated: true,
    health: "Healthy",
    image: myDog,
    price: 200,
  },
  {
    id: 8,
    name: "Bulldog",
    age: "2 years",
    breed: "Piebald",
    species: "Dog",
    location: "England",
    vaccinated: false,
    health: "Needs attention",
    size: "Large",
    image: myDog1,
    price: 250,
  },
  {
    id: 9,
    name: "Poodle",
    age: "1 year",
    breed: "Thick",
    species: "Dog",
    location: "Germany",
    vaccinated: true,
    health: "Healthy",
    image: myDog2,
    price: 300,
  },
  {
    id: 10,
    name: "Golden Retriever",
    age: "2 years",
    breed: "Golden",
    species: "Dog",
    location: "Scotland",
    vaccinated: true,
    health: "Healthy",
    image: myDog3,
    price: 400,
  },
  {
    id: 11,
    name: "German Shepherd",
    age: "2.5 years",
    breed: "Herding",
    species: "Dog",
    location: "Germany",
    vaccinated: false,
    health: "Needs attention",
    image: myDog5,
    price: 350,
  },
  {
    id: 12,
    name: "Labrador Retriever",
    age: "2 years",
    breed: "Gun Dog",
    species: "Dog",
    location: "Canada",
    vaccinated: true,
    health: "Healthy",
    image: myDog6,
    price: 280,
  },
];

function AdoptionPage() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    option: "appointment",
    terms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "e2158152-919f-402f-8674-9aa76afdc614", // 🔑 Replace this
          subject: `Adoption Request for ${selectedPet.name}`,
          name: formData.name,
          email: formData.email,
          message: `Adoption request for ${selectedPet.name} (${selectedPet.species}, ${selectedPet.breed}) via ${formData.option}.`,
        }),
      });

      if (res.ok) {
        alert(`Adoption request submitted for ${selectedPet.name}!`);
      } else {
        alert("Failed to submit adoption form. Please try again.");
      }
    } catch (error) {
      console.error("Web3Forms error:", error);
      alert("Something went wrong.");
    }

    setSelectedPet(null);
    setFormData({
      name: "",
      email: "",
      option: "appointment",
      terms: false,
    });
  };

  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="adoption-page">
      <button
        className="view-cart-toggle"
        onClick={() => setShowCart(!showCart)}
      >
        🛒 View Cart ({Object.keys(cart).length})
      </button>

      {showCart && (
        <div className="cart-modal">
          <h2>Your Cart</h2>
          {Object.keys(cart).length === 0 ? (
            <p>No pets in your cart.</p>
          ) : (
            <ul>
              {Object.values(cart).map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <p>Breed: {item.breed}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {Object.keys(cart).length > 0 && (
            <p className="total-amount">Total: ${totalAmount.toFixed(2)}</p>
          )}
          <button className="close-cart" onClick={() => setShowCart(false)}>
            Close Cart
          </button>
        </div>
      )}

      <div className="pet-catalog">
        {samplePets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <img src={pet.image} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>
            <p>Vaccinated: {pet.vaccinated ? "Yes" : "No"}</p>
            <p>Health: {pet.health}</p>
            <p className="pet-price">Price: ${pet.price}</p>

            <button
              className="adopt-now-btn"
              onClick={() => setSelectedPet(pet)}
            >
              ❤️ Adopt Now
            </button>
            <button
              className={`cart-btn ${
                cart[pet.id]?.quantity >= 2 ? "cart-twice" : ""
              }`}
              onClick={() => addToCart(pet)}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>

      {selectedPet && (
        <form className="adoption-form" onSubmit={handleSubmit}>
          <h2>Adopt {selectedPet.name}</h2>

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label htmlFor="option">Option:</label>
          <select
            id="option"
            value={formData.option}
            onChange={(e) =>
              setFormData({ ...formData, option: e.target.value })
            }
          >
            <option value="appointment">In-Person Appointment</option>
            <option value="delivery">Home Delivery</option>
          </select>

          <label>
            <input
              type="checkbox"
              checked={formData.terms}
              required
              onChange={(e) =>
                setFormData({ ...formData, terms: e.target.checked })
              }
            />
            I agree to the terms and conditions
          </label>

          <button type="submit">Submit Adoption</button>
        </form>
      )}
    </div>
  );
}

export default AdoptionPage;
