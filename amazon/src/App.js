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

export default function App() {
  const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
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
          <Route path="*" element={<h1>WRONG!</h1>} />
        </Routes>
      </Router>
    </>
  );
}
