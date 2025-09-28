// src/Pages/Layout/Layout.jsx
import React from "react";
import Header from "../../Components/Header/Header"; // your header
import LowerHeader from "../../Components/Header/LowerHeader";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <LowerHeader />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
