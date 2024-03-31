import { Star, StarHalf } from "lucide-react";

const Ratings = ({ rating }: any) => {
  const renderStar = (filled: boolean, key: any) => (
    <Star
      key={key}
      size={20}
      className={`mr-2 cursor-pointer ${
        filled ? "fill-yellow-400 stroke-yellow-400" : ""
      }`}
    />
  );

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(renderStar(true, i));
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(renderStar(false, i));
    } else {
      stars.push(renderStar(false, i));
    }
  }

  return <div className="flex">{stars}</div>;
};

export default Ratings;
