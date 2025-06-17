import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Home.css";
import dogBackground from "./assets/dog-background.mp4";

function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    if (!isAuthenticated) {
      alert("Please sign up or log in to access this page.");
      navigate("/signup");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="home">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={dogBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <header className="hero">
        <h1>Cat and Dog Zone</h1>
        <p>Your one-stop platform to adopt, buy, or sell pets & supplies.</p>
        <div className="hero-buttons">
          <button
            className="btn"
            onClick={() => handleProtectedNavigation("/adopt")}
          >
            Adopt a Pet
          </button>
          <button
            className="btn"
            onClick={() => handleProtectedNavigation("/shop")}
          >
            Buy Products
          </button>
          <button
            className="btn"
            onClick={() => handleProtectedNavigation("/sell")}
          >
            Sell Your Pet
          </button>
        </div>
      </header>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Safe Adoption</h3>
            <p>Choose your wish pet.</p>
          </div>
          <div className="feature-card">
            <h3>Shop Pet Essentials</h3>
            <p>Buy another pets here to.</p>
          </div>
          <div className="feature-card">
            <h3>Sell Responsibly</h3>
            <p> Fill the form and submit it .</p>
          </div>
        </div>
      </section>

      {!isAuthenticated && (
        <section className="call-to-action">
          <h2>Join Our Pet-Loving Community</h2>
          <Link to="/signup" className="btn">
            Get Started
          </Link>
        </section>
      )}
    </div>
  );
}

export default Home;
