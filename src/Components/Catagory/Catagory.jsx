// src/components/Category/Category.jsx
import React from "react";
import categories from "./CatagoryInfo";
import CategoryCard from "./CatagoryCard";
import styles from "./Catagory.module.css";

const Category = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.title}
            image={cat.image}
            api={cat.api}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
