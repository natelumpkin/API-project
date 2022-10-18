import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getReviewsBySpot } from "../../store/review";
import ReviewCard from "../SpotDetails/ReviewCard";

const SpotReviews = ({spotId, avgRating, numReviews, setShowModal}) => {

  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.spot)
  // console.log('SPOTREVIEWS IS TRYING TO RENDER');
  // console.log('SPOT REVIEWS reviews SLICE OF STATE: ', reviews)

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
      <div>
      <i className="fa-solid fa-xmark" onClick={() => setShowModal(false)}></i>
      </div>
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
          <ReviewCard key={review.id} review={review} spotId={spotId}/>
        )) : <h4>No reviews available</h4>}
      </div>
    </div>
  )
}

export default SpotReviews;
