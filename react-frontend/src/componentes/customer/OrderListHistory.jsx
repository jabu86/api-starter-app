import React from "react";
import { Link } from "react-router-dom";

function OrderListHistory({ orders }) {
  // console.log(orders);

  return (
    <>
      <h2>Order History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <Link to={`/order/${order.id}`}>{order.id}</Link>
              </td>
              <td>
                <Link to={`/order/${order.id}`}>{order.createdAt}</Link>
              </td>
              <td>R {order.total}</td>
              <td>
                {order.is_paid ? (
                  order.paid_at
                ) : (
                  <p className="text-danger">X</p>
                )}
              </td>
              <td>
                {order.is_delivered ? (
                  <p>Deliverd</p>
                ) : (
                  <p className="text-danger">X</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default OrderListHistory;
