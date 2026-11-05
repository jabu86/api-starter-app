import { useState } from "react";
import { API_URL } from "../services/api";
import noProductImage from "../assets/images/noproduct.png";
import Slider from "../componentes/customer/Slider";
import FeatureBrandSlider from "../componentes/customer/FeatureBrandSlider";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredBrands, setFeaturedBrands] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  const fetchLatestProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/latest`);
      if (!response.ok) {
        throw new Error("Failed to fetch latest products");
      } 
      const data = await response.json();
      setLatestProducts(data);
    } catch (error) {
      console.error("Error fetching latest products:", error);
    }
  };

  const fetchFeaturedBrands = async () => {
    try {
      const response = await fetch(`${API_URL}/api/featured-brands`);   
    if (!response.ok) {
      throw new Error("Failed to fetch featured brands");
    }
    const data = await response.json();
    setFeaturedBrands(data.brands || []);
       
    }catch (error) {
      console.error("Error fetching featured brands:", error);
    } 
  }

  const fetchTopRatedProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/top-rated`);
      if (!response.ok) {
        throw new Error("Failed to fetch top-rated products");
      }
      const data = await response.json();
      setTopRatedProducts(data);
    } catch (error) {
      console.error("Error fetching top-rated products:", error);
    }
  };

  
  const fetchBestSellingProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/best-selling`);
      if (!response.ok) {
        throw new Error("Failed to fetch best-selling products");
      }
      const data = await response.json();
      setBestSellingProducts(data);
    } catch (error) {
      console.error("Error fetching best-selling products:", error);
    }
  };


  const loadBrandProducts = (brand) => {
    // Implement the logic to load products for the selected brand
    console.log("Selected brand:", brand);
    navigate(`/shop?brand=${encodeURIComponent(brand.name)}`);
  }
 

  useState(() => {
    fetchLatestProducts();
    fetchFeaturedBrands();
    fetchTopRatedProducts();
    fetchBestSellingProducts();
  }, []);

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
        <Slider />
      </div>
      <div className="row mt-2">
        
        <FeatureBrandSlider brands={featuredBrands} onBrandClick={loadBrandProducts}/>
       
      </div>
    </>
  );
}

export default Home;
