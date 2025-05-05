// components/StarRating.tsx
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, editable = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating: number) => {
    if (editable && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${editable ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
        >
          {star <= (hoverRating || rating) ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default StarRating;