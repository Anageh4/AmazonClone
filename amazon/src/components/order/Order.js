import React from "react";
import moment from "moment";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
import Currency from "currency.js"; 
import "./Order.css";

const Order = ({ order }) => {
  const orderTotal = Currency(order.data.amount * 100);

  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM DD YYYY h:mma")}</p>
      <p className="order-id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hiddenButton
        />
      ))}
      <h3 className="order-total">Order Total: {orderTotal.format()}</h3>
    </div>
  );
};

export default Order;
