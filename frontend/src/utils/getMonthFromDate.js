const getMonthFromDate = (dateString) => {
  const date = new Date(dateString)
  let monthName = new Intl.DateTimeFormat('en-US',{month: 'long', year: 'numeric'}).format(date);
  return monthName;
}

export default getMonthFromDate;
