
import React, { useState , } from "react";
import noProductImage from "../../assets/images/noproduct.png";
import { API_URL } from "../../services/api";


function Slider({ images: productImages = [] }) {

  const images = productImages.length > 0
    ? productImages
    : [noProductImage, noProductImage, noProductImage];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="slider-container">

      {/* Slider track */}
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {images.map((image, index) => {

          const imageSrc =
            typeof image === "string"
              ? image
              : `${API_URL}/images/${image.image}`;

          return (
            <div className="slider-item" key={index}>
              <img
                src={imageSrc}
                alt={`Product slide ${index + 1}`}
                onError={(e) => {
                  e.currentTarget.src = noProductImage;
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <>
          <button
            className="slider-btn prev"
            onClick={prevSlide}
            aria-label="Previous image"
          >
            &#10094;
          </button>

          {/* Next button */}
          <button
            className="slider-btn next"
            onClick={nextSlide}
            aria-label="Next image"
          >
            &#10095;
          </button>

          {/* Indicators */}
          <div className="slider-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={
                  currentIndex === index ? "active" : ""
                }
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Slider;
