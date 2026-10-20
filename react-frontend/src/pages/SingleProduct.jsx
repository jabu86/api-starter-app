import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cart from "../componentes/customer/Cart";
import noProductImage from "../assets/images/noproduct.png";
import ReviewForm from "../componentes/ReviewForm";
import ReviewList from "../componentes/ReviewList";
import axios from "axios";
import { toast } from "react-toastify";
import RatingStars from "../componentes/customer/RatingStars";

function SingleProdcut() {
  const navigate = useNavigate();
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

  const [form, setForm] = useState({
    id: "",
    rating: "",
    review: "",
  });
  const [showReview, setShowReview] = useState(true);
  const [showRatings, setShowRatings] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRatings, setAverageRatings] = useState(null);
  const [totalReviews, setTotalReviews] = useState(null);
  const [errors, setErrors] = useState({});
  const [initialData, setInitialData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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
      setAverageRatings(data.averageRating);
      setTotalReviews(data.totalReviews);
      setMainImage(activeImage);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
    // console.log(cartItmes , 'shop comp')
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleRatingsToggle = () => {
    setShowReview(true);
    setShowRatings(false);
    setIsEditing(false);
    setInitialData({});
    setErrors({});

    setForm({
      id: "",
      review: "",
      rating: "",
    });
  };

  const handleReviewToggle = () => {
    setShowRatings(true);
    setShowReview(false);
    setIsEditing(false);
    setInitialData({});
    setErrors({});

    setForm({
      id: "",
      review: "",
      rating: "",
    });
  };

  const getReviews = async (product_id) => {
    if (!product_id) return;
    try {
      const res = await fetch(`/api/reviews/${product_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addReviewRating = async (form) => {
    setErrors({});
    let url = isEditing ? `/api/reviews/${form.id}/edit` : `/api/reviews`;
    try {
      const payload = {
        ratings: form.rating,
        review: form.review,
        product_id: product.id,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        url,
        payload, //request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setReviews(data.reviews);
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });

        // Refresh reviews for the current product
        await getReviews(product.id);
        // Show the Reviews tab
        setShowReview(true);
        setShowRatings(false);

        setForm({
          id: "",
          rating: "",
          review: "",
        });

        setInitialData({});
        setIsEditing(false);
        setErrors({});

        
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.errors) {
        const groupedErrors = error.response.data.errors.reduce((acc, err) => {
          if (!acc[err.path]) {
            acc[err.path] = [];
          }
          acc[err.path].push(err.msg);
          return acc;
        }, {});
        setErrors(groupedErrors || {});
        return;
      }
      if (error.response?.status === 409 || error.response?.status === 404) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        // Reset the review form
        setShowReview(true);
        setShowRatings(false);
        return;
      }
      setInitialData({
        rating: "",
        review: "",
      });
      toast.error(error.response?.data?.message || "Failed to submit review.");
    }
  };

  const handleUpdateReview = async (review) => {
    setShowReview(false);
    setShowRatings(true);
    setIsEditing(true);
    setInitialData({
      id: review.id,
      rating: review.ratings,
      review: review.review,
    });
  };

  const handleDeleteReview = async (id) => {
    setErrors({});
    let url = `/api/reviews/${id}/delete`;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.delete(
        url,
        //request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        // Refresh reviews for the current product
        await getReviews(product.id);
        // Show the Reviews tab
        setShowReview(true);
        setShowRatings(false);
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
      }
    } catch (error) {
      if (error.response?.status === 409 || error.response?.status === 404) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        // Reset the review form
        setShowReview(true);
        setShowRatings(false);
        return;
      }
      toast.error(error.response?.data?.message || "Failed to submit review.");
    }
  };

  useEffect(() => {
    getProduct();
  }, [slug]);

  useEffect(() => {
    if (product.id !== null) {
      getReviews(product.id);
    }
  }, [product.id]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="row gap-2 single-product-wrapper">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/shop">shop</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/shop/${product.slug}`}>{product.slug}</Link>
          </li>
        </ol>
      </nav>

      <div className="col-md-9 mb-4">
        <div className="row  border shadow rounded mb-2">
          <div className="col-md-1 product-image-list text-center">
            <ul className="list-group mt-4">
              {!product.images ? (
                <li className="border list-group-item mb-2">
                  <p>No images available</p>
                </li>
              ) : (
                product.images.map((img) => (
                  <li key={img.id} className="border list-group-item mb-2">
                    <img
                      src={`http://localhost:8000${img.thumbnail}`}
                      width={50}
                      onClick={() => setMainImage(img)}
                      style={{ cursor: "pointer" }}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="col-md-4 border product-image mt-4 mb-4 text-center">
            <ul className="list-group ">
              <li className="list-group">
                {mainImage === null ? (
                  <img className="main-image" src={noProductImage} />
                ) : (
                  <img
                    className="main-image"
                    src={`http://localhost:8000${mainImage && mainImage.image}`}
                  />
                )}
              </li>
            </ul>
          </div>
          <div className="col-md-7 mt-4">
            <p className="h3">{product.name && product.name}</p>
            <p className="h5">R {product.name && product.price}</p>
            <div className="row">
              <div className="col">
                <RatingStars rating={averageRatings} />
                <br />
                <span className="py-2">
                  {Number(averageRatings).toFixed(1)} ({totalReviews} reviews)
                </span>
              </div>
            </div>
            <hr />
            <div className="colors">
              {product.colors
                ? product.colors.map((color) => (
                    <div
                      style={{
                        background: color.name,
                      }}
                      key={color.id}
                      className="colors-holder mb-2"
                    ></div>
                  ))
                : ""}
            </div>
            <p>
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

            <div className="form-group text-end">
              <button
                type="button"
                className="btn btn-primary mb-5"
                onClick={(e) => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="row  border mt-4 rounded shadow p-2">
          <div className="col-md-12 mb-4">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>

        <div className="row border rounded shadow mt-4">
          <div className="col-md-12 mb-4 p-2">
            <ul className="nav nav-tabs mb-2">
              <li className="nav-item">
                <button
                  className={`nav-link ${showReview ? "active" : ""}`}
                  onClick={handleRatingsToggle}
                >
                  Reviews
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${showRatings ? "active" : ""}`}
                  onClick={handleReviewToggle}
                >
                  Rate & Review
                </button>
              </li>
            </ul>
            {showReview && (
              <ReviewList
                reviews={reviews}
                handleUpdateReview={handleUpdateReview}
                handleDeleteReview={handleDeleteReview}
              />
            )}
            {showRatings && (
              <ReviewForm
                addReviewRating={addReviewRating}
                initialData={initialData}
                errors={errors}
                isEditing={isEditing}
                form={form}
                setForm={setForm}
              />
            )}
          </div>
        </div>
      </div>

      <Cart cartItems={cartItems} handleRemoveCartItem={handleRemoveCartItem} />
    </div>
  );
}

export default SingleProdcut;
