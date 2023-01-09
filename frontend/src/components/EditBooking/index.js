import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import * as bookingActions from '../../store/booking'
import * as spotActions from '../../store/spot'

import BookingInstructions from "../SpotDetails/BookingInstructions";

import isBetweenDates from "../../utils/isBetweenDates";
import formatAvgRating from '../../utils/formatAvgRating'
// import { initial } from "lodash";

import './EditBooking.css'

const EditBooking = () => {

  const { bookingId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const bookings = useSelector(state => state.bookings)
  const spot = useSelector(state => state.spots.singleSpot)
  const currentUser = useSelector(state => state.session.user)

  const [loaded, setLoaded] = useState(false)
  const [initialLoad, setInitialLoad] = useState(false)
  const [spotId, setSpotId] = useState()
  const [selectedDate, setDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateErrors, setDateErrors] = useState([])
  const [disableBooking, setDisableBooking] = useState(true)

  // console.log(initialLoad)

  useEffect(() => {
    let currentBooking
    // console.log('fetching current bookings')
    dispatch(bookingActions.getCurrentBookings())
      .then(() => setInitialLoad(true))

    currentBooking = Object.values(bookings).find(booking => String(booking.id) === bookingId)
    // console.log('current bookings: ', Object.values(bookings))
    // console.log('currentBooking: ', currentBooking)
    // console.log(initialLoad)
    if (currentBooking) {
      setSpotId(currentBooking.spotId)
      setDate([new Date(currentBooking.startDate), new Date(currentBooking.endDate)])
      setStartDate(new Date(currentBooking.startDate))
    }
    if (spotId) {
      // console.log('fetching spot details')
      dispatch(bookingActions.getAllBookings(spotId));
      dispatch(spotActions.getSpotById(spotId))
        .then(setLoaded(true));
    }
  },[dispatch, spotId, initialLoad])

  // i need to:
  // display basic info for the spot
  // display all the spot's bookings, mimicking bookingcalendar component
  // so it would probably be easiest to fetch singleSpot and spot bookings
  // display current booking information on load and refresh
  // delete booking button
  // change booking brings you back to trips

  // get all current bookings
  // find the booking by bookingId
  // fetch single spot
  // fetch bookings for that spot
  // display the calendar

  useEffect(() => {
    // if startDate or endDate is between the selectedDates,
    // throw an error message
      setDateErrors([])
      for (let tripId in bookings) {
        if (bookings[tripId].id !== Number(bookingId)) {
          let targetBooking = bookings[tripId]
          // console.log('targetbooking: ', targetBooking)
          // console.log('id in booking list: ', bookings[tripId].id)
          // console.log('id in params: ', bookingId)
          const startDate = targetBooking.startDate
          // console.log(startDate)
          const endDate = targetBooking.endDate
          if (isBetweenDates(startDate, selectedDate[0], selectedDate[1])) {
            // console.log(bookings[tripId].id)
            setDateErrors(['Spot is already booked for these dates'])
          }
          if (isBetweenDates(endDate, selectedDate[0], selectedDate[1])) {
            setDateErrors(['Spot is already booked for these dates'])
          }
        } else {
          setDateErrors([])
        }
    }
    if (new Date(selectedDate[0]).getDay() === new Date(selectedDate[1]).getDay() &&
    new Date(selectedDate[0]).getMonth() === new Date(selectedDate[1]).getMonth() &&
    new Date(selectedDate[0]).getFullYear() === new Date(selectedDate[1]).getFullYear()) {
    setDateErrors(['Please select two different dates to reserve this listing'])
    setStartDate('')
    setEndDate('')
    }
  },[selectedDate, bookings])

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
    if (selectedDate) {
      setStartDate(selectedDate[0])
      setEndDate(selectedDate[1])
    }
  },[startDate, endDate, selectedDate, dateErrors])


  const alreadyBooked = ({activeStartDate, date, view}) => {
    for (let tripId in bookings) {
      if (bookings[tripId].id !== Number(bookingId)) {
        const startDate = bookings[tripId].startDate
        const endDate = bookings[tripId].endDate
        if (isBetweenDates(date, startDate, endDate)) return true
      }
    }
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const booking = {
      "startDate": selectedDate[0],
      "endDate": selectedDate[1]
    }
    dispatch(bookingActions.changeBooking(bookingId, booking))
      .then(() => history.push(`/trips`))

  }

  const clearDates = () => {
    let currentBooking = Object.values(bookings).find(booking => String(booking.id) === bookingId)
    // console.log('clear dates booking: ', currentBooking)
    setDate([new Date(currentBooking.startDate), new Date(currentBooking.endDate)])
    setStartDate(new Date(currentBooking.startDate))
    setDateErrors([])
  }

  const selectDates = (value, event) => {
    if (!startDate) setStartDate(new Date(value))
    if (startDate && startDate < new Date(value)) {
      // console.log('1')
      setEndDate(new Date(value))
    }
    if (startDate && startDate > new Date(value)) {
      // console.log('2')
      setEndDate(startDate)
      setStartDate(new Date(value))
    }
    if (endDate) {
      // console.log('3')
      setStartDate(new Date(value))
      setEndDate('')
      setDate('')
    }
  }

  const formatDateShort = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date)
  }

  if (!loaded) {
    return (
      <h1>Not loaded, sorry!</h1>
    )
  }

  return (
    <div className="flex outer-container edit-booking">
      <div className="edit-title-holder">
      <h1 className="edit-title">Edit Your Booking</h1><Link to='/trips'>Back</Link>
      </div>
    <div id="booking-card-holder" className="edit-booking-border">


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
            <button className='clear-dates-button' type="button" onClick={clearDates}>Reset Dates</button>
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
          <i className="fa-solid fa-star"/> {spot.avgStarRating && formatAvgRating(spot.avgStarRating)}
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
        <button className='reservation-button login-button' type="submit" disabled={disableBooking}>{selectedDate ? 'Change reservation' : 'Select reservation'}</button>
        {dateErrors &&
          dateErrors.map(error => (
            <div className='errors'>{error}</div>
          ))
        }

      </form>
      </div>
    )}
  </div>
  </div>
  )
}

export default EditBooking;
