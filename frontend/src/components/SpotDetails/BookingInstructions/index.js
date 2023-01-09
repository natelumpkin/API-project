import './BookingInstructions.css'

const BookingInstructions = ({currentUser, startDate, endDate, selectedDate, spot}) => {

  let formattedStartDate
  let formattedEndDate
  let numNights

  const calculateNumberNights = (date1, date2) => {
    const millisecondsBetween = date2 - date1
    const daysBetween = millisecondsBetween / 86400000
    return Math.floor(daysBetween)
  }

  if (selectedDate) {
    formattedStartDate = new Intl.DateTimeFormat('en-US',{day:"numeric",month:"short",year:"numeric"}).format(selectedDate[0])
    formattedEndDate = new Intl.DateTimeFormat('en-US',{day:"numeric",month:"short",year:"numeric"}).format(selectedDate[1])
  } else {
    formattedStartDate = undefined
    formattedEndDate = undefined
  }

  console.log('formatted start: ', formattedStartDate)
  console.log('formatted end: ', formattedEndDate)

  return (
    <div>
      {!startDate && (
        <>
        <h2>Select check-in date</h2>
        <p>Select booking dates to reserve this spot</p>
        </>
      )}
      {startDate && !endDate && (
        <>
        <h2>Select checkout date</h2>
        <p>Select booking dates to reserve this spot</p>
        </>
      )}
      {selectedDate && !(formattedStartDate === formattedEndDate) && (
        <>
        <h2>{calculateNumberNights(selectedDate[0], selectedDate[1])} nights in {spot.city}</h2>
        <p>{formattedStartDate} - {formattedEndDate}</p>
        </>
      )}
    </div>
  )
}

export default BookingInstructions;
