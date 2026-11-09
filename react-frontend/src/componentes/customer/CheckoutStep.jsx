import React from "react";
import { Link } from "react-router-dom";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2">
      <div className="container-fluid justify-content-center">
        <div className="collaps nav-bar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              {step1 ? (
                <Link className="nav-link" to="/login">
                  Sign In
                </Link>
              ) : (
                <Link className="nav-link disabled" to="/login">
                  Sign In
                </Link>
              )}
            </li>
            <li className="nav-item">
              {step2 ? (
                <Link className="nav-link" to="/shipping">
                  Shipping
                </Link>
              ) : (
                <Link className="nav-link disabled" to="/shipping">
                  Shipping
                </Link>
              )}
            </li>
            <li className="nav-item">
              {step3 ? (
                <Link className="nav-link" to="/payment">
                  Payment
                </Link>
              ) : (
                <Link className="nav-link disabled" to="/payment">
                  Payment
                </Link>
              )}
            </li>
            <li className="nav-item">
              {step4 ? (
                <Link className="nav-link" to="/placeorder">
                  Place Order
                </Link>
              ) : (
                <Link className="nav-link disabled" to="/placeorder">
                  Place Order
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CheckoutStep;
