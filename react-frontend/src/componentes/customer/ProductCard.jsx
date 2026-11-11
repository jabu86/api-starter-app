import { Link } from "react-router-dom";
import noProductImage from "../../assets/images/noproduct.png";
import Pagination from "./Pagination";
import RatingStars from "./RatingStars";
import { API_URL } from "../../services/api";
import ProductImage from "./ProductImage";

function ProductCard({
  products = [],
  addToCart,
  pagination,
  handlePageChange,
  isLoading
}) {

  
  return (
    <div className="col-md-7 mb-4 product-wrapper">
    <div className="row g-3">

      {isLoading ? (
        // Loading state
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="col-md-3">
            <div className="card border shadow mb-2 product-card">
              <div className="product-img">
                <div className="image-skeleton">
                  <div className="shimmer"></div>
                </div>
              </div>

              <div className="card-body">
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line price"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
        ))

      ) : products.length === 0 ? (
        // Empty state
        <div className="col-md-12 text-center">
          <h3>No products found</h3>
        </div>

      ) : (
        // Products loaded
        products.map((product) => (
          <div key={product.id} className="col-md-3">
            <div className="card border shadow mb-2 product-card">
              <Link
                to={`/shop/${product.slug}`}
                className="product-image-link"
              >
                <div className="product-img">
                  {product.images?.length > 0 ? (
                    <ProductImage
                      src={`${API_URL}${product.images[0].image}`}
                      alt={product.name}
                    />
                  ) : (
                    <img
                      src={noProductImage}
                      className="card-img"
                      alt="Product unavailable"
                    />
                  )}
                </div>
              </Link>

              <div className="card-body">
                <ul className="list-group mb-2">
                  <li className="list-item mb-1">
                    <div className="row">
                      <div className="col">
                        <small>Reviews</small>
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
                </ul>

                <div className="row">
                  <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
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

    {!isLoading && products.length > 0 && (
      <div className="row">
        <Pagination
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </div>
    )}
  </div>
  );
}

export default ProductCard;
