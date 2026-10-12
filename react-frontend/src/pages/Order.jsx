import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";

function Order() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const [order, setOrder] = useState({});
  const [checkinOrder, setCheckingOrder] = useState(true);

  console.log(order);

  const getOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.get(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setCheckingOrder(false);
        setOrder(data.order);
      }
    } catch (error) {
      console.log(error);
      console.error(
        "Failed to fetch shipping address:",
        error.response?.data || error,
      );
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (checkinOrder) {
    return <p>Checking order...</p>;
  }
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Order {order.id}</h1>
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group">
              <li className="list-group-item">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shipping_address} , {order.shipping_address_2} ,{" "}
                  {order.shipping_city}, {order.shipping_country},{" "}
                  {order.shipping_postal_code}
                </p>
                {order.is_delivered ? (
                  <div className="alert alert-success">Delivered on </div>
                ) : (
                  <div className="alert alert-danger">Not Delivered</div>
                )}
              </li>
              <li className="list-group-item">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.payment_method}
                </p>
                {order.is_paid ? (
                  <div className="alert alert-success">Paid on </div>
                ) : (
                  <div className="alert alert-danger">Not Paid</div>
                )}
              </li>
              <li className="list-group-item">
                <h2>Order Items</h2>
                {order.item.map((item) => {
                  const product = item.product;

                  const activeImage =
                    product?.images?.find((image) => image.active) ||
                    product?.images?.[0];

                  return (
                    <ul className="list-group-item" key={item.id}>
                      <li className="lis-group-item">
                        <div className="row">
                            <div className="col-md-2">
                                {activeImage && (
                                <img
                                    src={`http://localhost:8000${activeImage.image}`}
                                    alt={product?.name || "Product"}
                                    width="100"
                                />
                                )}
                            </div>
                            <div className="col-md-4">
                                <Link  to={`/shop/${product?.slug}`}>{product.name}</Link>
                            </div>
                            <div className="col-md-4">{item.quantity} X R {Number(item.price).toFixed(2)}= R {item.quantity * Number(item.price).toFixed(2)}</div>
                        </div>
                        {/* <h3>{product?.name}</h3> */}
                        {/* <p>Category: {product?.category?.name}</p>
                        <p>Brand: {product?.brand?.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Order price: </p> */}

                      </li>
                    </ul>
                  );
                })}
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card">
                <ul className="list-group">
                    <li className="list-group-item">
                        <h2>Order Summary</h2>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col">Items</div>
                            <div className="col">R {order.total}</div>
                        </div>
                        <div className="row">
                            <div className="col">Shipping</div>
                            <div className="col">R {order.shipping_price}</div>
                        </div>
                        <div className="row">
                            <div className="col">Tax</div>
                            <div className="col">R {order.tax_price}</div>
                        </div>
                        <div className="row">
                            <div className="col"><strong>Total</strong></div>
                            <div className="col">R {order.total}</div>
                        </div>
                        {/* pay order place holder */}
                    </li>
                </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
