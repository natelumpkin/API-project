import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar'

import * as bookingActions from '../../../store/booking'
import isSameDate from '../../../utils/isSameDate';
import isBetweenDates from '../../../utils/isBetweenDates';


import './BookingsCard.css'

const BookingsCard = ({spot}) => {

  const dispatch = useDispatch()

  const bookings = useSelector(state => state.bookings)

  const [selectedDate, setDate] = useState(new Date())

  useEffect(() => {
    dispatch(bookingActions.getAllBookings(spot.id))
  },[dispatch])

  const alreadyBooked = ({activeStartDate, date, view}) => {
    for (let bookingId in bookings) {
      const startDate = bookings[bookingId].startDate
      const endDate = bookings[bookingId].endDate
      return isBetweenDates(date, startDate, endDate)
    }
  }



  return (
    <div className='calendar-container'>
      <Calendar
        value={selectedDate}
        onChange={setDate}
        showDoubleView={true}
        selectRange={true}
        tileDisabled={alreadyBooked}
        returnValue={'range'}/>

    </div>
  )
}

export default BookingsCard;
