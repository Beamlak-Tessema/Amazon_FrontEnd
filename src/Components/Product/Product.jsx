// src/components/Product/Product.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Featured Products</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id} 
            title={product.title}
            image={product.image}
            price={product.price}
            rating={product.rating?.rate}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
