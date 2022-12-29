const isBetweenDates = (targetDate, date1, date2) => {
  targetDate = new Date(targetDate)
  date1 = new Date(date1)
  date2 = new Date(date2)
  if (targetDate >= date1 && targetDate <= date2) return true
  return false
}

// let testDate1 = "2022-04-30T08:00:00.000Z"
// let testDate2 = "2023-04-15T08:00:00.000Z"
// let testDate3 = "2023-01-01T08:00:00.000Z"
// let testDate4 = "2022-01-31T08:00:00.000Z"

// let date1 = "Sat Apr 30 2022 00:00:00 GMT-0800 (Pacific Daylight Time)"
// let date2 = "Fri Feb 10 2023 00:00:00 GMT-0800 (Pacific Standard Time)"
// let date3 = "Sun Jan 01 2023 00:00:00 GMT-0800 (Pacific Standard Time)"
// let date4 = "Tue Jan 31 2022 00:00:00 GMT-0800 (Pacific Standard Time)"

// console.log(isBetweenDates(testDate2, date3, date4))

export default isBetweenDates;
