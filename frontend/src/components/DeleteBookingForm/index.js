import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { Link } from "react-router-dom";

import { deleteReviewById, getReviewsBySpot } from "../../store/review";
import { getSpotById } from "../../store/spot";

import './DeleteBookingForm.css'

const DeleteBookingForm = ({setShowDeleteBooking, showDeleteBooking, bookingId, deleteBooking}) => {

  if (showDeleteBooking) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    }
  })

  return (
    <div className="delete-review-holder delete-booking">
      <div className="delete-review signup-exit-holder">

        <div onClick={() => setShowDeleteBooking(false)} className="circle delete-review">
        <i id="exit-reviews" className="fa-solid fa-xmark"></i>
        </div>

      </div>
      <div>
        <div>
        <h4>Cancel this reservation?</h4>
        </div>
        <div className="delete-review-bottom-navigation">
              <div>
              {"< "}<Link className="underline" onClick={() => setShowDeleteBooking(false)}>Back</Link>
              </div>
              <button
                className="delete-review-button-perm"
                onClick={() => deleteBooking(bookingId)}
                >Cancel Reservation</button>
            </div>
      </div>
    </div>


  )
}

export default DeleteBookingForm;
