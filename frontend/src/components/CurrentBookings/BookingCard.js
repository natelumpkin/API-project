import { useDispatch } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { useState } from "react"

import * as bookingActions from '../../store/booking'

import DeleteBookingForm from "../DeleteBookingForm"
import { Modal } from "../../context/Modal"

import './CurrentBookings.css'

const BookingCard = ({booking}) => {

  // display start date and enddate
  // spot name
  // spot location
  // link to spot page
  // button to edit that maybe, brings to another page

  const dispatch = useDispatch()
  const history = useHistory()
  const [showDeleteBooking, setShowDeleteBooking] = useState(false)


  const formatDateShort = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date)
  }

  const deleteBooking = (bookingId) => {
    dispatch(bookingActions.removeBooking(bookingId))
  }


  return (
    <>
      <div className="booking-card-holder">
        <div className="booking-card-top">
          <div className="booking-center-holder">
            <Link className="booking-link" to={`/spots/${booking.Spot.id}`}>
              <div className="booking-spot-details">
                <div className="spot-name">
                    {booking.Spot.name}
                </div>
                <div>{booking.Spot.city}, {booking.Spot.state}, {booking.Spot.country}</div>
              </div>
              <img className="landing-page-image" src={booking.Spot.previewImage}></img>
            </Link>
            <div className="flex booking-dates">
              <div>Check in: {formatDateShort(new Date(booking.startDate))}</div>
              <div>Check out: {formatDateShort(new Date(booking.endDate))}</div>
            </div>
          </div>
        </div>
        <div className="booking-card-buttons">
          <button className="publish-button" onClick={() => history.push(`/trips/${booking.id}/edit`)}>Change Reservation</button>
          <button className="publish-button" onClick={() => setShowDeleteBooking(true)}>Cancel Reservation</button>
        </div>
      </div>
      {showDeleteBooking && (
        <Modal onClose={() => setShowDeleteBooking(false)}>
          <DeleteBookingForm showDeleteBooking={showDeleteBooking} setShowDeleteBooking={setShowDeleteBooking} bookingId={booking.id} deleteBooking={deleteBooking}></DeleteBookingForm>
        </Modal>
      )}
    </>
  )
}

export default BookingCard;
