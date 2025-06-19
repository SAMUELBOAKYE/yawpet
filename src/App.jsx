import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Home";
import AdoptionPage from "./AdoptionPage";
import SignUp from "./signUp"; // ✅ lowercase
import Login from "./login"; // ✅ lowercase
import Header from "./Header";
import Shop from "./Shop";
import CheckoutWrapper from "./CheckoutWrapper";
import PaymentRouter from "./paymentRouter"; // ✅ lowercase
import SellForm from "./sell"; // ✅ lowercase
import PetDetails from "./PetDetails";
import Footer from "./footer"; // ✅ lowercase
import Contact from "./Contact";
import PrivacyPolicy from "./privacyPolicy"; // ✅ lowercase
import TermsOfService from "./TermOfService";
import SuccessPage from "./SuccessPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/signup" replace />;
};

function App() {
  const location = useLocation();
  const showFooter =
    location.pathname === "/adopt" || location.pathname === "/sell";

  return (
    <>
      <Header />

      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/success" element={<SuccessPage />} />

        <Route
          path="/adopt"
          element={
            <PrivateRoute>
              <AdoptionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        <Route
          path="/sell"
          element={
            <PrivateRoute>
              <SellForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutWrapper />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment/:method"
          element={
            <PrivateRoute>
              <PaymentRouter />
            </PrivateRoute>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>TESLA</h2>
            </div>
          }
        />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

export default App;
