import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductSection({
  title,
  products = [],
  link,
  addToCart,
  isLoading
}) {
  return (
    <section className="product-section">

      <div className="product-section-header">
        <h2>{title}</h2>

        <Link to={link}>
          View All &rarr;
        </Link>
      </div>

      <ProductCard
        products={products}
        addToCart={addToCart}
        isLoading={isLoading}
      />

    </section>
  );
}

export default ProductSection;
