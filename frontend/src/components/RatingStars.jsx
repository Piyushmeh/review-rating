import { FaStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

export default RatingStars;