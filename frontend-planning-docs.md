LANDING PAGE
Route: /

  Navbar
    Logo on left -> link to home (/)
    Become a host -> create spot (/host/homes)
    Profile button on right with modular:
      sign up -> create user
      log in -> log in
      host your home -> create spot (/host/homes)
    Demouser Button

  Spots Map
    Spots card -> spot details (/rooms/:spotId)
      Images
      City and state
      Distance
      Available date
      Price per night

  Footer (optional? features we don't have?)
    Copyright



CREATE A SPOT?
Route: /host/homes

  Top div with two images
    Link: "Try hosting" -> sign up modular

  Middle div with info about "what you could earn"
    mostly advertising? do i need this?

If you are signed in:

/become-a-host

a form with sub-components that appear and disappear

'Become a host in ten easy steps!'

Video or image on left, form on the right

/location

  google maps API and location chooser
  pops up a form with exact address

/photos

  add up to 5 photos
  set the first one to preview true

/title

  set name
  default name

/description

  set description
  default text

/price

  set price
  has plus and minus buttons
  as well as suggested price

/preview

  shows preview card with info

/publish-celebration

VIEW CURRENT USERS SPOTS

/users/show

Navbar at the top has menu with links to listings, reservations, create new listings

Profile card on left with info
Preview card of listing

UPDATE A SPOT

/manage-your-space/:spotId/details

Form on left to select what to show:
  Listing Details

    -to Delete: update Listing status -> "Permanently deactivate"
      A few forms with warnings and last calls
      "Listing deactivation is permanent"
  Basic form to edit spot
  Location


SPOT DETAILS

/rooms/:spotId

Navbar at top

Title at top
Picture previews
some details, user profile picture?
"Aircover text" insurance i guess
Spot description
Booking card to check availability and popup calendar
Calendar at bottom for bookings

Reviews (not to implement)

Google map of location

Host information
