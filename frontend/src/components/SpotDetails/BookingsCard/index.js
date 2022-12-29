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

  // console.log(date)

  const alreadyBooked = ({activeStartDate, date, view}) => {
    // function to determine if a date is booked
    // if the date falls in or on one of the bookings
    // then return true


    // iterate through bookings
    for (let bookingId in bookings) {
      console.log(bookings[bookingId].endDate)
      const startDate = new Date(bookings[bookingId].startDate)
      const endDate = new Date(bookings[bookingId].endDate)
      // console.log(endDate)
      // console.log('startDate: ', startDate)
      // console.log('endDate: ', endDate)
      // if (activeStartDate === startDate) return true
      // if (activeStartDate === endDate) return true
      // console.log('-----------------TRYING TO MATCH--------------')
      // console.log(date)
      // console.log(startDate)
      // if (isSameDate(date, startDate)) return true
      // if (isSameDate(date, endDate)) return true
    }
    // return true
    // if the date is on a startdate or enddate, or in between
    // return false
  }

  const isSameDate = (date1, date2) => {
    if (date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getYear() === date2.getYear()) {
          console.log(date1)
          console.log(date2)
          return true
        }
  }

  return (
    <div className='calendar-container'>
      <Calendar
        value={date}
        onChange={setDate}
        showDoubleView={true}
        selectRange={true}
        tileDisabled={alreadyBooked}
        returnValue={'range'}/>

    </div>
  )
}

export default BookingsCard;
