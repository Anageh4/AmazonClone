import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./CheckoutProduct.css";
import { useDispatch } from "react-redux";
import removeFromBasket from "../../redux/actions/removeFromBasket";

const CheckoutProduct = ({ id, image, title, price, rating, hiddenButton }) => {
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(
      removeFromBasket({
        id: id,
      })
    );
  };
  
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct-image" src={image} />
      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>
        <p className="checkoutProduct-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <FontAwesomeIcon className="rate" icon={faStar} />
              </p>
            ))}
        </div>
        {!hiddenButton && (
          <button onClick={removeItem}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
