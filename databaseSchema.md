Basic initial notes for AirBnB database schema

Table Users (
  id integer PK autoincrement
  firstName varChar30 notnull
  lastName varChar30 notnull
  email varChar50 unique - must be email format
  username varChar30 unique notnull
  password varChar 30 notnull
  token ??
)

Table Spots (
  id integer PK autoincrement
  ownerId Integer foreign key ref users.id
  address varChar30 notnull
  city varchar30 notnull
  state varchar30 notnull
  country varchar50 notnull
  lat float (9,7) notnull must be valid latitude
  lng float (10,7) notnull must be valid longitude
  name varchar49 must be less than 50 chars
  description text? notnull
  price integer notnull
  createdAt DATE default to current
  updateAt DATE default to current
  avgRating - aggregate from reviews?
  previewImage: text (url) - pulled from images of matching spot where preview = pull
)

Table Images (
  id integer PK autoincrement
  spotId integer foreign key references spot.id
  reviewId reviewId integer foreign key references reviews.id no more than 10 images
  per reviewId, cannot have both spotId and reviewId
  url: url?
  preview: boolean
)

Table Reviews (
  id integer PK autoincrement
  userId integer foreign key ref users.id
  spotId integer foreign key ref spots.id
  review text not null
  stars: int 1-5
  createdAt DATE default current timestamp
  updatedAt DATE default current timestamp
)

Table Bookings (
  id integer pk autoincrement
  spotId integer foreign key ref spots.id
  userId integer foreign key ref users.id
  startDate DATE must be future?
  endDate DATE must be after startDate?
  createdAt DATE default to current timestamp
  updateAt DATE default to current timestamp
)
