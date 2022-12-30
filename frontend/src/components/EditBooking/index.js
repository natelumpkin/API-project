import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import * as bookingActions from '../../store/booking'
import * as spotActions from '../../store/spot'

import BookingInstructions from "../SpotDetails/BookingInstructions";

import isBetweenDates from "../../utils/isBetweenDates";



const EditBooking = () => {

  const { bookingId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const bookings = useSelector(state => state.bookings)
  const spot = useSelector(state => state.spots.singleSpot)
  const currentUser = useSelector(state => state.session.user)

  const [loaded, setLoaded] = useState(false)
  const [spotId, setSpotId] = useState()
  const [selectedDate, setDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateErrors, setDateErrors] = useState([])
  const [disableBooking, setDisableBooking] = useState(true)

  useEffect(() => {
    let currentBooking
    dispatch(bookingActions.getCurrentBookings())

    currentBooking = Object.values(bookings).find(booking => String(booking.id) === bookingId)
    console.log(Object.values(bookings))
    console.log('currentBooking: ', currentBooking)
    if (currentBooking) {
      setSpotId(currentBooking.spotId)
      setDate([new Date(currentBooking.startDate), new Date(currentBooking.endDate)])
      setStartDate(new Date(currentBooking.startDate))
    }
    if (spotId) {
      dispatch(bookingActions.getAllBookings(spotId))
      dispatch(spotActions.getSpotById(spotId))
        .then(setLoaded(true))
    }
  },[dispatch, spotId])

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

  console.log('selected date: ', selectedDate)

  useEffect(() => {
    // if startDate or endDate is between the selectedDates,
    // throw an error message
    for (let tripId in bookings) {
      if (bookings[tripId].id !== Number(bookingId)) {
        const startDate = bookings[bookingId].startDate
        const endDate = bookings[bookingId].endDate
        if (isBetweenDates(startDate, selectedDate[0], selectedDate[1])) {
          setDateErrors(['Spot is already booked for these dates'])
        }
        if (isBetweenDates(endDate, selectedDate[0], selectedDate[1])) {
          setDateErrors(['Spot is already booked for these dates'])
        }
      } else {
        setDateErrors([])
      }
    }
  },[selectedDate, bookings])

  useEffect(() => {
    if (dateErrors.length) setDisableBooking(true)
    if (selectedDate && !dateErrors.length) setDisableBooking(false)
  })

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
    if (startDate) setEndDate(new Date(value))
    if (endDate) {
      setStartDate(new Date(value))
      setEndDate('')
    }
  }

  const formatDateShort = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date)
  }

  if (!loaded) {
    return null
  }

  return (
    <div>

    <BookingInstructions currentUser={currentUser} startDate={startDate} endDate={endDate} selectedDate={selectedDate} spot={spot}/>

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
    {!currentUser || currentUser.id !== spot.ownerId && (
      <form onSubmit={handleSubmit}>
        <input className='date-display' value={selectedDate ? formatDateShort(selectedDate[0]) : 'Select check in date'}></input>
        <input className='date-display' value={selectedDate ? formatDateShort(selectedDate[1]) : 'Select check out date'}></input>
        <button type="submit" disabled={disableBooking}>Change Reservation</button>
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

export default EditBooking;
