import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import noProductImage from "../assets/images/noproduct.png";
import { useAuth } from "../context/AuthContext.jsx";
function Order() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const [order, setOrder] = useState({});
  const [checkinOrder, setCheckingOrder] = useState(true);

  const { user } = useAuth();


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



  // console.log();

  useEffect(() => {
    getOrder();
  }, []);

  if (checkinOrder) {
    return (
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="col-md-12">Checking order...</div>
      </div>
    );
  }

  const markAsDelivered = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post(`/api/orders/${orderId}/mark-delivered`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        getOrder()
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        // console.log(data)
      }
    } catch (error) {
      if(error.response.status === 401 && error.response){
        toast.error(error.response.data.message);
      }
      console.error(
          "Failed to mark order as delivered:",
          error.response?.data || error,
      );
    }
  };

  const payOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        `/api/user/orders/${orderId}/pay`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        getOrder();
      }
    } catch (error) {
      console.error("Failed to pay order:", error.response?.data || error);
      if(error.response.status === 404 && error.response.data.success === false){
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Order {order.id}</h1>
        <div className="row">
          <div className="col-md-8 border shadow p-4 mb-4">
            <ul className="list-group">
              <li className="list-item border-bottom mb-2">
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
                  <div className="alert alert-success">Delivered on {order.delivered_at} </div>
                ) : (
                  <div className="alert alert-danger">Not Delivered</div>
                )}
              </li>
              <li className="list-item border-bottom mb-2">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.payment_method}
                </p>
                {order.is_paid ? (
                  <div className="alert alert-success">
                    Paid on {order.paid_at}
                  </div>
                ) : (
                  <div className="alert alert-danger">Not Paid</div>
                )}
              </li>
              <li className="list-item border-bottom mb-2">
                <h2>Order Items</h2>
                {order.item.map((item) => {
                  const product = item.product;

                  const activeImage =
                    product?.images?.find((image) => image.active) ||
                    product?.images?.[0];

                  return (
                    <ul className="list-group mb-2" key={item.id}>
                      <li className="list-item border shadow p-2 mb-2">
                        <div className="row">
                          <div className="col-md-2">
                            {activeImage ? (
                              <img
                                src={`http://localhost:8000${activeImage.image}`}
                                alt={product?.name || "Product"}
                                width="100"
                              />
                            ) : (
                              <img
                                src={noProductImage}
                                alt={product?.name || "Product"}
                                width="100"
                              />
                            )}
                          </div>
                          <div className="col-md-4 align-items-center d-flex">
                            <Link to={`/shop/${product?.slug}`}>
                              {product.name}
                            </Link>
                          </div>
                          <div className="col-md-4 align-items-center d-flex">
                            {item.quantity} X R {Number(item.price).toFixed(2)}=
                            R {item.quantity * Number(item.price).toFixed(2)}
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                })}
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card border shadow mb-4">
              <ul className="list-group">
                <li className="list-group border-bottom mb-2 p-4">
                  <h2>Order Summary</h2>
                </li>
                <li className="list-group p-4">
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
                    <div className="col">
                      <strong>Total</strong>
                    </div>
                    <div className="col">R {order.total}</div>
                  </div>
                </li>
                {!order.is_paid && (
                  <li className="list-group p-4">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={payOrder}
                    >
                      Pay Order Test
                    </button>
                  </li>
                )}
                {user &&
                    user.roles.includes("admin") &&
                    order.is_paid &&
                    order.is_delivered === false &&
                    (<li className="list-group p-4"><button className="btn btn-block btn-warning" onClick={markAsDelivered}>Mark As Delivered</button></li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
