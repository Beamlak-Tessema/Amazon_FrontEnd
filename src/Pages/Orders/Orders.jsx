import React, { useEffect, useState } from "react";
import { useData } from "../../Components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import styles from "./Orders.module.css";

const Orders = () => {
  const { state } = useData();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (state.user) {
        const ordersRef = collection(db, "users", state.user.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));
        const snapshot = await getDocs(q);

        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      }
    };

    fetchOrders();
  }, [state.user]);

  return (
    <div className={styles.orders}>
      <h1>Your Orders</h1>
      <hr />
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className={styles.order}>
            <h3>Order ID: {order.id}</h3>
            <p>Total: ${order.amount / 100}</p>
            <p>Date: {new Date(order.created * 1000).toLocaleString()}</p>
            <div className={styles.items}>
              {order.basket?.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
