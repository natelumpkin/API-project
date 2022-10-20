import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReviewsBySpot } from "../../../store/review";
import formatAvgRating from "../../../utils/formatAvgRating";
import ReviewPreviewCard from "../ReviewPreviewCard";

import './ReviewsPreview.css'

const ReviewsPreview = ({spotId, avgRating, numReviews, setShowModal}) => {

  const reviews = useSelector(state => state.reviews.spot);
  //console.log('REVIEWS SLICE OF STATE: ', reviews);
  const reviewsArr = [];

  for (let review in reviews) {
    reviewsArr.push(reviews[review]);
  }

  let previewReviewsArr = reviewsArr.slice(0,6);

  let formattedAvgRating;
  if (avgRating) formattedAvgRating = formatAvgRating(avgRating);
  //console.log(formattedAvgRating);

  //console.log('REVIEWS ARRAY AFTER FLATTENING: ', reviewsArr)

  if (!numReviews) {
    return null;
  }

  return (
    <div>
      <div className="display-title">
        <h2>
        <span><i className="fa-solid fa-star"/> {formattedAvgRating}</span>
        <span> • </span>
        <span>{numReviews} {numReviews > 1 && `reviews`}{numReviews === 1 && 'review'}</span>
        </h2>
      </div>
      <div className="reviews-preview-holder">
        {previewReviewsArr.length && previewReviewsArr.map(review => (
          <ReviewPreviewCard setShowModal={setShowModal} key={review.id} spotId={spotId} review={review}/>
        ))}
      </div>
    </div>

  )
};

export default ReviewsPreview;
