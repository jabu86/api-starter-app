
import React, { useRef } from "react";

import { API_URL } from "../../services/api";
// import "./Slider.css";

function FeatureBrandSlider({ brands = [] , onBrandClick }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="brand-section">
      <div className="brand-header">
        <h2>Shop by Brand</h2>
        <div className="brand-controls">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous brands"
          >
            &#10094;
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next brands"
          >
            &#10095;
          </button>
        </div>
      </div>

      <div className="brand-slider" ref={sliderRef}>
        {brands.map((brand) => (
          <div
            className="brand-card"
            key={brand.id}
            onClick={() => onBrandClick?.(brand)}
          >
            <div className="brand-image">
              <img
                src={`${API_URL}/images${brand.image}`}
                alt={brand.name}
              />
            </div>

            <h4>{brand.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureBrandSlider;
