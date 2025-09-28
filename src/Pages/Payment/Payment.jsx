

import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useData } from "../../Components/DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { CLEAR_BASKET } from "../../Utility/actionType";
import styles from "./Payment.module.css";

const Payment = () => {
  const { state, dispatch } = useData();
  const { basket, user } = state;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = basket.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(sum);
  }, [basket]);

  // Dummy delivery address (can be replaced with user profile)
  const address = {
    name: user?.email || "Guest",
    street: "123 React Street",
    city: "Addis Ababa",
    zip: "1000",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // Simulated paymentIntent (backend not added yet)
      const paymentIntent = {
        id: `pi_${new Date().getTime()}`,
        amount: total * 100,
        created: Math.floor(Date.now() / 1000), // seconds
      };

      // Save order in Firestore under user
      if (user?.uid) {
        await setDoc(
          doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
          {
            basket,
            amount: total,
            created: paymentIntent.created,
          }
        );
      }

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      // Empty basket
      dispatch({ type: CLEAR_BASKET });

      // Redirect to Orders
      navigate("/orders");
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <div className={styles.paymentPage}>
      <div className={styles.header}>
        <h1>
          Checkout (<span>{basket.length}</span> items)
        </h1>
      </div>

      {/* Delivery section */}
      <div className={styles.section}>
        <div className={styles.title}>
          <h3>Delivery Address</h3>
        </div>
        <div className={styles.address}>
          <p>{address.name}</p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.zip}
          </p>
        </div>
      </div>
      <hr />

      {/* Items section */}
      <div className={styles.section}>
        <div className={styles.title}>
          <h3>Review items and delivery</h3>
        </div>
        <div className={styles.items}>
          {basket.map((item, i) => (
            <div className={styles.product} key={i}>
              <img src={item.image} alt={item.title} />
              <div className={styles.productInfo}>
                <p>{item.title}</p>
                <p className={styles.price}>
                  <small>$</small>
                  <strong>{item.price}</strong>
                </p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />

      {/* Payment section */}
      <div className={styles.section}>
        <div className={styles.title}>
          <h3>Payment Method</h3>
        </div>
        <div className={styles.details}>
          <h3>Total to Pay: ${total.toFixed(2)}</h3>
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
            <button
              disabled={processing || succeeded || !stripe}
              className={styles.payButton}
            >
              {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </button>
            {error && <div className={styles.error}>{error}</div>}
            {succeeded && (
              <div className={styles.success}>
                Payment succeeded ✅ Thank you for your order!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
