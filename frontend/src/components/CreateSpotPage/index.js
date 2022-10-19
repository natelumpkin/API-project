import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { createNewSpot, addSpotImageById } from '../../store/spot';

import './CreateSpotPage.css'

const CreateSpotPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  // const [lat, setLat] = useState('')
  // const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(100)

  const [url1, seturl1] = useState('');

  const [locationErrors, setLocationErrors] = useState([])
  const [photoErrors, setPhotoErrors] = useState([])
  const [descriptionErrors, setDescriptionErrors] = useState([])
  const [priceErrors, setPriceErrors] = useState([])

  const handleLocationErrors = () => {
    const locationErrors = []
    if (!address.length) locationErrors.push('Street address')
    if (!city.length) locationErrors.push('City')
    if (!country.length) locationErrors.push('Country')
    // if (lat === '') locationErrors.push('Latitude')
    // if (lng === '') locationErrors.push('Longitude')
    // if (isNaN(lat) || lat < -90 || lat > 90) locationErrors.push('Please provide a valid latitude')
    // if (isNaN(lng) || lng < -180 || lng > 180) locationErrors.push('Please provide a valid longitude')
    return locationErrors;
  }

  const handlePhotoErrors = () => {
    let errors = [];
    //console.log('url1: ', url1);
    if (!url1.length) errors.push('At least one photo is required')
    return errors;
  }

  const handleDescriptionErrors = () => {
    let errors = [];
    if (!name.length) errors.push('Name')
    if (name.length > 50) errors.push('Please provide a name under 50 characters')
    if (!description.length) errors.push('Description')
    return errors;
  }

  const handlePriceErrors = () => {
    let errors = [];
    if (price < 1) errors.push('Please give your spot a price per night')
    if (isNaN(price)) errors.push('Please enter a number')
    return errors;
  }

  const reset = () => {
    setAddress('');
    setCity('')
    setState('')
    setCountry('')
    // setLat('')
    // setLng('')
    setName('')
    setDescription('')
    setPrice(100)
    setLocationErrors([])
    setDescriptionErrors([])
    setPriceErrors([])
    setPhotoErrors([])
  }

  const submitSpot = async (e) => {
    e.preventDefault();

  const locationErrors = handleLocationErrors();
  setLocationErrors(locationErrors);
  //console.log('location errors: ', locationErrors);

  const photoErrors = handlePhotoErrors();
  setPhotoErrors(photoErrors);

  const descriptionErrors = handleDescriptionErrors();
  setDescriptionErrors(descriptionErrors);

  const priceErrors = handlePriceErrors();
  setPriceErrors(priceErrors);

  if (locationErrors.length > 0 || photoErrors.length > 0 || descriptionErrors.length > 0 || priceErrors.length > 0) {
    // console.log('location errors:', locationErrors)
    // console.log('photo errors: ', photoErrors)
    // console.log('description errors: ', descriptionErrors)
    // console.log('price errors: ', priceErrors)
    // console.log('entering if statement')
    return;
  } else {

      const spotData = {
        address,
        city,
        state,
        country,
        // lat,
        // lng,
        name,
        description,
        price
      }

      const photo1 = { url: url1, preview: true }


      //console.log('photo1: ', photo1);
      const newSpot = await dispatch(createNewSpot(spotData));
      if (photo1) {
        const newPhoto1 = await dispatch(addSpotImageById(newSpot.id, photo1))
      }


      reset();
      history.push(`/spots/${newSpot.id}`)
      return newSpot;
    }
  }

  const incrementPrice = (e) => {
    //console.log('increment running')
    setPrice(price + 1);
  }

  const decrementPrice = (e) => {
    //console.log('decrement running')
    setPrice(price - 1);
  }

  return (
    <div>
    <h2>Host Your Home</h2>
    <Link to='/'>Exit</Link>
    <div>
      <form onSubmit={submitSpot}>
        <div>
          <h4>Where's your place located?</h4>
          <label htmlFor='address'>Street Address</label>
          <input id='address' type='text' value={address} onChange={(e) => setAddress(e.target.value)}></input>
          <label htmlFor='city'>City</label>
          <input id='city' type='text' value={city} onChange={(e) => setCity(e.target.value)}></input>
          <label htmlFor='state'>State</label>
          <input id='state' type='text' value={state} onChange={(e) => setState(e.target.value)}></input>
          <label htmlFor='country'>Country</label>
          <input id='country' type='text' value={country} onChange={(e) => setCountry(e.target.value)}></input>
          {/* <label htmlFor='lat'>Latitude</label>
          <input id='lat' type='text' value={lat} onChange={(e) => setLat(e.target.value)}></input>
          <label htmlFor='lng'>Longitude</label>
          <input id='lng' type='text' value={lng} onChange={(e) => setLng(e.target.value)}></input> */}
            {locationErrors.length > 0 && (
              <div className='location-errors'>
                To continue, please provide this required info:
                <ul>
                {locationErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
              </div>
            )}
        </div>
        <div>
          <h4>Please add a preview image</h4>
          <label htmlFor='previewPhoto'>Preview Photo</label>
          <input id="previewPhoto" placeholder='URL here...' type='text' value={url1} onChange={(e) => seturl1(e.target.value)}></input>
          {photoErrors.length > 0 && (
              <div className='photo-errors'>
                A preview photo is required
              </div>
            )}
        </div>
        <div>
          <h4>Let's give your place a name and description</h4>
          <label htmlFor='name'>Name</label>
          <textarea id='name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          <label htmlFor='description'>Description</label>
          <textarea id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
          {descriptionErrors.length > 0 && (
              <div className='location-errors'>
                To continue, please provide this required info:
                <ul>
                {descriptionErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
              </div>
            )}
        </div>
        <div>
          <h4>Now for the fun part - set your price</h4>
          <label htmlFor='price'>Price</label>
          <span onClick={() => incrementPrice()}> + </span>
          <input id='price' type='number' value={price} onChange={(e) => setPrice(e.target.value)}></input>
          <span onClick={() => decrementPrice()}> - </span>
          {priceErrors.length > 0 && (
              <div className='price-errors'>
                Please enter a valid price per night
              </div>
            )}
        </div>
        <button>Publish Your Listing</button>
      </form>
    </div>
    </div>
  )
}

export default CreateSpotPage;
