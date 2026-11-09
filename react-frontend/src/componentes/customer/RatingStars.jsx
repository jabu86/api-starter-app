import { Star } from "lucide-react";

function RatingStars({ rating = 0, maxRating = 5 }) {
  return (
    <div className="rating-stars" aria-label={`${rating} out of ${maxRating} stars`}>
      {[...Array(maxRating)].map((_, index) => {
        const filled = index < Math.round(Number(rating));
        return (
          <Star
            key={index}
            size={18}
            fill={filled ? "#facc15" : "none"}
            color={filled ? "#facc15" : "#9ca3af"}
          />
        );
      })}
    </div>
  );
}

export default RatingStars;