import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getReviewsBySpot } from "../../store/review";
import ReviewCard from "../SpotDetails/ReviewCard";

const SpotReviews = ({spotId, avgRating, numReviews}) => {

  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.spot)

  const reviewsArr = [];

  for (let review in reviews) {
    reviewsArr.push(reviews[review]);
  }


  useEffect(() => {
    console.log('Hello from Spot Reviews use effect')
    dispatch(getReviewsBySpot(spotId))
  }, [])

  return (
    <div>
      <div><h4>
              {avgRating} <i className="fa-solid fa-star"></i>
              <span> • </span>
              <span>
                {numReviews} {(numReviews > 1 || numReviews < 1) && `reviews`}{numReviews === 1 && 'review'}
              </span>
            </h4>
      </div>
      <div>
      {reviewsArr.length ? reviewsArr.map(review => (
          <ReviewCard key={review.id} review={review}/>
        )) : <h4>No reviews available</h4>}
      </div>
    </div>
  )
}

export default SpotReviews;
