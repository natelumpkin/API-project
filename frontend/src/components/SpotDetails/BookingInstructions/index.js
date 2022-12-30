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
  }

  if (!currentUser) {
    return (
      <div>
        <h1>Log in to reserve this spot</h1>
        <h4>View its reservations on the calendar below!</h4>
      </div>
    )
  }

  if (currentUser.id === spot.ownerId) {
    return (
      <div>
        <h1>This is your spot</h1>
        <h4>View reservations on the calendar below!</h4>
      </div>
    )
  }

  return (
    <div>
      {!selectedDate && !startDate && (
        <>
        <h1>Select check-in date</h1>
        <h4>Select booking dates to reserve this spot</h4>
        </>
      )}
      {startDate && !endDate && (
        <>
        <h1>Select checkout date</h1>
        <h4>Select booking dates to reserve this spot</h4>
        </>
      )}
      {selectedDate && (
        <>
        <h1>{calculateNumberNights(selectedDate[0], selectedDate[1])} nights in {spot.city}</h1>
        <h4>{formattedStartDate} - {formattedEndDate}</h4>
        </>
      )}
    </div>
  )
}

export default BookingInstructions;
