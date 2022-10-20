import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    if (showDeleteReviewForm) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  },[showDeleteReviewForm])

  let formattedDate = getMonthFromDate(review.createdAt)
  let formattedReview = formatReviewPreview(review.review);
  let enableShowMoreButton;
  if (formattedReview.length < review.review.length) enableShowMoreButton = true;

  //console.log('REVIEW CARD prop: ', review)

  return (
    <>
    <div className="review-preview-card">
      <div className="flex user-information">
        <div className="user-icon">
        <i id="review-icon" className="fa-solid fa-circle-user profile"></i>
        </div>
        <div className="username-holder flex-column">
          <h4 id="username">{review.User.firstName} </h4>

          <h5 id="review-date">{formattedDate}</h5>
        </div>
      </div>
      <div className="review-holder no-overflow flex">
        <div id="review-text">{formattedReview}</div>
        <div className="showmore-button">
        {enableShowMoreButton && (
          <span>
            <Link className="underline" to='' onClick={(e) => {
              e.preventDefault();
              setShowModal(true)}
            }>Show more</Link>{' >'}
          </span>
        )}
        {currentUser && review.User.id === currentUser.id && (
          <div id="button-holder">
            <button className="delete-review-button" onClick={() => setShowDeleteReviewForm(true)}>Delete your review</button>
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

export default ReviewPreviewCard;
