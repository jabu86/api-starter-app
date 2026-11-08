
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductSection({ title, products = [], link }) {
  return (
    <section className="product-section">

      <div className="product-section-header">
        <h2>{title}</h2>

        <Link to={link}>
          View All &rarr;
        </Link>
      </div>

      {products.length > 0 ? (
        <ProductCard
          products={products}
        />
      ) : (
        <p>No products available yet.</p>
      )}

    </section>
  );
}

export default ProductSection;
