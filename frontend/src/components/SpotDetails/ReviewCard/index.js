import { useSelector } from "react-redux";
import { useState } from "react";

import getMonthFromDate from "../../../utils/getMonthFromDate";

import DeleteReviewForm from "../../DeleteReviewForm";
import { Modal } from "../../../context/Modal";

// Individual Review Card containing userName, date Review was made,
// and preview of review text

const ReviewCard = ({review, spotId}) => {

  const currentUser = useSelector(state => state.session.user);

  //console.log('REVIEW CARD currentUser: ', currentUser);

  const [showDeleteReviewForm, setShowDeleteReviewForm] = useState(false);

  let formattedDate = getMonthFromDate(review.createdAt)

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
        <p>{review.review}</p>
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

export default ReviewCard;
