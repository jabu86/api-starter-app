
import React, { useEffect, useState } from "react";
import sliderImageOne from "../../assets/images/slideerFour.jpg";
import sliderImageTwo from "../../assets/images/slidertwo.png";
import { Link } from "react-router-dom";
// import "./Slider.css";

const sliderContent = [
  {
    id: 1,
    heading: "Welcome to the E-commerce Store",
    subheading: " Explore our wide range of products and enjoy a seamless shopping experience.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: sliderImageOne,
  },
  {
    id: 2,
    heading: "Exclusive Deals",
    subheading: "Grab the latest deals and offers before they are gone.",
    buttonText: "View Deals",
    buttonLink: "/shop",
    image: sliderImageTwo,
  },
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = sliderContent.length;

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  // Automatic sliding
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === totalSlides - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  return (
    <section
      className="slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      aria-roledescription="carousel"
      aria-label="Store promotions"
    >
      {/* Slides */}
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {sliderContent.map((slide, index) => (
          <div
            className="slider-item"
            key={slide.id}
            aria-hidden={currentIndex !== index}
          >
            <img
              src={slide.image}
              alt=""
              className="slider-image"
              fetchPriority={index === 0 ? "high" : "auto"}
              draggable="false"
            />

            <div className="slider-overlay" />

            <div className="slider-content">
              <h1 className="slider-title">
                {slide.heading}
              </h1>

              <p className="slider-subtitle">
                {slide.subheading}
              </p>

              <Link
                to={slide.buttonLink}
                className="slider-button"
                tabIndex={currentIndex === index ? 0 : -1}
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Previous and Next */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            className="slider-btn prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            &#10094;
          </button>

          <button
            type="button"
            className="slider-btn next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            &#10095;
          </button>

          {/* Indicators */}
          <div className="slider-indicators">
            {sliderContent.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className={
                  currentIndex === index ? "active" : ""
                }
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  currentIndex === index ? "true" : undefined
                }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Slider;
