import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Calendar from 'react-calendar'
import './BookingsCard.css'

const BookingsCard = ({spot}) => {



  const [date, setDate] = useState(new Date())

  // console.log(date)


  return (
    <div className='calendar-container'>
      <Calendar value={date} onChange={setDate}/>
      <Calendar />
    </div>
  )
}

export default BookingsCard;
