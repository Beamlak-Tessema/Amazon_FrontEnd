
import React from "react";
import { useData } from "../../Components/DataProvider/DataProvider";
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from "../../Utility/actionType";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css"; // CSS Modules import

const Cart = () => {
  const { state, dispatch } = useData();
  const { basket } = state;
  const navigate = useNavigate();

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increaseQty = (item) => {
    dispatch({ type: ADD_TO_BASKET, item });
  };

  const decreaseQty = (id) => {
    dispatch({ type: REMOVE_FROM_BASKET, id });
  };

  const clearBasket = () => {
    dispatch({ type: "EMPTY_BASKET" });
  };

  return (
    <div className={styles.container}>
      <h2>Your Shopping Basket</h2>
      {basket.length === 0 ? (
        <div className={styles.empty}>Your basket is empty.</div>
      ) : (
        <>
          <div className={styles.basketGrid}>
            {basket.map((item) => (
              <div className={styles.basketItem} key={item.id}>
                <img
                  className={styles.image}
                  src={item.image}
                  alt={item.title}
                />
                <div className={styles.details}>
                  <h3>{item.title}</h3>
                  <p>
                    ${item.price} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className={styles.quantity}>
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <div>
              <button className={styles.checkout} onClick={clearBasket}>
                Clear Basket
              </button>
              <button
                className={styles.checkout}
                onClick={() => navigate("/payment")}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
