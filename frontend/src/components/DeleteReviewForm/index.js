import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { deleteReviewById, getReviewsBySpot } from "../../store/review";
import { getSpotById } from "../../store/spot";

import './DeleteReviewForm.css'

const DeleteReviewForm = ({setShowDeleteReviewForm, reviewId, spotId}) => {

  const dispatch = useDispatch();

  const deleteReview = () => {
    dispatch(deleteReviewById(reviewId))
      .then(() => {
        dispatch(getSpotById(spotId))});
    setShowDeleteReviewForm(false);
  }

  return (
    <div className="delete-review-holder">
      <div className="delete-review signup-exit-holder">

        <div className="circle delete-review">
        <i id="exit-reviews" className="fa-solid fa-xmark" onClick={() => setShowDeleteReviewForm(false)}></i>
        </div>

      </div>
      <div>
        <div>
        <h4>Permanently remove this review?</h4>
        </div>
        <div className="delete-review-bottom-navigation">
              <div>
              {"< "}<Link className="underline" onClick={() => setShowDeleteReviewForm(false)}>Back</Link>
              </div>
              <button
                className="delete-review-button-perm"
                onClick={deleteReview}
                >Delete Review</button>
            </div>
      </div>
    </div>


  )
}

export default DeleteReviewForm;
