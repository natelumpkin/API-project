const isBetweenDates = (targetDate, date1, date2) => {
  targetDate = new Date(targetDate)
  date1 = new Date(date1)
  // console.log('startdate: ', date1)
  // console.log('target date: ', targetDate)
  date2 = new Date(date2)
  // console.log('enddate: ', date2)
  if (targetDate >= date1 && targetDate <= date2) return true
  return false
}

export default isBetweenDates;
