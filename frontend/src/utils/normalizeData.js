const normalizeData = (data) => {
  console.log('data in function: ', data)
  const res = {}
  for (let booking of data) {
    res[booking.id] = booking
  }
  return res
}

export default normalizeData;
