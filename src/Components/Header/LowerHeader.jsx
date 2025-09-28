
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LowerHeader.module.css";
import { FaBars } from "react-icons/fa";

const LowerHeader = () => {
  const [open, setOpen] = useState(false);
  const menuItems = [
    "All",
    "Today's Deals",
    "Customer Service",
    "Registry",
    "Gift Cards",
    "Sell",
  ];

  return (
    <div className={styles.lowerHeader}>
      {/* Always show 'All' */}
      <Link to="/" className={styles.lowerHeaderItem}>
        {menuItems[0]}
      </Link>

      {/* Toggle button for mobile */}
      <FaBars
        className={styles.lowerHeaderToggle}
        onClick={() => setOpen(!open)}
      />

      {/* Other menu items */}
      {menuItems.slice(1).map((item, index) => (
        <Link
          key={index}
          to="/result" // you can route each to a search/result page if needed
          className={styles.lowerHeaderItem}
          style={{ display: open ? "inline-block" : undefined }}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default LowerHeader;
