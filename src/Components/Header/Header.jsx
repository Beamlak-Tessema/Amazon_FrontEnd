
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import {
  FaSearch,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useData } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
import { signOut } from "firebase/auth";
import amazonLogo from "../../assets/amazon_Header.png";
import usFlag from "../../assets/us_flag.png";


const Header = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const languages = ["EN", "ES", "DE", "FR", "JP"];
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    "Books",
    "Electronics",
    "Clothing",
    "Toys",
    "Sports",
  ];

  const { state, dispatch } = useData();
  const navigate = useNavigate();

  const handleAuthClick = async () => {
    if (state.user) {
      // 👉 If signed in → Sign out + clear basket
      await signOut(auth);
      dispatch({ type: "SET_USER", user: null });
      dispatch({ type: "EMPTY_BASKET" });
      localStorage.removeItem("basket"); // clear persisted cart
      // stay on current page (no navigate)
    } else {
      // 👉 If guest → Go to Auth page
      navigate("/auth");
    }
  };

  return (
    <div className={styles.header}>
      {/* Logo */}
      <Link to="/">
        <img className={styles.logo} src={amazonLogo} alt="Amazon Logo" />
      </Link>

      {/* Deliver to */}
      <div className={styles.deliver}>
        <FaMapMarkerAlt className={styles.locationIcon} />
        <div className={styles.deliverText}>
          <span className={styles.deliverLineOne}>Deliver to</span>
          <span className={styles.deliverLineTwo}>Ethiopia</span>
        </div>
      </div>

      {/* Search */}
      <div className={styles.search}>
        <select
          className={styles.searchCategory}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Amazon"
        />
        <FaSearch className={styles.searchIcon} />
      </div>

      {/* Language Selector */}
      <div
        className={styles.languageContainer}
        onClick={() => setLangOpen(!langOpen)}
      >
        <img className={styles.flagStatic} src={usFlag} alt="USA Flag" />
        <div className={styles.languageSelected}>
          {selectedLang} <FaChevronDown />
        </div>
        {langOpen && (
          <div className={styles.dropdown}>
            {languages.map((lang) => (
              <div
                key={lang}
                className={styles.dropdownItem}
                onClick={() => {
                  setSelectedLang(lang);
                  setLangOpen(false);
                }}
              >
                {lang}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auth Section */}
      <div className={styles.option} onClick={handleAuthClick}>
        <span className={styles.optionLineOne}>
          Hello {state.user ? state.user.email.split("@")[0] : "Guest"}
        </span>
        <span className={styles.optionLineTwo}>
          {state.user ? "Sign Out" : "Sign In"}
        </span>
      </div>

      {/* Orders */}
      <Link to="/orders" className={styles.option}>
        <span className={styles.optionLineOne}>Returns</span>
        <span className={styles.optionLineTwo}>& Orders</span>
      </Link>

      {/* Prime */}
      <Link to="/prime" className={styles.option}>
        <span className={styles.optionLineOne}>Your</span>
        <span className={styles.optionLineTwo}>Prime</span>
      </Link>

      {/* Cart */}
      <Link to="/cart" className={styles.optionBasket}>
        <FaShoppingCart />
        <span className={styles.basketCount}>
          {state.basket.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </Link>
    </div>
  );
};

export default Header;
