import { csrfFetch } from "./csrf";
import normalizeSpots from "../utils/normalizeSpots";

// ACTION TYPES

const ALL_SPOTS = '/spots/getAllSpots';
const ONE_SPOT = '/spots/getSpotById';
const CURRENT_SPOTS = '/spots/getCurrentUserSpots';
const CREATE_SPOT = '/spots/createNewSpot';
// const UPDATE_SPOT = '/spots/updateSpot';
const DELETE_SPOT = '/spots/deleteSpot'
const ADD_SPOTIMAGE = '/spots/addSpotImage';
const DELETE_SPOTIMAGE = '/spots/deleteSpotImage';
const CHANGE_PREVIEW = '/spots/changePreviewImage'

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

const addImage = (imageData) => {
  return {
    type: ADD_SPOTIMAGE,
    imageData
  }
}

const removeImage = (imageId) => {
  return {
    type: DELETE_SPOTIMAGE,
    imageId
  }
}

const changePreview = (imageId) => {
  return {
    type: CHANGE_PREVIEW,
    imageId
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
    throw spotData;
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

  //console.log('RESPONSE BEFORE FETCH')

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
    return updatedSpot
  } else {
    const errorMessage = await response.json();
    return errorMessage;
  }
}

export const deleteSpotById = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const deleteMessage = await response.json();
    dispatch(removeSpot(spotId));
    return deleteMessage;
  } else {
    const errorMessage = await response.json();
    return errorMessage;
  }
}

export const addSpotImageById = (spotId, imageData) => async dispatch => {
  // console.log('spotId: ', spotId)
  // console.log('imageData: ', imageData)
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(imageData)
  });

  if (response.ok) {
    const spotImage = await response.json();
    dispatch(addImage(spotImage));
    return spotImage
  } else {
    const errorMessage = await response.json();
    return errorMessage;
  }
}

export const uploadSpotImageByID = (spotId, imageData) => async dispatch => {
  const { images } = imageData;
  // console.log('images: ', images)
  const formData = new FormData();

  for (var i = 0; i < images.length; i++) {
    // console.log('attempting to add to formdata')
    // console.log(images[i])
    formData.append("images", images[i]);
  }

  // console.log('formData: ', formData)

  const response = await csrfFetch(`/api/spots/${spotId}/S3images`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
  // console.log('we are outside of the if block')
  if (response.ok) {
    const spotImages = await response.json()
    // console.log('ok response from upload images: ', spotImages)
    // console.log('return from thunk: ', spotImages)
    for (let image of spotImages.Images) {
      // console.log('image in thunk: ', image)
      // console.log('spotImages in thunk: ', spotImages)
      dispatch(addImage(image))
    }
    return spotImages
  } else {
    // console.log(response)
    const errors = await response.json()
    // console.log('error response from upload images: ', errors)
    return errors;
  }
}

export const deleteSpotImageById = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/spot-images/${imageId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const deleteMessage = await response.json();
    dispatch(removeImage(imageId));
    return deleteMessage;
  } else {
    const errorMessage = await response.json();
    //console.log(errorMessage);
    return errorMessage;
  }
}

