import { Link } from "react-router-dom";
import noProductImage from "../../assets/images/noproduct.png";

function Cart({ cartItems = [], handleRemoveCartItem }) {
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">
          Cart is empty
        </div>
      ) : (
        <div className="cart cart-header">
          <p>
            You have{" "}
            <span className="badge rounded-pill text-bg-dark">
              {cartItems.length}
            </span>{" "}
            items in the cart
          </p>

          {cartItems.map((item) => {
            const activeImage = item.images?.find(
              (img) => img.active
            );

            return (
              <div className="row border mb-2" key={item.id}>
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

                <div className="col-md-8 cart-content">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm remove-btn"
                    onClick={() => handleRemoveCartItem(item.id)}
                  >
                    X
                  </button>

                  <p>{item.name}</p>

                  <p>
                    R {item.price} X {item.quantity}
                  </p>

                  <p>
                    Subtotal: R{" "}
                    {(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}

          <hr />

          <div className="cart-footer">
            <p>
              <strong>
                Total: R {cartTotal.toFixed(2)}
              </strong>
            </p>

            <p>
              <strong>
                Cart Items: {cartCount}
              </strong>
            </p>
          </div>
        </div>
      )}

        
    </div>
  );
}

export default Cart;