import { useDispatch } from "react-redux";

import { deleteReviewById, getReviewsBySpot } from "../../store/review";
import { getSpotById } from "../../store/spot";

const DeleteReviewForm = ({setShowDeleteReviewForm, reviewId, spotId}) => {

  const dispatch = useDispatch();

  const deleteReview = () => {
    dispatch(deleteReviewById(reviewId))
      .then(() => {
        dispatch(getSpotById(spotId))});
    setShowDeleteReviewForm(false);
  }

  return (
    <div>
      <div>
        <i className="fa-solid fa-xmark" onClick={() => setShowDeleteReviewForm(false)}></i>
      </div>
      <div>
        <h4 onClick={() => setShowDeleteReviewForm(false)}>Back</h4>
        <h4>Permanently remove this review?</h4>
        <button onClick={() => deleteReview()}>Delete Review</button>
      </div>
    </div>
  )
}

export default DeleteReviewForm;
