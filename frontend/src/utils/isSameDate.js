const isSameDate = (date1, date2) => {
  date1 = new Date(date1)
  date2 = new Date(date2)

  // console.log(date1)
  // console.log(date2)

  // console.log(date1.getDate())
  // console.log(date2.getDate())

  if (date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getYear() === date2.getYear()) {
        // console.log(date1)
        // console.log(date2)
        return true
      }
  return false
}

// TESTS

// let testDate1 = "2022-04-30T08:00:00.000Z"
// let testDate2 = "2023-04-15T08:00:00.000Z"
// let testDate3 = "2023-01-01T08:00:00.000Z"
// let testDate4 = "2022-01-31T08:00:00.000Z"

// let date1 = "Sat Apr 30 2022 00:00:00 GMT-0800 (Pacific Daylight Time)"
// let date2 = "Fri Feb 10 2023 00:00:00 GMT-0800 (Pacific Standard Time)"
// let date3 = "Sun Jan 01 2023 00:00:00 GMT-0800 (Pacific Standard Time)"
// let date4 = "Tue Jan 31 2022 00:00:00 GMT-0800 (Pacific Standard Time)"

// console.log(isSameDate(testDate1, date1)) // true
// console.log(isSameDate(testDate2, date2)) // false
// console.log(isSameDate(testDate3, date3)) // true
// console.log(isSameDate(testDate4, date4)) // true

export default isSameDate;
