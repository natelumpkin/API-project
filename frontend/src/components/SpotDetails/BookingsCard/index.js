import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar'

import * as bookingActions from '../../../store/booking'

import './BookingsCard.css'

const BookingsCard = ({spot}) => {

  const dispatch = useDispatch()

  const bookings = useSelector(state => state.bookings)

  const [date, setDate] = useState(new Date())

  useEffect(() => {
    dispatch(bookingActions.getAllBookings(spot.id))
  },[dispatch])




  return (
    <div className='calendar-container'>
      <Calendar value={date} onChange={setDate}/>
      <Calendar />
    </div>
  )
}

export default BookingsCard;
