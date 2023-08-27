import React from "react";
import checkoutImg from "../../assets/checkoutAd.jpg";
import { useSelector } from "react-redux";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
import "./Checkout.css";
import Subtotal from "../subtotal/Subtotal";

const Checkout = () => {
  const user = useSelector((state) => state.userReducer.user);
  const basket = useSelector((state) => state.basketReducer.basket);
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="checkout-ad" src={checkoutImg} />
        <div>
          <h3>Hello, {user ? `${user.email}` : "Guest"}</h3>
          <h2 className="checkout-title">Your shopping Basket</h2>
          {basket.length > 0 ? (
            basket.map((product) => (
              <CheckoutProduct
                key={product.item.id}
                id={product.item.id}
                title={product.item.title}
                image={product.item.image}
                price={product.item.price}
                rating={product.item.rating}
              />
            ))
          ) : (
            <p>
              You have no items in your basket.To buy one or more
              items,click"Add to basket".
            </p>
          )}
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
