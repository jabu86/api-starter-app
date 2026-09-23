import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

function SingleProdcut() {
  const [product, setProduct] = useState({
    id: null,
    name: "",
    price: 0,
    description: "",
    in_stock: false,
    images: [],
    colors: [],
    sizes: [],
    category: null,
    brand: null,
  });
  const [mainImage, setMainImage] = useState(null);
  const { slug } = useParams();

  const getProduct = async () => {
    try {
      const res = await fetch(`/api/shop/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const activeImage = data.product.images.find(
        (img) => img.active === true,
      ) || data.product.images[0] || null;
      setMainImage(activeImage);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };


  console.log(mainImage);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="row mb-5">
      <div className="col-md-9 single-product-wrapper mb-4">
        <div className="row justify-content-md-center">
          <div className="col-md-2 product-image-list text-center">
            <ul className="">
              {product.images && product.images &&
                product.images.map((img) => (
                  <li key={img.id} className="border mb-2 py-2">
                    <img
                      src={`http://localhost:8000${img.thumbnail}`}
                        width={100}
                      onClick={() => setMainImage(img)}
                    style={{ cursor: "pointer" }}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-4 border product-image">
            <img
              className="main-image"
              src={`http://localhost:8000${mainImage && mainImage.image}`}              
            />
          </div>
          <div className="col-md-6">
            <p className="h3">{product.name && product.name}</p>
            <p className="h5">R {product.name && product.price}</p>
            <p className="">4.5 Reviews</p>
            <hr />
            <p className="h5">
              {product.in_stock && product.in_stock
                ? "In stock"
                : "Out of stock"}
            </p>
            <hr />
            <ul>
              <li>Eligible for Cash on Delivery.</li>
              <li>Hassle-Free Exchanges & Returns for 30 Days.</li>
              <li>6-Month Limited Warranty.</li>
            </ul>
          </div>
        </div>
      </div>

      
      <div className="col-md-3 border">card</div>
        <div className="col-md-9 single-product-wrapper mb-4">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>
      
      {/* {slug} */}
    </div>
  );
}

export default SingleProdcut;
