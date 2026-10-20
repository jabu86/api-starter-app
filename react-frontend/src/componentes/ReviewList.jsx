import { useAuth } from "../context/AuthContext";
import RatingStars from "./customer/RatingStars";

// import React from "react";
function ReviewList({ reviews, handleUpdateReview, handleDeleteReview }) {
  const { user } = useAuth();

  

  return (
    <div className="row mt-2">
      <div className="col">
        <ul className="list-group">
          {reviews.length === 0 ? (
            <li className="list-item">
              <div className="row justify-content-center">
                No review for this product
              </div>
            </li>
          ) : (
            reviews.map((review) => (
              <li className="list-group-item" key={review.id}>
                <div className="row">
                  <div className="col-md-1">
                    <div className="row">
                      <img
                        src={`http://localhost:8000/images/${review.user.profile.image ? review.user.profile.image : "/images/profile/profile.png"}`}
                        alt={review.user.name}
                        width={40}
                      />
                    </div>
                    <div className="row">
                      <small>{review.user.name}</small>
                    </div>
                  </div>
                  <div className="col">
                    {user?.id == review?.user.id && (
                      <div className="dropdown float-end">
                        <button
                          className="btn btn-light btn-sm text-secondary"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          &#8942;
                        </button>

                        {/* dropdown-menu-end keeps the list aligned to the right side */}
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                          <li>
                            <button
                              className="dropdown-item d-flex align-items-center"
                              type="button"
                              onClick={() => handleUpdateReview(review)}
                            >
                              <span className="me-2 text-primary">&#9998;</span>{" "}
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item d-flex align-items-center text-danger"
                              type="button"
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              <span className="me-2">&#128465;</span> Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    <RatingStars rating={review.ratings} />

                    <p>{review.review}</p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ReviewList;
