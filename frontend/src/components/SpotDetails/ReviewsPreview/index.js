import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReviewsBySpot } from "../../../store/review";


const ReviewsPreview = ({spotId, avgRating, numReviews}) => {

  // const dispatch = useDispatch;
  // useEffect(() => {
  //   console.log('USE EFFECT IN REVIEWS PREVIEW IS RUNNING')
  //   dispatch(getReviewsBySpot(spotId))
  // }, [])

  const reviews = useSelector(state => state.reviews.spot);
  // console.log('REVIEWS SLICE OF STATE: ', reviews);
  const reviewsArr = [];

  for (let review in reviews) {
    reviewsArr.push(reviews[review]);
  }

  // console.log('REVIEWS ARRAY AFTER FLATTENING: ', reviewsArr)

  return (
    <div>

    </div>
  )
};

export default ReviewsPreview;
