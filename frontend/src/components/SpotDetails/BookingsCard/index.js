import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar'

import BookingInstructions from '../BookingInstructions';
import { Modal } from '../../../context/Modal';
import LoginForm from '../../LoginFormModal/LoginForm';

import * as bookingActions from '../../../store/booking'
import isBetweenDates from '../../../utils/isBetweenDates';
import calculateNumberNights from '../../../utils/calculateNumberNights';



import './BookingsCard.css'

const BookingsCard = ({spot, formattedAvgRating}) => {

  const dispatch = useDispatch()

  const bookings = useSelector(state => state.bookings)
  const currentUser = useSelector(state => state.session.user)

  const [showLoginModal, setShowLoginModal] = useState(false)
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
    console.log(selectedDate)
    for (let bookingId in bookings) {
      const startDate = bookings[bookingId].startDate
      const endDate = bookings[bookingId].endDate
      if (isBetweenDates(startDate, selectedDate[0], selectedDate[1])) {
        setDateErrors(['Spot is already booked for these dates'])
        return
      }
      if (isBetweenDates(endDate, selectedDate[0], selectedDate[1])) {
        setDateErrors(['Spot is already booked for these dates'])
        return
      }
    }
    if (new Date(selectedDate[0]).getDay() === new Date(selectedDate[1]).getDay() &&
        new Date(selectedDate[0]).getMonth() === new Date(selectedDate[1]).getMonth() &&
        new Date(selectedDate[0]).getFullYear() === new Date(selectedDate[1]).getFullYear()) {
        setDateErrors(['Please select two different dates to reserve this listing'])
        setStartDate('')
        setEndDate('')
    } else {
      setDateErrors([])
    }
  },[selectedDate])

  useEffect(() => {
    if (dateErrors.length) setDisableBooking(true)
    if (!selectedDate && (!startDate && !endDate)) {
      // console.log('first')
      setDisableBooking(true)
    }
    if (!selectedDate && (startDate && !endDate)) {
      // console.log('second')
      setDisableBooking(true)
    }

    if (selectedDate && !dateErrors.length) setDisableBooking(false)
    // console.log('disable: ', disableBooking)
  },[startDate, endDate, selectedDate, dateErrors])

  const alreadyBooked = ({activeStartDate, date, view}) => {
    const today = new Date()
    if (date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()) {
        return true
      }
    for (let bookingId in bookings) {
      const startDate = bookings[bookingId].startDate
      const endDate = bookings[bookingId].endDate
      if (isBetweenDates(date, startDate, endDate)) return true
    }
    return false
  }

  const formatPrice = (price) => {
    let stringPrice = String(price)
    let decimalSplit = stringPrice.split('.')
    if (decimalSplit[1]?.length > 2) {
      console.log(decimalSplit[1].slice(0,2))
      return [decimalSplit[0],decimalSplit[1].slice(0,2)].join('.')
    }
    else {
      return price
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentUser) {
      setShowLoginModal(true)
    } else {
      const booking = {
        "startDate": selectedDate[0],
        "endDate": selectedDate[1]
      }
      dispatch(bookingActions.postNewBooking(spot.id, booking))
        .then(() => dispatch(bookingActions.getAllBookings(spot.id)))
      clearDates()
    }
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
      console.log('1')
      setEndDate(new Date(value))
    }
    if (startDate && startDate > new Date(value)) {
      console.log('2')
      setEndDate(startDate)
      setStartDate(new Date(value))
    }
    if (endDate) {
      console.log('3')
      setStartDate(new Date(value))
      setEndDate('')
      setDate('')
    }
    console.log('end date in select: ', endDate)
  }

  const formatDateShort = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date)
  }

  // console.log('start date: ', startDate)
  // console.log('end date: ', endDate)

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
                <input disabled className='date-display date-checkin' value={endDate ? formatDateShort(endDate) : 'Select on calendar'}></input>
              </div>
            </div>
            <button className='reservation-button login-button' type="submit" disabled={disableBooking}>{selectedDate ? 'Reserve' : 'Select reservation'}</button>
            {showLoginModal && (
              <Modal onClose={() => setShowLoginModal(false)}>
                <LoginForm setShowLoginModal={setShowLoginModal}  />
              </Modal>
            )}
            {dateErrors &&
              dateErrors.map(error => (
                <div className='errors'>{error}</div>
              ))
            }

          </form>
          {selectedDate && !dateErrors?.length && (
            <>
            <div className='not-charged'>
              You won't be charged yet
            </div>
            <div className='flex price-calculator'>
              <div className='price-underline'>${spot.price} x {calculateNumberNights(selectedDate[0], selectedDate[1])} nights </div>
              <div>${formatPrice(spot.price * calculateNumberNights(selectedDate[0], selectedDate[1]))}</div>
            </div>
            <div className='flex estimated-price'>
              <div>Estimated total price</div>
              <div>${formatPrice(spot.price * calculateNumberNights(selectedDate[0], selectedDate[1]))}</div>
            </div>
            </>
          )}
        </div>
    </div>
  )
}

export default BookingsCard;
