import { Link } from "react-router-dom";
import noProductImage from "../../assets/images/noproduct.png";
function ProductCard({ products , addToCart }) {


  
  
  return (
    <div className="col-md-9 mb-4">
      {/* Added g-4 here to control the gap between columns automatically */}
      <div className="row product-wrapper g-2">
        {products.length === 0 ? <div className="col-md-12 justify-content-center text-center"><h3>Product not found</h3></div> : products.map((product) => (
          // Structual column (Leave this clean of borders and margins)
          <div key={product.id} className="col-md-3">
            {/* Visual Card (Put your borders, shadows, and padding here) */}
            <div className="product-card box-shadow">
              <Link to={`${product.slug}`}>
                {product.images.length === 0 ? (
                  <img src={noProductImage} className="card-img" />
                ) : (
                  product.images.map((img, index) => (
                    <div
                      className="product-img"
                      style={{
                        backgroundImage: `url(http://localhost:8000${img.image})`,
                        backgroundSize: "50% 45%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "50vh",
                        borderImageoutset: " 10px",
                      }}
                    >
                      {/* <img
                          key={index}
                          className="card-img"           
                          alt={`${product.name}`}
                          src={`http://localhost:8000${img.image}`}
                        /> */}
                    </div>
                  ))
                )}
              </Link>

              <div className="card-info p-3">
                {" "}
                {/* Added padding for inside the card */}
                <div className="card-body">
                  <p className="card-text">{product.name}</p>
                  <p className="h5">R {product.price}</p>
                  <p>{product.in_stock ? "In stock" : "Out of stock"}</p>
                  <button type="button" className="btn btn-primary btn-block" onClick={(e) => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
