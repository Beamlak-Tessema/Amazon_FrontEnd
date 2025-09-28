
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../API/endpoints";
import ProductCard from "../../Components/Product/ProductCard";
import Load from "../../Load/Load"
const Result = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <Load />; // show spinner while loading

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products in {category}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "20px" }}>
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


export default Result;
