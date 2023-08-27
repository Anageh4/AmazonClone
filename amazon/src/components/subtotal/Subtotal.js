import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Currency from "currency.js";
import "./Subtotal.css";
import { getBasketTotal } from "../../redux/reducers/basket";

const Subtotal = () => {
  const basket = useSelector((state) => state.basketReducer.basket);
  const navigate = useNavigate();
  const subtotal = Currency(getBasketTotal(basket));

  return (
    <div className="subtotal">
      <p>
        Subtotal ({basket.length} items): <strong>{subtotal.format()}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
