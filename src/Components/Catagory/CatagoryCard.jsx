
import React from "react";
import { Link } from "react-router-dom";
import styles from "./CatagoryCard.module.css";

const CategoryCard = ({ title, image, api }) => {
  return (
    <Link to={`/result/${api}`} className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.button}>Shop now</button>
    </Link>
  );
};

export default CategoryCard;
