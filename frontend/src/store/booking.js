import { csrfFetch } from "./csrf";
import normalizeData from "../utils/normalizeData";

const LOAD_BOOKINGS = 'bookings/load'
const ADD_BOOKING = 'bookings/new'
const UPDATE_BOOKING = 'bookings/update'
const DELETE_BOOKING = 'bookings/delete'

export const getBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings
})

const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking
})

const updateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  booking
})

const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId
})

export const getAllBookings = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const data = await response.json()
    dispatch(getBookings(data))
    return data
  } else {
    const errors = await response.json()
    return errors;
  }
}

export const getCurrentBookings = () => async dispatch => {
  const response = await csrfFetch(`/api/bookings/current`)
  if (response.ok) {
    const data = await response.json()
    dispatch(getBookings(data))
    return data
  } else {
    const errors = await response.json()
    return errors;
  }
}

export const postNewBooking = (spotId, booking) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(booking)
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(addBooking(data))
    return data
  } else {
    const errors = await response.json()
    return errors;
  }
}

export const changeBooking = (bookingId, booking) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(booking)
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(addBooking(data))
    return data
  } else {
    const errors = await response.json()
    console.log(errors)
    return errors;
  }
}

export const removeBooking = (bookingId) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    // const data = await response.json()
    dispatch(deleteBooking(bookingId))
  } else {
    const errors = await response.json()
    return errors
  }
}

const initialState = {}

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS: {
      // console.log(action.bookings)
      const data = normalizeData(action.bookings.Bookings);
      // console.log(data)
      const newState = data;
      return newState;
    }
    default: {
      return state;
    }
    case ADD_BOOKING: {
      const newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    }
    case DELETE_BOOKING: {
      const newState = {...state}
      delete newState[action.bookingId]
      return newState
    }
  }
}

export default bookingReducer;
