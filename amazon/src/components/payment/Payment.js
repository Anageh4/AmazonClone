import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { React, useEffect, useState } from "react";
import Currency from "currency.js";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
import axios from "../../axios";
import "./Payment.css";
import { getBasketTotal } from "../../redux/reducers/basket";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import emptyBasket from "../../redux/actions/emptyBasket";

const Payment = () => {
  const basket = useSelector((state) => state.basketReducer.basket);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch(emptyBasket());
  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch();
        navigate("/orders", { replace: true });
      });
  };
  
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(error ? error.message : "");
  };
  const orderTotal = Currency(getBasketTotal(basket));
  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>
        {/* Delivery Address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>Alexandria, Egypt</p>
          </div>
        </div>
        {/* Review Items*/}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.item.id}
                id={item.item.id}
                title={item.item.title}
                image={item.item.image}
                price={item.item.price}
                rating={item.item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment method*/}
        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              <div className="payment-priceContainer">
                <h3>Order Total : {orderTotal.format()}</h3>
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
