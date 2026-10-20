import { Link, useLocation } from "react-router-dom";
import noProductImage from "../../assets/images/noproduct.png";
import { useAuth } from "../../context/AuthContext";

function Cart({ cartItems = [], handleRemoveCartItem }) {
  // const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { pathname } =  useLocation();
  const { user } = useAuth();
  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );


  return (
    <div className="col">
      <div className="row cart border shadow p-2 mb-4 rounded">
        <p className="fw-semibold">Shop smart and quick.</p>
        <p className="fw-semibold">Get it here, be the first.</p>
        <p>
          {!user && (
            <Link to="/login" className="btn-link text-info mt-2">
              SIGN IN
            </Link>
          )}
        </p>
      </div>
      {cartItems.length === 0 ? (
        <div className="row cart cart-header border shadow rounded p-2 ">
          <h5>Cart is empty</h5>
        </div>
      ) : (
        <div className="row border shadow cart justify-content-center rounded">
          <p className="mt-2">
            You have{" "}
            <span className="badge rounded-pill text-bg-dark">
              {cartItems.length}
            </span>{" "}
            items in a cart
          </p>
          {cartItems.map((item) => {
            const activeImage = item.images?.find((img) => img.active);

            return (
              <div className="row cart-body" key={item.id}>
                <div className="col-md-4 mb-2 mt-2 cart-img-wrapper">
                  <Link to={`/shop/${item.slug}`}>
                    {activeImage ? (
                      <img
                        src={`http://localhost:8000${activeImage.thumbnail}`}
                        className="cart-img"
                        alt={item.name}
                        width={50}
                        height={50}
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
                  </Link>
                </div>

                <div className="col-md-8 mt-2 cart-content">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm remove-btn border-0"
                    onClick={() => handleRemoveCartItem(item.id)}
                  >
                    X
                  </button>
                  <ul className="list-group">
                    <li className="list-item ">
                      <p>{item.name}</p>
                    </li>
                    <li className="list-item ">
                      <div className="row">
                        <div className="col">
                          <p>Price :</p>
                        </div>
                        <div className="col text-end">
                          <strong>R {Number(item.price).toFixed(2)}</strong>
                        </div>
                      </div>
                    </li>
                    <li className="list-item ">
                      <div className="row">
                        <div className="col">
                          <p>Subtotal :</p>
                        </div>
                        <div className="col text-end">
                          <strong>
                            R {item.price} X {item.quantity}{" "}
                          </strong>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}

          <div className="row mb-2">
            <h4 className="lead mt-2">Cart Summary</h4>
            <div className="col-md-6">
              <p>items</p>
              <p>
                <strong>Total</strong>:
              </p>
            </div>
            <div className="col-md-6 mt-2">
              <p>{cartItems.length}</p>
              <p>
                <strong>R {cartTotal.toFixed(2)}</strong>
              </p>
            </div>
          </div>
          <div className="row m-1 mb-2">
            <Link
              to="/cart"
              className="btn btn-info"
              disabled={cartItems.length === 0}
            >
              Go to Cart
            </Link>
            {user &&  pathname === "/cart" && (
              <Link to="/shipping" className="btn btn-primary mt-2 mb-2">
                Contiune
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
