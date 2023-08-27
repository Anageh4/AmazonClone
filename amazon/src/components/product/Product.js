import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Product.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import addToBasket from "../../redux/actions/addToBasket";
import { useDispatch } from "react-redux";

const Product = ({ title, price, image, rating, id }) => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(
      addToBasket({
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
        },
      })
    );
  };
  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className="product-rating">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p key={i}>
              <FontAwesomeIcon className="rate" icon={faStar} />
            </p>
          ))}
      </div>
      <img src={image} alt="product-img" />
      <button onClick={addItem}>Add to Basket</button>
    </div>
  );
};

export default Product;
