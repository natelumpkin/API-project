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
    if (description.length > 500) errors.push('Please provide a description of 500 characters or less')
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
    <div className='create-spot-exterior-flex'>
      <div className='create-spot-exterior-holder'>
    <h2>Host Your Home</h2>
    <Link to='/'>Exit</Link>
    <div className='form-holder'>
      <form className='create-spot-form' onSubmit={submitSpot}>
        <div className='location-exterior'>
          <h4 className='form-directions'>Where's your place located?</h4>
          <div className='location-form'>
            <div className='input'>
            <label className='location-label' htmlFor='address'>Street</label>
            <input className='location-input' placeholder='Street address here...' id='address' type='text' value={address} onChange={(e) => setAddress(e.target.value)}></input>
            </div>
            <div className='input'>
            <label className='location-label' htmlFor='city'>City</label>
            <input className='location-input' placeholder='City name here...' id='city' type='text' value={city} onChange={(e) => setCity(e.target.value)}></input>
            </div>
            <div className='input'>
            <label className='location-label' htmlFor='state'>State</label>
            <input className='location-input' placeholder='State name here...' id='state' type='text' value={state} onChange={(e) => setState(e.target.value)}></input>
            </div>
            <div id="country-input" className='input'>
            <label className='location-label' htmlFor='country'>Country</label>
            <input className='location-input' placeholder='Country name here...' id='country' type='text' value={country} onChange={(e) => setCountry(e.target.value)}></input>
            </div>
            {/* <label htmlFor='lat'>Latitude</label>
            <input id='lat' type='text' value={lat} onChange={(e) => setLat(e.target.value)}></input>
            <label htmlFor='lng'>Longitude</label>
            <input id='lng' type='text' value={lng} onChange={(e) => setLng(e.target.value)}></input> */}
          </div>
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
          <h4 className='form-directions'>Please add a preview image</h4>
          <div className='input single-input'>
          <label className='location-label photo-label' htmlFor='previewPhoto'>Preview Photo</label>
          <input className='location-input photo-input' id="previewPhoto" placeholder='URL here...' type='text' value={url1} onChange={(e) => seturl1(e.target.value)}></input>
          </div>
          {photoErrors.length > 0 && (
              <div className='photo-errors'>
                A preview photo is required
              </div>
            )}
        </div>
        <div>
          <h4 className='form-directions'>Let's give your place a name and description</h4>
          <div className='input description-input'>
          <label className='name-description-title' htmlFor='name'>Create your title</label>
          <textarea placeholder='Adorable home near you' className='create-text' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          <div className='character-counter'>
            <span>{name.length}/49</span>
          </div>
          </div>
          <div className='input description-input'>
          <label className='name-description-title' htmlFor='description'>Create your description</label>
          <textarea placeholder="You'll have a great time at this comfortable place to stay" className='create-text description' id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
          <div className='character-counter'>
            <span>{description.length}/499</span>
          </div>
          </div>
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
          <h4 className='form-directions'>Now for the fun part - set your price</h4>
          <div className='price-form'>
            <label htmlFor='price'>Price</label>
            <span onClick={() => incrementPrice()}> + </span>
            <input id='price' type='number' value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <span onClick={() => decrementPrice()}> - </span>
          </div>
          {priceErrors.length > 0 && (
              <div className='price-errors'>
                Please enter a valid price per night
              </div>
            )}

        </div>
        <button className='publish-button'>Publish Your Listing</button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default CreateSpotPage;
