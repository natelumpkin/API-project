import { csrfFetch } from "./csrf"

const SET_USER = 'session/set_user'
const REMOVE_USER = 'session/remove_user'

// ACTION CREATORS

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

// THUNKS

export const logInUser = (user) => async dispatch => {
  const { credential, password } = user;

  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });

  const userData = await response.json();

  dispatch(setUser(userData));

  return userData;
}

export const getCurrentUser = () => async dispatch => {
  const response = await fetch('/api/session');

  const user = await response.json();

  dispatch(setUser(user))

  return user;
}

// REDUCER

const initialState = {
  user: null
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const newState = { ...state};
      newState.user = action.user
      return newState;
    }
    case REMOVE_USER: {
      const newState = { ...state};
      newState.user = null;
      return newState;
    }
    default:
      return state
  }
}

export default sessionReducer;
