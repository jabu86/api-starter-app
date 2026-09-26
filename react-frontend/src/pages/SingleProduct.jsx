import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cart from "../componentes/customer/Cart";

import noProductImage from "../assets/images/noproduct.png";
import { useAuth } from "../context/AuthContext";

function SingleProdcut() {
   const { user,} = useAuth();
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

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const getProduct = async () => {
    try {
      const res = await fetch(`/api/shop/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const activeImage =
        data.product.images.find((img) => img.active === true) ||
        data.product.images[0] ||
        null;
      setMainImage(activeImage);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem  = prevItems.find((item) => item.id === product.id);
      if(existingItem ){
        return prevItems.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
      }
      return [
        ...prevItems,
        {
          ...product,
          quantity:1
        }
      ]
    });
    // console.log(cartItmes , 'shop comp')    
  }

  useEffect(() => {
    getProduct();
  }, [slug]);

  
  useEffect(() => {  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // console.log(mainImage);

  return (
    <div className="row mb-5">
      <div className="col-md-9 single-product-wrapper mb-4">
        <div className="row justify-content-md-center">
          <div className="col-md-2 product-image-list text-center">
            <ul className="">
              {product.images &&
                product.images &&
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
            {mainImage === null ? (
              <img src={noProductImage} />
            ) : (
              <img
                className="main-image"
                src={`http://localhost:8000${mainImage && mainImage.image}`}
              />
            )}
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

            <button type="button" className="btn btn-primary btn-block" onClick={(e) => addToCart(product)}>
                    Add to Cart
              </button>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <Cart
          cartItems={cartItems}
          handleRemoveCartItem={handleRemoveCartItem}
        />

        {user ? <Link to="/shipping" className="btn btn-info btn-block">Procced</Link> : <Link to="/login">login</Link> } 
      </div>
      <div className="col-md-9 single-product-wrapper mb-4">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      {/* {slug} */}
    </div>
  );
}

export default SingleProdcut;
