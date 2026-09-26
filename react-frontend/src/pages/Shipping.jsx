import { useEffect, useState } from "react";
import axios from "axios";
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

function Shipping() {
  const [userShippingAddress, setUserShippingAddress] = useState({});
  const getUserShippingAddress = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }
      const { data } = await axios.get("/api/shipping", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

        setUserShippingAddress(data);
      
    } catch (error) {
      console.log(error);
      console.error(
        "Failed to fetch shipping address:",
        error.response?.data || error,
      );
    }
  };

  // console.log(userShippingAddress);

  const handleAddShippingAddress = (e) => {
    e.preventDefault();
    alert("adding address");
  };

  useEffect(() => {
    getUserShippingAddress();
  }, []);
  return (
    <div className="row mb-2 justify-content-center mb-5">
      <div className="col-md-8 ">
        <h1>Shipping</h1>
        <hr />
        {userShippingAddress && !userShippingAddress.hasAddress ?<div className="alert alert-danger">{userShippingAddress.message}</div>: "" }
        <form onSubmit={handleAddShippingAddress}>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address_two">Address2</label>
            <input
              type="text"
              className="form-control"
              id="address_two"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="City"
            />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              className="form-control"
              id="province"
              placeholder="Province"
            />
          </div>
          <div className="form-group">
            <label htmlFor="code">Postal Code</label>
            <input
              type="text"
              className="form-control"
              id="code"
              placeholder="Code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="code"
              placeholder="country"
            />
          </div>
          <div className="form-group text-end">
            <button type="submit" className="btn btn-primary mt-2 mb-2">
              Contuine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
