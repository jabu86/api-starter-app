import { useEffect, useState } from "react";
import CheckoutStep from "../componentes/customer/CheckoutStep";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [shippingAddress, setShippingAddress] = useState(null);
  const [checkingAddress, setCheckingAddress] = useState(true)
  
  
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

  const submitHandler = (e) => {   
     e.preventDefault();
    localStorage.setItem("payment_method", paymentMethod);
    navigate("/placeorder");
  };

  return (
    <div className="row mb-2 justify-content-center mb-5">
      <div className="col-md-12">
        <CheckoutStep step1 step2 step3 />
        <h1>Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="PayPal" className="h6">
              Select Method
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="PayPal"
              name="paymentMethod"
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="PayPal">
              PayPay or Credit Card
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
