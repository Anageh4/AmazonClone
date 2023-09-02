import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Payment from "./components/payment/Payment";
import Orders from "./components/orders/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51NjQ3jKSCF75xFhLWhVs0z4gEO8EENQKtbotLD2MPmxDGWCb6W9tX9cX82700OhKJ3d2YhdmoSHt2AVo3ox8Z4QY00pZzfhPbi")

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="login" Component={Login} />
          <Route path="checkout" Component={Checkout} />
          <Route path="payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
          <Route path="orders" Component={Orders} />
          <Route path="*" element={<h1>Wrong Way, Try Again!</h1>} />
        </Routes>
      </Router>
    </>
  );
}
