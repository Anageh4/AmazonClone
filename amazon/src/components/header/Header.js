import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import registerUser from "../../redux/actions/registerUser";

export default function Header() {
  const user = useSelector((state) => state.userReducer.user);
  const basket = useSelector((state) => state.basketReducer.basket);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(registerUser(authUser));
      } else {
        dispatch(registerUser(null));
      }
    });
  }, []);

  const handleAuth = () => {
    auth.signOut();
  };

  return (
    <div className="container-fluid header">
      <Link to="/">
        <img className="logo" src={Logo} alt="logo-img" />
      </Link>
      <div className="header-search">
        <input type="text" className="search-input" />
        <FontAwesomeIcon className="header-search-icon" lass icon={faSearch} />
      </div>
      <div className="header-nav">
        <Link to={!user && "/login"}>
          <div className="header-option" onClick={handleAuth}>
            <div className="header-option-line-one">
              Hello {user ? `${user.email}` : "Guest"}
            </div>
            <div className="header-option-line-two">
              {user ? "Sign Out" : "Sign In"}
            </div>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header-option">
            <div className="header-option-line-one">Returns</div>
            <div className="header-option-line-two">& Orders</div>
          </div>
        </Link>
        <div className="header-option">
          <div className="header-option-line-one">Your</div>
          <div className="header-option-line-two">Prime</div>
        </div>
        <Link to="/checkout">
          <div className="header-option-basket">
            <FontAwesomeIcon className="basket" icon={faBasketShopping} />
            <span className="header-option-line-two basket-count">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
