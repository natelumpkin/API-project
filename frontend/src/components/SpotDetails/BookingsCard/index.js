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
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateErrors, setDateErrors] = useState([])
  const [disableBooking, setDisableBooking] = useState(true)

  console.log('currently selected date: ', selectedDate)
  // console.log(selectedDate[0])
  // console.log(selectedDate[1])

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
    dispatch(bookingActions.getAllBookings(spot.id))
    setDate('')
  }

  const clearDates = () => {
    setDate('')
    setStartDate('')
    setEndDate('')
    setDateErrors([])
  }

  const selectDates = (value, event) => {
    if (!startDate) setStartDate(new Date(value))
    if (startDate) setEndDate(new Date(value))
    if (endDate) {
      setStartDate(new Date(value))
      setEndDate('')
    }
  }

  const DisplayBookingInstructions = ({selectedDate, spot}) => {

    let formattedStartDate
    let formattedEndDate
    let numNights

    const calculateNumberNights = (date1, date2) => {
      const millisecondsBetween = date2 - date1
      const daysBetween = millisecondsBetween / 86400000
      return Math.floor(daysBetween)
    }

    if (selectedDate) {
      formattedStartDate = new Intl.DateTimeFormat('en-US',{day:"numeric",month:"short",year:"numeric"}).format(selectedDate[0])
      formattedEndDate = new Intl.DateTimeFormat('en-US',{day:"numeric",month:"short",year:"numeric"}).format(selectedDate[1])
    }


    return (
      <div>
        {!selectedDate && !startDate && (
          <>
          <h1>Select check-in date</h1>
          <h4>Select booking dates to reserve this spot</h4>
          </>
        )}
        {startDate && !endDate && (
          <>
          <h1>Select checkout date</h1>
          <h4>Select booking dates to reserve this spot</h4>
          </>
        )}
        {selectedDate && (
          <>
          <h1>{calculateNumberNights(selectedDate[0], selectedDate[1])} nights in {spot.city}</h1>
          <h4>{formattedStartDate} - {formattedEndDate}</h4>
          </>
        )}
      </div>
    )
  }

  const formatDateShort = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date)
  }

  console.log('start date: ', startDate)

  return (
    <div>
      <DisplayBookingInstructions selectedDate={selectedDate} spot={spot}/>
      <div className='calendar-container'>
        <Calendar
          value={selectedDate}
          onChange={setDate}
          onClickDay={selectDates}
          showDoubleView={false}
          showFixedNumberOfWeeks={false}
          minDate={new Date()}
          selectRange={true}
          goToRangeStartOnSelect={true}
          tileDisabled={alreadyBooked}
          returnValue={'range'}
          />
      </div>
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
    </div>
  )
}

export default BookingsCard;
