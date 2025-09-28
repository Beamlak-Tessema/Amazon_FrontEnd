
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Landing from "./Pages/Landing/Landing";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Result from "./Pages/Result/Result";
import Auth from "./Pages/Auth/Auth";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//  Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51SBGfjF9yZ3pOz3VZnsAEqSwH16uQhWClBxwFydBxmREeHFKCk1G7fiH8znpaKKyGiPusIe4L4HHqPwQEsjim9DG00pWaKoKfl"
);

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Landing />
          </Layout>
        }
      />
      <Route
        path="/Auth"
        element={
          <Layout>
            <Auth />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      {/* <Route
        path="/orders"
        element={
          <Layout>
            <Orders />
          </Layout>
        }
      /> */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Layout>
              <Orders />
            </Layout>
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/payment"
        element={
          <Layout>
            
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </Layout>
        }
      /> */}
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Layout>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Layout>
            <ProductDetail />
          </Layout>
        }
      />
      <Route
        path="/result/:category"
        element={
          <Layout>
            <Result />
          </Layout>
        }
      />
    </Routes>
  );
};

export default Router;
