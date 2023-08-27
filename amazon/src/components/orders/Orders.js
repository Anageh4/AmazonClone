import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import Order from "../order/Order";
import "./Orders.css";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders");
      const orderRef = query(collRef, orderBy("created", "desc"));
      onSnapshot(orderRef, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders-order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;