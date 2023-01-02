import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar'

import BookingInstructions from '../BookingInstructions';

import * as bookingActions from '../../../store/booking'
import isBetweenDates from '../../../utils/isBetweenDates';
import calculateNumberNights from '../../../utils/calculateNumberNights';



import './BookingsCard.css'

const BookingsCard = ({spot, formattedAvgRating}) => {

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
    if (!selectedDate && (!startDate && !endDate)) {
      console.log('first')
      setDisableBooking(true)
    }
    if (!selectedDate && (startDate && !endDate)) {
      console.log('second')
      setDisableBooking(true)
    }
    if (selectedDate && !dateErrors.length) setDisableBooking(false)
    console.log('disable: ', disableBooking)
  },[startDate, endDate, selectedDate, dateErrors])

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
    setDisableBooking(true)
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

  // console.log('start date: ', startDate)

  return (
    <div id="booking-card-holder">


      <div className='calendar-container'>
        <BookingInstructions currentUser={currentUser} startDate={startDate} endDate={endDate} selectedDate={selectedDate} spot={spot}/>
        <Calendar
          className={'react-calendar'}
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
          <div className='clear-dates-holder'>
            <button className='clear-dates-button' type="button" onClick={clearDates}>Clear Dates</button>
          </div>
      </div>
      {!currentUser || currentUser.id !== spot.ownerId && (
        <div className='reservation-card'>
          <div className='reservation-card-top'>
            <div>
              <span className='price-highlight'>${spot.price}</span> night
            </div>
            <div className='align-bottom'>
              <h6>
              <i className="fa-solid fa-star"/> {formattedAvgRating}
              <span> • </span>
              {spot.numReviews} {(spot.numReviews > 1 || spot.numReviews < 1) && `reviews`}{spot.numReviews === 1 && 'review'}
              </h6>
            </div>
          </div>
          <form className='booking-form' onSubmit={handleSubmit}>
            <div className='date-picker'>
              <div className='left-input'>
                <label>Check-in</label>
                <input disabled className='date-display date-checkin' value={startDate ? formatDateShort(startDate) : 'Select on calendar'}></input>
              </div>
              <div className='right-input'>
                <label>Check-out</label>
                <input disabled className='date-display date-checkin' value={selectedDate ? formatDateShort(selectedDate[1]) : 'Select on calendar'}></input>
              </div>
            </div>
            <button className='reservation-button login-button' type="submit" disabled={disableBooking}>{selectedDate ? 'Reserve' : 'Select reservation'}</button>
            {dateErrors &&
              dateErrors.map(error => (
                <div className='errors'>{error}</div>
              ))
            }

          </form>
          {selectedDate && !dateErrors.length && (
            <>
            <div className='not-charged'>
              You won't be charged yet
            </div>
            <div className='flex price-calculator'>
              <div className='price-underline'>${spot.price} x {calculateNumberNights(selectedDate[0], selectedDate[1])} nights </div>
              <div>${spot.price * calculateNumberNights(selectedDate[0], selectedDate[1])}</div>
            </div>
            <div className='flex estimated-price'>
              <div>Estimated total price</div>
              <div>${spot.price * calculateNumberNights(selectedDate[0], selectedDate[1])}</div>
            </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default BookingsCard;