export const updateSpotImageById = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/spot-images/${imageId}`,{
    method: 'PUT'
  })
  if (response.ok) {
    const newImage = await response.json();
    dispatch(changePreview(imageId));
    return newImage
  } else {
    const errors = await response.json();
    return errors
  }
}

// SOME DEMO DATA FOR TESTING REQUESTS

// const badReqBody = {
//   address: '',
//   city: '',
//   state: '',
//   country: '',
//   lat: 10000,
//   lng: -10000,
//   name: '',
//   description: '',
//   price: -100
// }

// const goodReqBody = {
//   address: '666 Updated Ave',
//   city: 'Updateville',
//   state: 'UD',
//   country: 'UPD',
//   lat: 90,
//   lt: -90,
//   name: 'Updated Spot',
//   description: 'The most updated spot in the whole world!',
//   price: 900
// }

// const imageBody = {
//   url: 'www.imageUrl.com',
//   preview: false
// }

// const badImageBody = {
//   url: 1,
//   preview: 'preview'
// }

// REDUCER AND INITIAL STATE

const initialState = {
  allSpots: {},
  singleSpot: {
    // spotData: {},
    SpotImages: [],
    Owner: {}
  },
  userSpots: {}
}

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SPOTS: {
      const newState = {
        singleSpot: {
          // spotData: { ...state.singleSpot.spotData },
          ...state.singleSpot,
          SpotImages: [ ...state.singleSpot.SpotImages ],
          Owner: { ...state.singleSpot.Owner }
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
      newState.singleSpot = action.spotData;
      // newState.singleSpot.spotImages = action.spotData.SpotImages;
      // newState.singleSpot.owner = action.spotData.Owner
      // delete newState.singleSpot.spotData.SpotImages;
      // delete newState.singleSpot.spotData.Owner;
      return newState;
    };
    case CURRENT_SPOTS: {
      const newState = {
        allSpots: { ...state.allSpots },
        singleSpot: {
          ...state.singleSpot,
          SpotImages: [ ...state.singleSpot.SpotImages ],
          Owner: { ...state.singleSpot.Owner }
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
          ...state.singleSpot,
          SpotImages: [ ...state.singleSpot.SpotImages ],
          Owner: { ...state.singleSpot.Owner }
        },
        userSpots: { ...state.userSpots}
      };
      newState.allSpots[action.spotData.id] = action.spotData;
      return newState;
    }
    case DELETE_SPOT: {
      const newState = {
        allSpots: { ...state.allSpots },
        singleSpot: {
          SpotImages: [],
          Owner: {}
        },
        userSpots: { ...state.userSpots }
      };
      delete newState.allSpots[action.spotId];
      return newState;
    }
    case ADD_SPOTIMAGE: {
      const newState = {
        allSpots: { ...state.allSpots },
        singleSpot: {
          ...state.singleSpot,
          SpotImages: [ ...state.singleSpot.SpotImages ],
          Owner: { ...state.singleSpot.Owner }
        },
        userSpots: { ...state.userSpots }
      };
      newState.singleSpot.SpotImages = [ ...newState.singleSpot.SpotImages, action.imageData ];
      return newState;
    };
    case DELETE_SPOTIMAGE: {
      // I'm not completely convinced this is working correctly
      const spotImagesCopy = [...state.singleSpot.SpotImages ];
     // console.log('SPOT IMAGES COPY: ', spotImagesCopy);
      const indexToRemove = spotImagesCopy.findIndex(image => image.id === action.imageId);
      //console.log('INDEX TO REMOVE: ', indexToRemove)
      spotImagesCopy.splice(indexToRemove, 1);
      //console.log('SPOT IMAGES COPY AFTER SPLICE: ', spotImagesCopy)
      const newState = {
        allSpots: { ...state.allSpots },
        singleSpot: {
          ...state.singleSpot,
          SpotImages: spotImagesCopy,
          Owner: { ...state.singleSpot.Owner }
        },
        userSpots: { ...state.userSpots }
      };
      //console.log('NEW STATE: ', newState)
      return newState;
    }
    case CHANGE_PREVIEW: {
      const newState = {
        allSpots: { ...state.allSpots },
        singleSpot: {
          ...state.singleSpot,
          SpotImages: [ ...state.singleSpot.SpotImages],
          Owner: { ...state.singleSpot.Owner },
          userSpots: { ...state.userSpots }
        }
      }
      for (let image of newState.singleSpot.SpotImages) {
        if (image.id === action.imageId) {
          image.preview = true
        } else {
          image.preview = false
        }
      }
      return newState;
    }
    default: {
      return state
    }
  }
}

export default spotReducer;
