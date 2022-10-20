import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getReviewsBySpot } from "../../store/review";
import ReviewCard from "../SpotDetails/ReviewCard";

import './SpotReviews.css';

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
   // console.log('Hello from Spot Reviews use effect')
    dispatch(getReviewsBySpot(spotId))
  }, [])

  return (
    <div className="spot-reviews-holder">
      <div className="exit-holder">
        <div className="circle">
        <i id="exit-reviews" className="fa-solid fa-xmark" onClick={() => setShowModal(false)}></i>
        </div>
      </div>
      <div className="spot-reviews-content">
        <div className="left-holder">
          <h4 className="spot-reviews-title">
          <div className="star-holder"><i className="fa-solid fa-star review-star-big"/></div> {avgRating}
            <span> • </span>
            <span>
              {numReviews} {(numReviews > 1 || numReviews < 1) && `reviews`}{numReviews === 1 && 'review'}
            </span>
          </h4>
        </div>
        <div className="reviews-container">
        {reviewsArr.length ? reviewsArr.map(review => (
            <ReviewCard key={review.id} review={review} spotId={spotId}/>
          )) : <h4>No reviews available</h4>}
        </div>
      </div>
    </div>
  )
}

export default SpotReviews;
