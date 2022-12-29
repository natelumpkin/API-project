const isBetweenDates = (targetDate, date1, date2) => {
  targetDate = new Date(targetDate)
  date1 = new Date(date1)
  date2 = new Date(date2)
  if (targetDate >= date1 && targetDate <= date2) return true
  return false
}

export default isBetweenDates;
