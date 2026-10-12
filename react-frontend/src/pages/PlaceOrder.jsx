import { useState, useEffect } from "react";
import CheckoutStep from "../componentes/customer/CheckoutStep";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import noProductImage from "../assets/images/noproduct.png";
import { toast } from "react-toastify";

function PlaceOrder() {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState(null);
  const [checkingAddress, setCheckingAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(() => {
    return localStorage.getItem("payment_method") || "";
  });
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const getUserShippingAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const { data } = await axios.get("/api/shipping/selected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success && data.hasAddress && data.shippingAddress) {
          setShippingAddress(data.shippingAddress);
          setCheckingAddress(false);
        } else {
          navigate("/shipping", { replace: true });
        }
      } catch (error) {
        console.log(error);
        console.error(
          "Failed to fetch shipping address:",
          error.response?.data || error,
        );
      }
    };

    getUserShippingAddress();
  }, [navigate]);

  if (checkingAddress) {
    return <p>Checking shipping address...</p>;
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );
  
  const placeOrder = async () => {
    const payload = {
      totalPrice: cartTotal,
      orderItems: cartItems,
      paymentMethod: paymentMethod,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post("/api/user/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        navigate(`/order/${data.order.id}`, { replace: true });
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        // Clear the cart after the order is successfully created
        localStorage.removeItem("cartItems");

        // Update React state if the cart is stored in component state
        setCartItems([]);
      }
    } catch (error) {
      if(error.response.status === 500 && error.response ){
         console.log(error.response.data.message);
         toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        
      }
      console.error(
        "Failed to create order:",
        error.response?.data || error,
      );
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <CheckoutStep step1 step2 step3 step4 />
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <ul className="list-group" variant="flusth">
            <li className="list-item">
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong> {shippingAddress.address},{" "}
                {shippingAddress.address_2
                  ? shippingAddress.address_2 + ","
                  : ""}{" "}
                {shippingAddress.city}, {shippingAddress.province},{" "}
                {shippingAddress.country}, {shippingAddress.postal_code}
              </p>
            </li>
            <li className="list-item">
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </li>
            <li className="list-item">
              <h2>Order Items</h2>
              <ul className="list-group">
                {cartItems.map((item) => {
                  const activeImage = item.images?.find(
                    (image) => image.active === true,
                  );

                  return (
                    <li key={item.id} className="list-group-item">
                      <div className="row">
                        <div className="col-md-2">
                          {activeImage ? (
                            <img
                              src={`http://localhost:8000${activeImage.thumbnail}`}
                              className="cart-img fluid rounded"
                              alt={item.name}
                              width={100}
                              height={100}
                            />
                          ) : (
                            <img
                              src={noProductImage}
                              className="card-img"
                              alt="No product"
                              width={50}
                              height={50}
                            />
                          )}
                        </div>
                        <div className="col-md-6">
                          <Link className="btn-link" to={`/shop/${item.slug}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="col-md-4">
                          {item.quantity} X R {item.price} = R{" "}
                          {item.quantity * item.price}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <ul className="list-group-item py-2 p-2">
              <li className="list-item ">
                <h2>Cart Summary</h2>
              </li>
              <li className="list-item">
                <div className="row">
                  <div className="col">Items:</div>
                  <div className="col">R price</div>
                </div>
              </li>
              <li className="list-item">
                <div className="row">
                  <div className="col">Shipping:</div>
                  <div className="col">R shipping</div>
                </div>
              </li>
              <li className="list-item">
                <div className="row">
                  <div className="col">Tax:</div>
                  <div className="col">R tax</div>
                </div>
              </li>
              <li className="list-item">
                <div className="row">
                  <div className="col">Total:</div>
                  <div className="col">
                    R <strong>{cartTotal.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li className="list-item">
                <div className="row m-0 mt-2">
                  <button className="btn btn-primary" onClick={placeOrder}>
                    Place Order
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaceOrder;
