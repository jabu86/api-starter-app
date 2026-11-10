import { useState } from "react";
import { API_URL } from "../services/api";
import Slider from "../componentes/customer/Slider";
import FeatureBrandSlider from "../componentes/customer/FeatureBrandSlider";
import ProductsCategoryHero from '../componentes/customer/ProductsCategoryHero'
import { useNavigate } from "react-router-dom";
import ProductSection from "../componentes/customer/ProductSection";

function Home() {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredBrands, setFeaturedBrands] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  const getHomeProducts = async () => {
    try {
        const [latestRes, ratedRes , allBrandsRes , bestSellerRes, proCatRes] = await Promise.all([
          fetch(`${API_URL}/api/latest`),
          fetch(`${API_URL}/api/top-rated`),
          fetch(`${API_URL}/api/featured-brands`),
          fetch(`${API_URL}/api/best-selling`),
          fetch(`${API_URL}/api/products-categories`)
        ]);

        if (!latestRes.ok || !ratedRes.ok || !allBrandsRes || !bestSellerRes || !proCatRes) {
          throw new Error("Failed to load homepage products");
        }

        const latestData = await latestRes.json();
        const ratedData = await ratedRes.json();
        const brands = await allBrandsRes.json();
        const bestSeller = await bestSellerRes.json();
        const productCategories = await proCatRes.json();

        setLatestProducts(latestData.products);
        setTopRatedProducts(ratedData.products);
        setFeaturedBrands(brands.brands);
        setBestSellingProducts(bestSeller.products);
        setProductCategories(productCategories.products)
      } catch (error) {
        console.error(error);
      }
  }



  const loadBrandProducts = (brand) => {
    // Implement the logic to load products for the selected brand
    // console.log("Selected brand:", brand);
    navigate(`/shop?brand=${encodeURIComponent(brand.name)}`);
  };

  useState(() => {
    getHomeProducts();
  }, []);

  return (
    <>
      <div className="row">
        <Slider />
      </div>
      <div className="row justify-content-center">
        <ProductSection title="Latest Products" products={latestProducts} link="/shop?sort=latest" />
        <ProductSection title="Top Rated Products" products={topRatedProducts} link="/shop?sort=rating" />
        <ProductSection title="Best Selling Products" products={bestSellingProducts} link="/shop?sort=best-selling" />
      </div>
      
      <div className="row">
        <ProductsCategoryHero title="Shop by Categories" categories={productCategories} />
      </div>
      <div className="row">
        <FeatureBrandSlider
          brands={featuredBrands}
          onBrandClick={loadBrandProducts}
        />
      </div>
    
    </>
  );
}

export default Home;
