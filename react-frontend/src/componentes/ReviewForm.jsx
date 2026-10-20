import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function ReviewForm({
  addReviewRating,
  errors,
  initialData,
  form,
  setForm,
  isEditing,
}) {
  const { user } = useAuth();
  useEffect(() => {
    setForm({
      id: initialData?.id || "",
      rating: initialData?.rating || "",
      review: initialData?.review || "",
    });
  }, [initialData, setForm]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    addReviewRating(form);
  };
  return (
    <div className="row">
      {user && (
        <form onSubmit={handelSubmit}>
          <div className="form-group mb-2">
            <label>
              <strong>Rating</strong>
            </label>
            <select
              className={`form-control ${errors.ratings ? "is-invalid" : ""}`}
              value={form.rating}
              name="rating"
              onChange={handleChange}
            >
              <option value="" disabled>
                Rate product
              </option>
              <option value="1">1 - Terrible</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>

            {errors.ratings && (
              <div className="text-danger">{errors.ratings[0]}</div>
            )}
          </div>
          <div className="form-group mb-2">
            <label>
              <strong>Comment</strong>
            </label>
            <textarea
              className={`form-control ${errors.review ? "is-invalid" : ""}`}
              placeholder="Write review here..."
              rows={5}
              value={form.review}
              name="review"
              onChange={handleChange}
            ></textarea>
            {errors.review && (
              <div className="text-danger">{errors.review[0]}</div>
            )}
          </div>

          <div className="form-group text-end">
            {isEditing ? (
              <button type="submit" className="btn btn-info">
                Edit Review
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Rate Us
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
