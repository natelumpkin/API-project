import { csrfFetch } from "./csrf";
import normalizeSpots from "./utils/normalizeSpots";

// ACTION TYPES

const ALL_SPOTS = '/spots/getAllSpots';
const ONE_SPOT = '/spots/getSpotById';
const CURRENT_SPOTS = '/spots/getCurrentUserSpots';

// ACTION CREATORS

const loadAllSpots = (spotData) => {
  return {
    type: ALL_SPOTS,
    spots: spotData
  }
}

// do I really need spotId for this?
const loadSingleSpot = (spotId) => {
  return {
    type: ONE_SPOT,
    spotId
  }
}

// do I really need userId for this?
const loadUserSpots = (userId) => {
  return {
    type: CURRENT_SPOTS,
    userId
  }
}

// THUNKS

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('api/spots');

  const spotData = await response.json();

  dispatch(loadAllSpots(spotData));

  return spotData;
}

// REDUCER AND INITIAL STATE

const initialState = {
  allSpots: {},
  singleSpot: {
    spotData: {},
    spotImages: [],
    owner: {}
  },
  userSpots: {}
}

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SPOTS: {
      const newState = {
        singleSpot: {
          spotData: { ...[state.singleSpot.spotData] },
          spotImages: [ ...[state.singleSpot.spotImages] ],
          owner: { ...[state.singleSpot.owner] }
        },
        userSpots: { ...[state.userSpots]}
      }
      newState.spotData = normalizeSpots(action.spots);
      return newState;
    }
    default: {
      return state
    }
  }
}

export default spotReducer;
