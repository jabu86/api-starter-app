import noProductImage from "../../assets/images/noproduct.png";

function Cart({ cartItems }) {
 
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          <p>
            You have{" "}
            <span className="badge rounded-pill text-bg-dark">
              {cartItems.length}
            </span>{" "}
            items in the cart
          </p>
          {cartItems.map((item) => (
            <div className="row border mb-2" key={item.id}>
              <div className="col-md-4 mb-2 mt-2 text-center">
                {item.images.length === 0 ? (
                  <img
                    src={noProductImage}
                    className="card-img"
                    width={50}
                    height={50}
                  />
                ) : (
                  item.images.map((img) => (
                    <img
                      src={`http://localhost:8000${img.image}`}
                      className="cart-imge"
                      width={100}
                      height={100}
                      key={img.id}
                    />
                  ))
                )}
              </div>
              <div className="col-md-8 cart-content">
                <p className="">{item.name}</p>
                <p>R {item.price} X {item.quantity}</p>
                <p>Subtotal: R {(Number(item.price) * item.quantity).toFixed(2)} </p>
              </div>
            </div>
          ))}
          <hr />
          <div className="cart-footer">
            <p>
              <strong>Total: R {cartTotal.toFixed(2)}</strong>
            </p>
        
            <p>
              <strong>Cart Items: {cartCount}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
