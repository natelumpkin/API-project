import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar'

import BookingInstructions from '../BookingInstructions';

import * as bookingActions from '../../../store/booking'
import isBetweenDates from '../../../utils/isBetweenDates';



import './BookingsCard.css'

const BookingsCard = ({spot}) => {

  const dispatch = useDispatch()

  const bookings = useSelector(state => state.bookings)
  const currentUser = useSelector(state => state.session.user)

  const [selectedDate, setDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateErrors, setDateErrors] = useState([])
  const [disableBooking, setDisableBooking] = useState(true)

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
      if (isBetweenDates(date, startDate, endDate)) return true
    }
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const booking = {
      "startDate": selectedDate[0],
      "endDate": selectedDate[1]
    }
    dispatch(bookingActions.postNewBooking(spot.id, booking))
      .then(() => dispatch(bookingActions.getAllBookings(spot.id)))
    clearDates()
  }

  const clearDates = () => {
    setDate('')
    setStartDate('')
    setEndDate('')
    setDateErrors([])
  }

  const selectDates = (value, event) => {
    if (!startDate) setStartDate(new Date(value))
    if (startDate && startDate < new Date(value)) {
      setEndDate(new Date(value))
    }
    if (startDate && startDate > new Date(value)) {
      setEndDate(startDate)
      setStartDate(new Date(value))
    }
    if (endDate) {
      setStartDate(new Date(value))
      setEndDate('')
      setDate('')
    }
  }

  const formatDateShort = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date)
  }

  console.log('start date: ', startDate)

  return (
    <div id="booking-card-holder">

      <BookingInstructions currentUser={currentUser} startDate={startDate} endDate={endDate} selectedDate={selectedDate} spot={spot}/>

      <div className='calendar-container'>
        <Calendar
          value={selectedDate}
          onChange={setDate}
          onClickDay={selectDates}
          showDoubleView={false}
          showFixedNumberOfWeeks={false}
          minDate={new Date()}
          minDetail={'month'}
          selectRange={true}
          goToRangeStartOnSelect={true}
          tileDisabled={alreadyBooked}
          returnValue={'range'}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          />
      </div>
      {!currentUser || currentUser.id !== spot.ownerId && (
        <form onSubmit={handleSubmit}>
          <input className='date-display' value={startDate ? formatDateShort(startDate) : 'Select check in date'}></input>
          <input className='date-display' value={selectedDate ? formatDateShort(selectedDate[1]) : 'Select check out date'}></input>
          <button type="submit" disabled={disableBooking}>Reserve</button>
          <button type="button" onClick={clearDates}>Clear Dates</button>
          {dateErrors &&
            dateErrors.map(error => (
              <div>{error}</div>
            ))
          }
        </form>
      )}
    </div>
  )
}

export default BookingsCard;
