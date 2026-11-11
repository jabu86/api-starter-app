
import React, { useState } from "react";

function ProductImage({ src, alt = "Product image" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="product-image-wrapper">
      {!loaded && !error && (
        <div className="image-skeleton">
          <div className="shimmer"></div>
        </div>
      )}

      {error ? (
        <div className="image-error">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`product-image ${loaded ? "loaded" : ""}`}
        />
      )}
    </div>
  );
}

export default ProductImage;
