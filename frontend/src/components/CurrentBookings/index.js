import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { csrfFetch } from "../../store/csrf";
import * as bookingActions from '../../store/booking'

import BookingCard from "./BookingCard";

import './CurrentBookings.css'

const CurrentBookings = () => {

  const dispatch = useDispatch()
  const bookings = useSelector(state => state.bookings)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dispatch(bookingActions.getCurrentBookings())
      .then(() => setLoaded(true))
  },[dispatch])

  const bookingsArray = Object.values(bookings)
  bookingsArray.sort((a,b) => new Date(a.startDate) - new Date(b.startDate))
  const upcomingTrips = bookingsArray.filter(booking => (new Date() - new Date(booking.startDate)) < 0)

  console.log('all bookings: ', bookingsArray)
  console.log(upcomingTrips)

  if (!loaded) {
    return null
  }

  return (
    <div className="flex center">
      <div className="details-main-holder">
        <h1>Upcoming Trips</h1>
        <div className="current-bookings-holder">
          {upcomingTrips.map(booking => (
            <BookingCard booking={booking} key={booking.id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurrentBookings;
