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
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(100)

  const [url1, seturl1] = useState('')
  const [url2, seturl2] = useState('')
  const [url3, seturl3] = useState('')
  const [url4, seturl4] = useState('')
  const [url5, seturl5] = useState('')

  const [locationErrors, setLocationErrors] = useState([])
  const [photoErrors, setPhotoErrors] = useState([])
  const [descriptionErrors, setDescriptionErrors] = useState([])
  const [priceErrors, setPriceErrors] = useState([])

  const handleLocationErrors = () => {
    const locationErrors = []
    if (!address.length) locationErrors.push('Street address')
    if (!city.length) locationErrors.push('City')
    if (!country.length) locationErrors.push('Country')
    if (lat === '' || isNaN(lat) || lat < -90 || lat > 90) locationErrors.push('Latitude')
    if (lng === '' || isNaN(lng) || lng < -180 || lng > 180) locationErrors.push('Longitude')
    console.log(lat);
    console.log(!lng)
    console.log(isNaN(lng));
    console.log(lng < -180);
    console.log(lng > 180);
    console.log(locationErrors);
    return locationErrors;
  }

  const handlePhotoErrors = () => {
    let errors = [];
    console.log('url1: ', url1);
    if (!url1.length) errors.push('At least one photo is required')
    return errors;
  }

  const handleDescriptionErrors = () => {
    let errors = [];
    if (!name.length) errors.push('Name')
    if (!description.length) errors.push('Description')
    return errors;
  }

  const handlePriceErrors = () => {
    let errors = [];
    if (price < 1) errors.push('Please give your spot a price per night')
    return errors;
  }

  const reset = () => {
    setAddress('');
    setCity('')
    setState('')
    setCountry('')
    setLat('')
    setLng('')
    setName('')
    setDescription('')
    setPrice(100)
    seturl1('')
    seturl2('')
    seturl3('')
    seturl4('')
    seturl5('')
    setLocationErrors([])
    setDescriptionErrors([])
    setPriceErrors([])
    setPhotoErrors([])
  }

  const submitSpot = async (e) => {
    e.preventDefault();

  const locationErrors = handleLocationErrors();
  setLocationErrors(locationErrors);
  console.log('location errors: ', locationErrors);

  const photoErrors = handlePhotoErrors();
  setPhotoErrors(photoErrors);

  const descriptionErrors = handleDescriptionErrors();
  setDescriptionErrors(descriptionErrors);

  const priceErrors = handlePriceErrors();
  setPriceErrors(priceErrors);

  if (locationErrors.length > 0 || photoErrors.length > 0 || descriptionErrors.length > 0 || priceErrors.length > 0) {
    console.log('location errors:', locationErrors)
    console.log('photo errors: ', photoErrors)
    console.log('description errors: ', descriptionErrors)
    console.log('price errors: ', priceErrors)
    console.log('entering if statement')
    return;
  } else {

      const spotData = {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      }

      const photo1 = { url: url1, preview: true }
      let photo2;
      let photo3;
      let photo4;
      let photo5;
      if (url2) {photo2 = { url: url2, preview: false }}
      if (url3) {photo3 = { url: url3, preview: false }}
      if (url4) {photo4 = { url: url4, preview: false }}
      if (url5) {photo5 = { url: url5, preview: false }}

      console.log('photo1: ', photo1);
      const newSpot = await dispatch(createNewSpot(spotData));
      if (photo1) {
        const newPhoto1 = await dispatch(addSpotImageById(newSpot.id, photo1))
      }
      if (photo2) {
        const newPhoto2 = await dispatch(addSpotImageById(newSpot.id, photo2))
      }
      if (photo3) {
        const newPhoto3 = await dispatch(addSpotImageById(newSpot.id, photo3))
      }
      if (photo4) {
        const newPhoto4 = await dispatch(addSpotImageById(newSpot.id, photo4))
      }
      if (photo5) {
        const newPhoto5 = await dispatch(addSpotImageById(newSpot.id, photo5))
      }

      reset();
      history.push(`/spots/${newSpot.id}`)
      return newSpot;
    }
  }

  const incrementPrice = (e) => {
    console.log('increment running')
    setPrice(price + 1);
  }

  const decrementPrice = (e) => {
    console.log('decrement running')
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
          <label htmlFor='lat'>Latitude</label>
          <input id='lat' type='text' value={lat} onChange={(e) => setLat(e.target.value)}></input>
          <label htmlFor='lng'>Longitude</label>
          <input id='lng' type='text' value={lng} onChange={(e) => setLng(e.target.value)}></input>
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
          <h4>Please add up to 5 photos</h4>
          <label htmlFor='previewPhoto'>Preview Photo URL</label>
          <input id="previewPhoto" type='text' value={url1} onChange={(e) => seturl1(e.target.value)}></input>
          <label htmlFor='photo2'>URL</label>
          <input id='photo2' type='text' value={url2} onChange={(e) => seturl2(e.target.value)}></input>
          <label htmlFor='photo3'>URL</label>
          <input id='photo3' type='text' value={url3} onChange={(e) => seturl3(e.target.value)}></input>
          <label htmlFor='photo4'>URL</label>
          <input id='photo4' type='text' value={url4} onChange={(e) => seturl4(e.target.value)}></input>
          <label htmlFor='photo5'>URL</label>
          <input id='photo5' type='text' value={url5} onChange={(e) => seturl5(e.target.value)}></input>
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
