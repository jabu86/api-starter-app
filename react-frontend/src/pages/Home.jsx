import { useState } from "react";
import { API_URL } from "../services/api";
import noProductImage from "../assets/images/noproduct.png";

function Home() {
  return (
    <>
      <div className="row">
        <h1 className="display-5">Welcome to the E-commerce Store</h1>
        <p>
          Explore our wide range of products and enjoy a seamless shopping
          experience.
        </p>
        {/* <img src={heroImg} alt="Hero" /> */}
      </div>

      <div className="row">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={ noProductImage}
                alt="First slide"
                height="400px"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={noProductImage}
                alt="Second slide"
                height="400px"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={noProductImage}
                alt="Third slide"
                height="400px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
