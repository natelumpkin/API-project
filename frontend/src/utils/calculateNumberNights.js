const calculateNumberNights = (date1, date2) => {
  const millisecondsBetween = date2 - date1
  const daysBetween = millisecondsBetween / 86400000
  return Math.floor(daysBetween)
}

export default calculateNumberNights;
