import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import * as bookingActions from '../../store/booking'

const BookingCard = ({booking}) => {

  // display start date and enddate
  // spot name
  // spot location
  // link to spot page
  // button to edit that maybe, brings to another page

  const dispatch = useDispatch()
  const history = useHistory()

  const formatDateShort = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date)
  }

  const deleteBooking = (bookingId) => {
    dispatch(bookingActions.removeBooking(bookingId))
  }


  return (
    <div className="booking-card-holder">
      <div>{booking.Spot.name}</div>
      <div>{booking.Spot.city}, {booking.Spot.state}, {booking.Spot.country}</div>
      <div>Check in: {formatDateShort(new Date(booking.startDate))}</div>
      <div>Check out: {formatDateShort(new Date(booking.endDate))}</div>
      <button onClick={() => history.push(`/trips/${booking.id}/edit`)}>Change Reservation</button>
      <button onClick={() => deleteBooking(booking.id)}>Cancel Reservation</button>
    </div>
  )
}

export default BookingCard;
