import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { updateSpotById, getSpotById } from "../../../store/spot";

import DeleteSpotModal from "../../DeleteSpotModal";
import EditImages from "../../EditImages";


const UpdateSpotForm = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const history = useHistory();

  const spotInfo = useSelector(state => state.spots.singleSpot);

  const [address, setAddress] = useState("loading" || spotInfo.address);
  const [city, setCity] = useState("loading" || spotInfo.city)
  const [state, setState] = useState("loading" || spotInfo.state)
  const [country, setCountry] = useState("loading" || spotInfo.country)
  // const [lat, setLat] = useState(spotInfo.lat)
  // const [lng, setLng] = useState(spotInfo.lng)
  const [name, setName] = useState("loading" || spotInfo.name)
  const [description, setDescription] = useState("loading" || spotInfo.description)
  const [price, setPrice] = useState("loading" || spotInfo.price)



  const [locationErrors, setLocationErrors] = useState([])
  const [descriptionErrors, setDescriptionErrors] = useState([])
  const [priceErrors, setPriceErrors] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {

    dispatch(getSpotById(spotId))
      .then(() => setIsLoaded(true))
      .catch(() => history.push('/not-found'))

    setName(spotInfo.name || "loading")
    setAddress(spotInfo.address || "loading")
    setCity(spotInfo.city || "loading")
    setCountry(spotInfo.country || "loading")
    setPrice(spotInfo.price || "loading")
    setDescription(spotInfo.description || "loading")
    setState(spotInfo.state || "loading")

  }, [dispatch, isLoaded])



  const handleLocationErrors = () => {
    const locationErrors = []
    if (!address.length) locationErrors.push('Street address')
    if (address.length > 255) locationErrors.push('Please enter a street address under 255 characters')
    if (!city.length) locationErrors.push('City')
    if (city.length > 255) locationErrors.push('Please enter a city name under 255 characters')
    if (!country.length) locationErrors.push('Country')
    if (country.length > 255) locationErrors.push('Please enter a country under 255 characters')
    if (!state.length) locationErrors.push('State')
    if (state.length > 255) locationErrors.push('Please enter a state under 255 characters')
    // if (lat === '') locationErrors.push('Latitude')
    // if (lng === '') locationErrors.push('Longitude')
    // if (isNaN(lat) || lat < -90 || lat > 90) locationErrors.push('Please provide a valid latitude')
    // if (isNaN(lng) || lng < -180 || lng > 180) locationErrors.push('Please provide a valid longitude')
    return locationErrors;
  }

  const handleDescriptionErrors = () => {
    let errors = [];
    if (!name.length) errors.push('Title')
    if (name.length > 49) errors.push('Please provide a title under 50 characters')
    if (description.length > 255) errors.push('Please provide a description of 255 characters or less')
    if (!description.length) errors.push('Description')
    return errors;
  }

  const handlePriceErrors = () => {
    let errors = [];
    if (price < 1) errors.push('Please give your spot a price above zero')
    if (price > 10000) errors.push('Please give your spot a price of $10000 or less')
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
  }

  const submitSpot = async (e) => {
    e.preventDefault();

  const locationErrors = handleLocationErrors();
  setLocationErrors(locationErrors);

  const descriptionErrors = handleDescriptionErrors();
  setDescriptionErrors(descriptionErrors);

  const priceErrors = handlePriceErrors();
  setPriceErrors(priceErrors);

  if (locationErrors.length > 0 || descriptionErrors.length > 0 || priceErrors.length > 0) {
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

      const newSpot = await dispatch(updateSpotById(spotId, spotData));

      reset();
      history.push(`/spots/${newSpot.id}`)
      return newSpot;
    }
  }

  const incrementPrice = (e) => {
    setPrice(Number(price) + 5);
  }

  const decrementPrice = (e) => {
    if (!price) return;
    if (price > 5) {
      setPrice(Number(price) - 5);
    }
    if (price <= 5) {
      return;
    }
  }

  if (!isLoaded) {
    return (
      <></>
    )
  } else {

  return (
    <div className='create-spot-exterior-flex'>
      <div className='create-spot-exterior-holder'>
    <h2>Edit listing information</h2>
    <Link className="underline" to={`/spots/${spotId}`}>Cancel</Link>
    <div className='form-holder'>
      <form  className="create-spot-form" onSubmit={submitSpot}>
        <div className='location-exterior'>
        <h4 className='form-directions'>Spot Location</h4>
        <div className="location-form">
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
        </div>
          {/* <label htmlFor='lat'>Latitude</label>
          <input id='lat' type='text' value={lat} onChange={(e) => setLat(e.target.value)}></input>
          <label htmlFor='lng'>Longitude</label> */}
          {/* <input id='lng' type='text' value={lng} onChange={(e) => setLng(e.target.value)}></input> */}
          {locationErrors.length > 0 && (
              <div className='errors'>
                <i className="fa-solid fa-circle-exclamation"></i> To continue, please provide this required info:
                <ul>
                {locationErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
              </div>
            )}
        </div>
        <EditImages/>
        <div>
        <h4 className='form-directions'>Spot Title and Description</h4>
          <div className='input description-input'>
          <label className='name-description-title' htmlFor='name'>Create your title</label>
          <textarea placeholder='Adorable home near you' className='create-text' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          <div className='character-counter'>
            {name && <span>{name.length}/49</span>}
          </div>
          </div>
          <div className='input description-input'>
          <label className='name-description-title' htmlFor='description'>Create your description</label>
          <textarea placeholder="You'll have a great time at this comfortable place to stay" className='create-text description' id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
          <div className='character-counter'>
            {description && <span>{description.length}/255</span>}
          </div>
          </div>
          {descriptionErrors.length > 0 && (
              <div className='errors'>
                <i className="fa-solid fa-circle-exclamation"></i> To continue, please provide this required info:
                <ul>
                {descriptionErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
              </div>
            )}
        </div>
        <div>
        <h4 className='form-directions'>Price per night</h4>
          <div className='price-form'>
            <div className='price-input-holder'>
            <div className='price-clicker minus' onClick={() => decrementPrice()}> – </div>
            <input className='price-input' id='price' type='number' value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <div className='price-clicker' onClick={() => incrementPrice()}> + </div>
            </div>
            <label className='price-label' htmlFor='price'>per night</label>
          </div>
          {priceErrors.length > 0 && (
              <div className='errors'>
                {priceErrors.map(error => <div key={error}><i className="fa-solid fa-circle-exclamation"></i> {error}</div>)}
              </div>
            )}
        </div>
        <div className="button-holder">
        <button className="publish-button">Publish Your Listing</button>
        <DeleteSpotModal spotId={spotId}/>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}
}


export default UpdateSpotForm;
