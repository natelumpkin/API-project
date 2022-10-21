NATEBNB

https://natebnb-api-clone.herokuapp.com/

This is a simple clone of AirBnB! This is my first full-stack application designed to showcase a few basic features and provide a smooth and intuitive user experience.

Technologies Used

The frontend and backend servers were coded entirely in Javascript, using Node. Styling was added with CSS.

The backend API server was created with Express and uses a SQL database. The API server communicated with the database using Sequelize. In the local environment, SQLite is as the DBMS, while in production, Postgres is used.

The frontend server was created with React. Redux provided global state management. Additional packages included:

- React Router DOM
- Redux Thunk

The servers and database are hosted on Heroku.

LIVE FEATURES

Login, User Creation, and Authorization

This app allows the user to create an account and saves basic information for future use. Users that aren't logged in are able to view the site but not create or edit features. A demo user button is included in the drop-down menu that allows a user to log in as a demo user with a number of pre-created spots and reviews.

Spot CRUD

The user is able to create a basic listing, with information on location, a name and title, and pricing. This information is saved and displayed for other users to look at. If the current user owns the spot, an edit button is displayed that takes the user to an edit page. The spot can be editted from that page, or they can delete the spot from the database with a deactivate listing button.

Review CRUD

All users are able to view reviews for any displayed spot. The user is able to create reviews for listings that aren't their own. After the review is created, they are able to delete it on that spot's page.

Road Map for Future Features

Currently the spot details page feels a little empty, as users are unable to load more images, and the images past the first are not displayed. As a result, I would like to implement the ability to load more photos, change which one is the preview image, change the order, and look at full versions of the images when they are clicked.

I'd like to implement a basic user profile which displays all of a user's current listings and reviews. These routes are already complete in the backend.

I would like to make the Navbar more dynamic, including being stuck to the top of the page, and changing width depending on which page the user is looking at. In addition, I'd like to code a basic footer, to give the page some boundaries.

I'd like to implement a bookings feature, with a calendar, booking card, and checkout option similar to the one on AirBnB's live site.

Finally I'd like to implement the GoogleMaps Location API, as my backend allows data for latitude and longitude.

HOW TO GET STARTED

If you'd like to run this application locally, here are the steps to complete:

1. Clone the repo into a new directory

2. Run npm install in the root, frontend, and backend folders

3. Create a .env file in the backend folder with the following values:
  PORT - port number for the backend server
  DB - location of the database in the backend folder
  JWT_SECRET - secret code for checking JWT tokens
  JWT_EXPIRES_IN - number that indicates length of time until token expires

4. Run database migrations with npx dotenv sequelize db:migrate

5. To add seeder data (necessary to log in with demo user), run npx dotenv sequelize db:seed:all

6. Navigate into backend and run npm start to start the server

7. Navigate into frontend with a separate terminal and run npm start

8. Open http://localhost:3000 to view it in the browser

CONTACT INFORMATION

Email me at: nate.lumpkin@gmail.com
