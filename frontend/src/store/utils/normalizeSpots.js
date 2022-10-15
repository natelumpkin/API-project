const normalizeSpots = (spotData) => {
  // creates a new object
  // iterates over spotData.Spots
  // for each spot in spotData,
  // set a key in result that is its id, and the value is the spot
  // return the object
  let res = {};
  console.log(spotData);
  for (let spot of spotData.Spots) {
    res[spot.id] = spot
  };
  console.log(res);
  return res;
}

const demoData = {
  "Spots": [
      {
          "id": 1,
          "ownerId": 1,
          "address": "100 Small Ave",
          "city": "Smalltown",
          "state": "CA",
          "country": "USA",
          "lat": "31.119489",
          "lng": "-90.1295419",
          "name": "Smallest House",
          "description": "The smallest house in the whole world",
          "price": "12.99",
          "createdAt": "2022-09-28T21:26:11.183Z",
          "updatedAt": "2022-09-28T21:26:11.183Z",
          "avgRating": "4.0000000000000000",
          "previewImage": "some url"
      },
      {
          "id": 2,
          "ownerId": 1,
          "address": "400 Beautiful St",
          "city": "Beautifultown",
          "state": "MD",
          "country": "France",
          "lat": "76.119489",
          "lng": "78.1294319",
          "name": "Beautiful House",
          "description": "The most beautiful house in the whole world",
          "price": "49.99",
          "createdAt": "2022-09-28T21:26:11.190Z",
          "updatedAt": "2022-09-28T21:26:11.190Z",
          "avgRating": "2.0000000000000000",
          "previewImage": "some url"
      },
      {
          "id": 3,
          "ownerId": 2,
          "address": "200 Big St",
          "city": "Bigville",
          "state": "NY",
          "country": "United States of America",
          "lat": "-61.119489",
          "lng": "90.1295419",
          "name": "Biggest House",
          "description": "The biggest house in the whole world",
          "price": "1120.99",
          "createdAt": "2022-09-28T21:26:11.195Z",
          "updatedAt": "2022-09-28T21:26:11.195Z",
          "avgRating": "3.0000000000000000",
          "previewImage": "No preview image available"
      },
      {
          "id": 4,
          "ownerId": 2,
          "address": "500 Amazing Pl",
          "city": "Amazingville",
          "state": "WY",
          "country": "USA",
          "lat": "56.119489",
          "lng": "32.1295419",
          "name": "Amazing House",
          "description": "The most amazing house in the whole world",
          "price": "12.99",
          "createdAt": "2022-09-28T21:26:11.198Z",
          "updatedAt": "2022-09-28T21:26:11.198Z",
          "avgRating": "5.0000000000000000",
          "previewImage": "No preview image available"
      },
      {
          "id": 5,
          "ownerId": 3,
          "address": "300 Average St",
          "city": "Mediumville",
          "state": "CT",
          "country": "United States",
          "lat": "10.119489",
          "lng": "-110.1295419",
          "name": "Average House",
          "description": "The most average house in the whole world",
          "price": "99.99",
          "createdAt": "2022-09-28T21:26:11.207Z",
          "updatedAt": "2022-09-28T21:26:11.207Z",
          "avgRating": "1.00000000000000000000",
          "previewImage": "No preview image available"
      },
      {
          "id": 8,
          "ownerId": 1,
          "address": "600 Crazy St",
          "city": "Bolgna",
          "state": "WI",
          "country": "United States of America",
          "lat": "-50.7645358",
          "lng": "122.4730327",
          "name": "Crazy House",
          "description": "The craziest house in the whole world",
          "price": "444",
          "createdAt": "2022-10-02T19:18:26.226Z",
          "updatedAt": "2022-10-02T19:18:26.226Z",
          "avgRating": "No reviews available for this spot",
          "previewImage": "No preview image available"
      },
      {
          "id": 10,
          "ownerId": 6,
          "address": "aaa123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": "37.7645358",
          "lng": "-122.4730327",
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": "123",
          "createdAt": "2022-10-02T20:24:43.698Z",
          "updatedAt": "2022-10-02T20:24:43.698Z",
          "avgRating": "No reviews available for this spot",
          "previewImage": "No preview image available"
      },
      {
          "id": 11,
          "ownerId": 6,
          "address": "NEW ADDRESS",
          "city": "NEW CITY",
          "state": "NEW STATE",
          "country": "United States of America",
          "lat": "37.7645358",
          "lng": "-122.4730327",
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": "123",
          "createdAt": "2022-10-03T15:27:17.337Z",
          "updatedAt": "2022-10-03T15:27:34.740Z",
          "avgRating": "1.00000000000000000000",
          "previewImage": "image.url"
      },
      {
          "id": 12,
          "ownerId": 6,
          "address": "aaa123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": "37.7645358",
          "lng": "-122.4730327",
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": "123",
          "createdAt": "2022-10-03T15:28:55.936Z",
          "updatedAt": "2022-10-03T15:28:55.936Z",
          "avgRating": "No reviews available for this spot",
          "previewImage": "No preview image available"
      },
      {
          "id": 13,
          "ownerId": 6,
          "address": "NEW ADDRESS",
          "city": "NEW CITY",
          "state": "NEW STATE",
          "country": "United States of America",
          "lat": "37.7645358",
          "lng": "-122.4730327",
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": "123",
          "createdAt": "2022-10-03T16:57:37.163Z",
          "updatedAt": "2022-10-03T16:59:07.181Z",
          "avgRating": "1.00000000000000000000",
          "previewImage": "image.url"
      },
      {
          "id": 14,
          "ownerId": 16,
          "address": "aaa123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": "37.7645358",
          "lng": "-122.4730327",
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": "123",
          "createdAt": "2022-10-03T17:10:09.688Z",
          "updatedAt": "2022-10-03T17:10:09.688Z",
          "avgRating": "1.00000000000000000000",
          "previewImage": "image.url"
      }
  ],
  "page": 1,
  "size": 20
}

export default normalizeSpots;
