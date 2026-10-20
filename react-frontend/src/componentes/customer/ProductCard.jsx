import { Link } from "react-router-dom";
import noProductImage from "../../assets/images/noproduct.png";
import Pagination from "./Pagination";
import RatingStars from "./RatingStars";
function ProductCard({ products, addToCart, pagination, handlePageChange }) {
  console.log(products);

  return (
    <div className="col-md-7 mb-4 product-wrapper">
      {/* Added g-4 here to control the gap between columns automatically */}
      <div className="row">
        {products.length === 0 ? (
          <div className="col-md-12 justify-content-center text-center">
            <h3>Product not found</h3>
          </div>
        ) : (
          products.map((product) => (
            // Structual column (Leave this clean of borders and margins)
            <div key={product.id} className="col-md-3">
              {/* Visual Card (Put your borders, shadows, and padding here) */}
              <div className="card border shadow  mb-2 product-card">
                <Link
                  to={`/shop/${product.slug}`}
                  className="product-image-link"
                >
                  {product.images.length === 0 ? (
                    <div className="product-img" key={product.id}>
                      <img src={noProductImage} className="card-img" />
                    </div>
                  ) : (
                    product.images.map((img, index) => (
                      <div className="product-img" key={index}>
                        <img
                          className="card-img"
                          alt={`${product.name}`}
                          src={`http://localhost:8000${img.image}`}
                        />
                      </div>
                    ))
                  )}
                </Link>

                <div className="card-body">
                  {/* Added padding for inside the card */}
                  <ul className="list-group mb-2">
                    <li className="list-item mb-1">
                      <div className="row">
                        <div className="col">
                          <span>
                            <small>Reviews </small>
                          </span>
                        </div>
                        <div className="col text-end">
                          <span className="badge rounded-pill text-bg-dark ms-2">
                            <strong>{product.totalReviews}</strong>
                          </span>
                        </div>
                      </div>
                      <RatingStars rating={product.averageRating} />
                    </li>
                    <li className="list-item">
                      <span className="fw-bold">{product.name}</span>
                    </li>
                    <li className="list-item">
                      <p className="h5">R {product.price}</p>
                    </li>
                    {/* <li className="list-item">
                      {product.in_stock ? (
                        <span className="badage bg-success p-1 text-light rounded border">
                          In stock
                        </span>
                      ) : (
                        <span className="badage bg-danger p-1 text-light rounded border">
                          Out of stock
                        </span>
                      )}
                    </li> */}
                  </ul>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="row">
        <Pagination
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ProductCard;
