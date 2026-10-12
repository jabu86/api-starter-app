import { Link } from "react-router-dom";
import noProductImage from "../../assets/images/noproduct.png";
import Pagination from "./Pagination";
function ProductCard({ products, addToCart , pagination, handlePageChange }) {
  return (
    <div className="col-md-7 mb-4 product-wrapper m-0">
      {/* Added g-4 here to control the gap between columns automatically */}
      <div className="row">
        {products.length === 0 ? (
          <div className="col-md-12 justify-content-center text-center">
            <h3>Product not found</h3>
          </div>
        ) : (
          products.map((product) => (
            // Structual column (Leave this clean of borders and margins)
            <div key={product.id} className="col-md-4">
              {/* Visual Card (Put your borders, shadows, and padding here) */}
              <div className="border shadow m-0 mb-2 product-card">
                <Link to={`/shop/${product.slug}`} className="product-image-link">
                  {product.images.length === 0 ? (
                    <img src={noProductImage} className="card-img" />
                  ) : (
                    product.images.map((img, index) => (
                      <div
                        className="product-img"
                        // style={{backgroundImage: `url(http://localhost:8000${img.image})`}}
                      >
                        <img
                          key={index}
                          className="card-img"           
                          alt={`${product.name}`}
                          src={`http://localhost:8000${img.image}`}
                        />
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
                  </div>
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
