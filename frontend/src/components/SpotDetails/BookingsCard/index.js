import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar'

import * as bookingActions from '../../../store/booking'
import isBetweenDates from '../../../utils/isBetweenDates';


import './BookingsCard.css'

const BookingsCard = ({spot}) => {

  const dispatch = useDispatch()

  const bookings = useSelector(state => state.bookings)

  const [selectedDate, setDate] = useState('')
  const [dateErrors, setDateErrors] = useState([])
  const [disableBooking, setDisableBooking] = useState(true)

  console.log('currently selected date: ', selectedDate)
  console.log(selectedDate[0])
  console.log(selectedDate[1])

  useEffect(() => {
    dispatch(bookingActions.getAllBookings(spot.id))
  },[dispatch])

  useEffect(() => {
    // if startDate or endDate is between the selectedDates,
    // throw an error message
    for (let bookingId in bookings) {
      const startDate = bookings[bookingId].startDate
      const endDate = bookings[bookingId].endDate
      if (isBetweenDates(startDate, selectedDate[0], selectedDate[1])) {
        setDateErrors(['Spot is already booked for these dates'])
      }
      if (isBetweenDates(endDate, selectedDate[0], selectedDate[1])) {
        setDateErrors(['Spot is already booked for these dates'])
      }
    }
  },[selectedDate])

  useEffect(() => {
    if (dateErrors.length) setDisableBooking(true)
    if (selectedDate && !dateErrors.length) setDisableBooking(false)
  })

  const alreadyBooked = ({activeStartDate, date, view}) => {
    for (let bookingId in bookings) {
      const startDate = bookings[bookingId].startDate
      const endDate = bookings[bookingId].endDate
      return isBetweenDates(date, startDate, endDate)
    }
  }






  return (
    <div>
      <div className='calendar-container'>
        <Calendar
          value={selectedDate}
          onChange={setDate}
          showDoubleView={true}
          showFixedNumberOfWeeks={false}
          minDate={new Date()}
          selectRange={true}
          goToRangeStartOnSelect={false}
          tileDisabled={alreadyBooked}
          returnValue={'range'}/>
      </div>
      <form>
        <input className='date-display' value={selectedDate ? selectedDate[0] : ''}></input>
        <input className='date-display' value={selectedDate ? selectedDate[1] : ''}></input>
        <button disabled={disableBooking}>Book Dates</button>
        <button type="button" onClick={() => setDate('')}>Clear Dates</button>
        {dateErrors &&
          dateErrors.map(error => (
            <div>{error}</div>
          ))
        }
      </form>
    </div>
  )
}

export default BookingsCard;
