import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import getMonthFromDate from "../../../utils/getMonthFromDate";

import DeleteReviewForm from "../../DeleteReviewForm";
import { Modal } from "../../../context/Modal";

import './ReviewCard.css'

// Individual Review Card containing userName, date Review was made,
// and preview of review text

const ReviewCard = ({review, spotId}) => {

  const currentUser = useSelector(state => state.session.user);

  //console.log('REVIEW CARD currentUser: ', currentUser);

  const [showDeleteReviewForm, setShowDeleteReviewForm] = useState(false);

  useEffect(() => {
    if (showDeleteReviewForm) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  },[showDeleteReviewForm])

  let formattedDate = getMonthFromDate(review.createdAt)

  //console.log('REVIEW CARD prop: ', review)

  return (
    <>
    <div className="review-card flex">
      <div className="flex user-information">
      <div className="user-icon">
        <i id="review-icon" className="fa-solid fa-circle-user profile"></i>
      </div>
      <div className="username-holder flex-column">
        <h4 id="username">{review.User.firstName}</h4>
        <h5 id="review-date">{formattedDate}</h5>
      </div>
      </div>
      <div className="review-holder-modal flex">
        <div className="review-text">{review.review}</div>
        <div className="showmore-button-modal">
        {currentUser && review.User.id === currentUser.id && (
          <div className="button-holder-modal">
            <button className="delete-review-button-modal" onClick={() => setShowDeleteReviewForm(true)}>Delete your review</button>
          </div>
        )}
        </div>
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
