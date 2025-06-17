// PetDetail.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PetDetail.css";

const PetDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const pet = state?.pet;
  const fromPage = state?.from;

  // Error UI if no pet is passed or from an unknown page
  if (!pet || (fromPage !== "shop" && fromPage !== "adoption")) {
    return (
      <div className="pet-detail-error">
        <h2>❌ Pet data not found or invalid source.</h2>
        <button className="back-button" onClick={() => navigate("/")}>
          🔙 Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pet-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <img src={pet.image} alt={pet.name} className="pet-detail-image" />

      <div className="pet-detail-info">
        <h2>{pet.name}</h2>
        <p>
          <strong>Type:</strong> {pet.type}
        </p>
        <p>
          <strong>Price:</strong> ${pet.price.toFixed(2)}
        </p>
        <p>
          <strong>Size:</strong> {pet.size}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {pet.rating}
        </p>
        <p>
          <strong>Description:</strong> {pet.description}
        </p>

        <p className="pet-source-note">
          This pet was viewed from the <strong>{fromPage}</strong> page.
        </p>
      </div>
    </div>
  );
};

export default PetDetail;
