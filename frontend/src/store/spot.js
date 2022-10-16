import { csrfFetch } from "./csrf";
import normalizeSpots from "./utils/normalizeSpots";

// ACTION TYPES

const ALL_SPOTS = '/spots/getAllSpots';
const ONE_SPOT = '/spots/getSpotById';
const CURRENT_SPOTS = '/spots/getCurrentUserSpots';
const CREATE_SPOT = '/spots/createNewSpot';
// const UPDATE_SPOT = '/spots/updateSpot';
const DELETE_SPOT = '/spots/deleteSpot'

// ACTION CREATORS

const loadAllSpots = (spotData) => {
  return {
    type: ALL_SPOTS,
    spots: spotData
  }
}

const loadSingleSpot = (spotData) => {
  return {
    type: ONE_SPOT,
    spotData
  }
}

const loadUserSpots = (spotData) => {
  return {
    type: CURRENT_SPOTS,
    spotData
  }
}

const addSpot = (spotData) => {
  return {
    type: CREATE_SPOT,
    spotData
  }
}

// do I need this or do I use addSpot?
// const updateSpot = (spotData) => {
//   return {
//     type: UPDATE_SPOT,
//     spotData
//   }
// }

const removeSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}

// THUNKS

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('api/spots');

  const spotData = await response.json();

  dispatch(loadAllSpots(spotData));

  return spotData;
}

export const getSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  const spotData = await response.json();

  if (response.ok) {
    dispatch(loadSingleSpot(spotData));
    return spotData;
  } else {
    return spotData;
  }
}

export const getCurrentUserSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current');

  const spotData = await response.json();

  if (response.ok) {
    dispatch(loadUserSpots(spotData));
    return spotData;
  }
}

export const createNewSpot = (spotData) => async dispatch => {

  console.log('RESPONSE BEFORE FETCH')

  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spotData)
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(addSpot(newSpot));
    return newSpot;
  } else {
    const errorMessage = await response.json();
    return errorMessage;
    }
}

export const updateSpotById = (spotId, spotData) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spotData)
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(addSpot(updatedSpot));
    console.log(updatedSpot);
    return updatedSpot
  } else {
    const errorMessage = await response.json();
    return errorMessage;
  }
}

const badReqBody = {
  address: '',
  city: '',
  state: '',
  country: '',
  lat: 10000,
  lng: -10000,
  name: '',
  description: '',
  price: -100
}

const goodReqBody = {
  address: '666 Updated Ave',
  city: 'Updateville',
  state: 'UD',
  country: 'UPD',
  lat: 90,
  lt: -90,
  name: 'Updated Spot',
  description: 'The most updated spot in the whole world!',
  price: 900
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
          spotData: { ...state.singleSpot.spotData },
          spotImages: [ ...state.singleSpot.spotImages ],
          owner: { ...state.singleSpot.owner }
        },
        userSpots: { ...state.userSpots}
      }
      newState.allSpots = normalizeSpots(action.spots);
      return newState;
    };
    case ONE_SPOT: {
      const newState = {
        allSpots: { ...state.allSpots},
        userSpots: { ...state.userSpots},
        singleSpot: {}
      };
      newState.singleSpot.spotData = action.spotData;
      newState.singleSpot.spotImages = action.spotData.SpotImages;
      newState.singleSpot.owner = action.spotData.Owner
      delete newState.singleSpot.spotData.SpotImages;
      delete newState.singleSpot.spotData.Owner;
      return newState;
    };
    case CURRENT_SPOTS: {
      const newState = {
        allSpots: { ...state.allSpots },
        singleSpot: {
          spotData: { ...state.singleSpot.spotData },
          spotImages: [ ...state.singleSpot.spotImages ],
          owner: { ...state.singleSpot.owner }
        },
        userSpots: {}
      };
      newState.userSpots = normalizeSpots(action.spotData);
      return newState;
    }
    case CREATE_SPOT: {
      const newState = {
        allSpots: { ...state.allSpots },
        singleSpot: {
          spotData: { ...state.singleSpot.spotData },
          spotImages: [ ...state.singleSpot.spotImages ],
          owner: { ...state.singleSpot.owner }
        },
        userSpots: { ...state.userSpots}
      };
      newState.allSpots[action.spotData.id] = action.spotData;
      return newState;
    }
    default: {
      return state
    }
  }
}

export default spotReducer;
