import React, { useEffect, useState } from "react";
import noProductImage from "../assets/images/noproduct.png";
import { Link } from "react-router-dom";
import Cart from '../componentes/customer/Cart'
import { useNavigate } from "react-router-dom";

export const CartItem = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const navigate = useNavigate();

  // Save cart changes to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
      if(cartItems.length === 0){
        navigate("/shop")
      }
  }, [cartItems , navigate]);

  // Update the quantity of one specific product
  const handleQuantityChange = (id, value) => {
    const quantity = Number(value);

    if (!Number.isFinite(quantity) || quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  // Remove a product from the cart
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity || 0),
    0,
  );

  return (
    <div className="row">
        <h2>Shopping Cart</h2>
      <div className="col-md-9">

        {cartItems.length === 0 ? (
          <p className="h4">No products in the cart</p>
        ) : (
          cartItems.map((cart) => {
            // Get the active image, or fall back to the first image
            const activeImage =
              cart.images?.find((img) => img.active === true) ||
              cart.images?.[0];

            return (
              <div className="row mb-4 border shadow m-1" key={cart.id}>
                <div className="col-md-2 mt-4 mb-2">
                 <Link to={`/shop/${cart.slug}`}>
                  <img
                    src={
                      activeImage
                        ? `http://localhost:8000${activeImage.image}`
                        : noProductImage
                    }
                    alt={cart.name}
                    className="img-fluid"
                  />
                 </Link>
                </div>

                <div className="col-md-7 mt-4 mb-2">
                  <h2>{cart.name}</h2>
                  <p>{cart.description}</p>
                  <p>
                    <strong>R {Number(cart.price).toFixed(2)}</strong>
                  </p>

                  <p>
                    Subtotal: R{" "}
                    <strong>
                      {(
                        Number(cart.price) * Number(cart.quantity || 0)
                      ).toFixed(2)}
                    </strong>
                  </p>
                </div>
                <hr />

                <div className="col-md-12 mb-4 text-end">
                  <label htmlFor={`qty-${cart.id}`}>Quantity</label>
                  <br />
                  <input
                    type="number"
                    id={`qty-${cart.id}`}
                    min="1"
                    value={cart.quantity ?? 1}
                    className="border shadow py-2 p-2"
                    onChange={(e) =>
                      handleQuantityChange(cart.id, e.target.value)
                    }
                    style={{ width: "100px" }}
                  />
                  <br />
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => handleRemove(cart.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
        <Cart cartItems={cartItems} handleRemoveCartItem={handleRemove} />
        
    </div>
  );
};

export default CartItem;
