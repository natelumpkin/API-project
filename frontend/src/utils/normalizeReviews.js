const normalizeReviews = (reviewData) => {
  // creates a new object
  // iterates over spotData.Spots
  // for each spot in spotData,
  // set a key in result that is its id, and the value is the spot
  // return the object
  let res = {};
  for (let review of reviewData.Reviews) {
    res[review.id] = review
  };
  return res;
}

// const demoReviews = {
//   "Reviews": [
//       {
//           "id": 3,
//           "spotId": 3,
//           "userId": 1,
//           "review": "This is the biggest house I've ever seen",
//           "stars": 3,
//           "createdAt": "2022-09-28T21:21:26.425Z",
//           "updatedAt": "2022-09-28T21:21:26.425Z",
//           "User": {
//               "id": 1,
//               "firstName": "User1",
//               "lastName": "One"
//           },
//           "Spot": {
//               "id": 3,
//               "ownerId": 2,
//               "address": "200 Big St",
//               "city": "Bigville",
//               "state": "NY",
//               "country": "United States of America",
//               "lat": -61.119489,
//               "lng": 90.1295419,
//               "name": "Biggest House",
//               "price": 1120.99,
//               "previewImage": "some url"
//           },
//           "ReviewImages": [
//               {
//                   "id": 4,
//                   "url": "some url"
//               }
//           ]
//       },
//       {
//           "id": 4,
//           "spotId": 4,
//           "userId": 1,
//           "review": "This is the most amazing house I've ever seen",
//           "stars": 5,
//           "createdAt": "2022-09-28T21:21:26.431Z",
//           "updatedAt": "2022-09-28T21:21:26.431Z",
//           "User": {
//               "id": 1,
//               "firstName": "User1",
//               "lastName": "One"
//           },
//           "Spot": {
//               "id": 4,
//               "ownerId": 2,
//               "address": "500 Amazing Pl",
//               "city": "Amazingville",
//               "state": "WY",
//               "country": "USA",
//               "lat": 56.119489,
//               "lng": 32.1295419,
//               "name": "Amazing House",
//               "price": 12.99
//           },
//           "ReviewImages": []
//       }
//   ]
// }

//console.log(normalizeReviews(demoReviews));

export default normalizeReviews;
