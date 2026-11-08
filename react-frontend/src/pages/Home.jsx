import { useState } from "react";
import { API_URL } from "../services/api";
import Slider from "../componentes/customer/Slider";
import FeatureBrandSlider from "../componentes/customer/FeatureBrandSlider";
import { useNavigate } from "react-router-dom";
import ProductSection from "../componentes/customer/ProductSection";

function Home() {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredBrands, setFeaturedBrands] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  const getHomeProducts = async () => {
    try {
        const [latestRes, ratedRes , allBrandsRes , bestSellerRes] = await Promise.all([
          fetch(`${API_URL}/api/latest`),
          fetch(`${API_URL}/api/top-rated`),
          fetch(`${API_URL}/api/featured-brands`),
          fetch(`${API_URL}/api/best-selling`)
        ]);

        if (!latestRes.ok || !ratedRes.ok || !allBrandsRes || !bestSellerRes) {
          throw new Error("Failed to load homepage products");
        }

        const latestData = await latestRes.json();
        const ratedData = await ratedRes.json();
        const brands = await allBrandsRes.json();
        const bestSeller = await bestSellerRes.json();
        //  console.log(bestSeller , 'bestSeller');
        // console.log("Latest Products:", latestData.products);
        // console.log("Top Rated Products:", ratedData.products);

        setLatestProducts(latestData.products);
        setTopRatedProducts(ratedData.products);
        setFeaturedBrands(brands.brands);
        setBestSellingProducts(bestSeller.products);

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
      <div className="row mt-2">
        <FeatureBrandSlider
          brands={featuredBrands}
          onBrandClick={loadBrandProducts}
        />
      </div>
      <div className="row mt-2 mb-5 justify-content-center">
        <ProductSection title="Latest Products" products={latestProducts} link="/shop?sort=latest" />
        <ProductSection title="Top Rated Products" products={topRatedProducts} link="/shop?sort=rating" />
        <ProductSection title="Best Selling Products" products={bestSellingProducts} link="/shop?sort=best-selling" />
      </div>
    </>
  );
}

export default Home;
