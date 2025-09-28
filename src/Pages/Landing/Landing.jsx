// src/Pages/Landing/Landing.jsx
import React from "react";
import Carousel from "../../Components/Carasol/Carousel"; // your carousel
import Catagory from "../../Components/Catagory/Catagory";
import Product from "../../Components/Product/Product";

const Landing = () => {
  return (
    <div>
      <Carousel />
      <Catagory />
      <Product />
    </div>
  );
};

export default Landing;
