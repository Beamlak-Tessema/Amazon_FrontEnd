// src/Components/Load/Load.jsx
import React from "react";
import { FadeLoader } from "react-spinners"; // import fade spinner
import styles from "./Load.module.css";

const Load = () => {
  return (
    <div className={styles.overlay}>
      <FadeLoader color="#f0c14b" /> {/* Amazon yellow */}
    </div>
  );
};

export default Load;
