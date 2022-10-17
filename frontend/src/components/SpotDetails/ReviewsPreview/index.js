import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReviewsBySpot } from "../../../store/review";
import formatAvgRating from "../../../utils/formatAvgRating";
import ReviewCard from "../ReviewCard";

const ReviewsPreview = ({spotId, avgRating, numReviews}) => {

  const reviews = useSelector(state => state.reviews.spot);
  // console.log('REVIEWS SLICE OF STATE: ', reviews);
  const reviewsArr = [];

  for (let review in reviews) {
    reviewsArr.push(reviews[review]);
  }

  let formattedAvgRating;
  if (avgRating) formattedAvgRating = formatAvgRating(avgRating);
  //console.log(formattedAvgRating);

  console.log('REVIEWS ARRAY AFTER FLATTENING: ', reviewsArr)

  return (
    <div>
      <span><i className="fa-solid fa-star"/>{formattedAvgRating}</span>
      <span> • </span>
      <span>{numReviews} {numReviews > 1 && `reviews`}{numReviews === 1 && 'review'}</span>
      <div>
        {reviewsArr.length && reviewsArr.map(review => (
          <ReviewCard key={review.id} review={review}/>
        ))}
      </div>
    </div>
  )
};

export default ReviewsPreview;