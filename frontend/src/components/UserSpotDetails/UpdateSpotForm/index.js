import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { updateSpotById, getSpotById } from "../../../store/spot";

import DeleteSpotModal from "../../DeleteSpotModal";


const UpdateSpotForm = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  //console.log('UPDATE SPOT FORM spotId is now: ', spotId)
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

  //console.log('address: ', address)

  const [locationErrors, setLocationErrors] = useState([])
  const [descriptionErrors, setDescriptionErrors] = useState([])
  const [priceErrors, setPriceErrors] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    //console.log('entering use effect 1!')
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

  // useEffect( async () => {
  //   await dispatch(getSpotById(spotId))
  //   setIsLoaded(true))
  // }, [dispatch, isLoaded]

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

  const handleDescriptionErrors = () => {
    let errors = [];
    if (!name.length) errors.push('Name')
    if (name.length > 50) errors.push('Please provide a name under 50 characters')
    if (!description.length) errors.push('Description')
    return errors;
  }

  const handlePriceErrors = () => {
    let errors = [];
    if (price < 1) errors.push('Please give your spot a price above zero')
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
  //console.log('location errors: ', locationErrors);


  const descriptionErrors = handleDescriptionErrors();
  setDescriptionErrors(descriptionErrors);

  const priceErrors = handlePriceErrors();
  setPriceErrors(priceErrors);

  if (locationErrors.length > 0 || descriptionErrors.length > 0 || priceErrors.length > 0) {
    // console.log('location errors:', locationErrors)
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

      const newSpot = await dispatch(updateSpotById(spotId, spotData));

      reset();
      history.push(`/spots/${newSpot.id}`)
      return newSpot;
    }
  }

  const incrementPrice = (e) => {
    //console.log('increment running')
    setPrice(Number(price) + 5);
  }

  const decrementPrice = (e) => {
    //console.log('decrement running')
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
            {description && <span>{description.length}/500</span>}
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
