const normalizeData = (data) => {
  const res = {}
  for (let booking of data) {
    res[booking.id] = booking
  }
  return res
}

export default normalizeData;
