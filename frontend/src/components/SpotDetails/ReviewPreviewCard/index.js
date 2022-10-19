import { useSelector } from "react-redux";
import { useState } from "react";

import getMonthFromDate from "../../../utils/getMonthFromDate";
import formatReviewPreview from "../../../utils/formatReviewPreview";

import DeleteReviewForm from "../../DeleteReviewForm";
import { Modal } from "../../../context/Modal";

import './ReviewPreviewCard.css';

// Review preview card only displays first 6 reviews
// And only displays the first 180 characters, ending with a ...
// Each review that is cut off has a show more link that brings up the modal

const ReviewPreviewCard = ({review, spotId, setShowModal}) => {

  const currentUser = useSelector(state => state.session.user);

  //console.log('REVIEW CARD currentUser: ', currentUser);

  const [showDeleteReviewForm, setShowDeleteReviewForm] = useState(false);

  let formattedDate = getMonthFromDate(review.createdAt)
  let formattedReview = formatReviewPreview(review.review);
  let enableShowMoreButton;
  if (formattedReview.length < review.review.length) enableShowMoreButton = true;

  //console.log('REVIEW CARD prop: ', review)

  return (
    <>
    <div>
      <div className="flex-column">
        <h4>{review.User.firstName}</h4>
        {currentUser && review.User.id === currentUser.id && (
          <button onClick={() => setShowDeleteReviewForm(true)}>Delete your review</button>
        )}
        <h5>{formattedDate}</h5>
      </div>
      <div>
        <p>{formattedReview}</p>
        {enableShowMoreButton && (
          <div>
            <h4 onClick={() => setShowModal(true)}>Show more {'>'}</h4>
          </div>
        )}
      </div>
    </div>
    {showDeleteReviewForm && (
      <Modal onClose={() => setShowDeleteReviewForm(false)}>
        <DeleteReviewForm reviewId={review.id} spotId={spotId} setShowDeleteReviewForm={setShowDeleteReviewForm}/>
      </Modal>
    )}
    </>
  )
}

export default ReviewPreviewCard;
