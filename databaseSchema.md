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

Table users {
  id integer [pk, increment]
  firstName varchar [not null]
  lastName varchar [not null]
  email varchar [unique]
  username varchar [unique, not null]
  password varchar [not null]
  token varchar
}

Table spots {
  id integer [pk, increment]
  ownerId integer
  address varchar [not null]
  city varchar [not null]
  state varchar [not null]
  lat float(9,7)
  lng float(10,7)
  name varchar49
  description text [not null]
  price integer [not null]
  createdAt date
  updatedAt date
}

Table images {
  id integer [pk, increment]
  spotId integer
  reviewId integer
  url url
  preview boolean
}

Table reviews {
  id integer [pk, increment]
  userId integer [not null]
  spotId integer [not null]
  review text [not null]
  stars integer
  createdAt date
  updatedAt date
}

Table bookings {
  id integer [pk, increment]
  spotId integer
  userId integer
  startDate date
  endDate date
  createdAt date
  updatedAt date
}

Ref: "users"."id" < "spots"."ownerId"

Ref: "spots"."id" < "images"."spotId"

Ref: "users"."id" < "reviews"."userId"

Ref: "images"."reviewId" < "reviews"."id"

Ref: "spots"."id" < "reviews"."spotId"

Ref: "spots"."id" < "bookings"."spotId"

Ref: "users"."id" < "bookings"."userId"
