NATEBNB

https://natebnb-api-clone.herokuapp.com/

![](demo-images/Screen%20Shot%202022-10-22%20at%209.26.23%20PM.png)

This is a simple clone of AirBnB! This is my first full-stack application designed to showcase a few basic features and provide a smooth and intuitive user experience, in order to show off my skills as a developer in training.

Technologies Used

The frontend and backend servers were coded in Javascript. Styling was added with CSS.

The backend API server was created with Express and uses a SQL database. The API server communicates with the database using Sequelize.

The frontend was created with React. Redux provided global state management.

The servers and database are hosted on Heroku.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

LIVE FEATURES

Login, User Creation, and Authorization

This app allows the user to create an account and saves basic information for future use. Users that aren't logged in are able to view the site but not create or edit features. A demo user button is included in the drop-down menu that allows a user to log in as a demo user with a number of pre-created spots and reviews.

![](demo-images/Screen%20Shot%202022-10-22%20at%209.33.38%20PM.png)

Spot CRUD

The user is able to create a basic listing, with information on location, a name and title, and pricing. This information is saved and displayed for other users to look at. If the current user owns the spot, an edit button is displayed that takes the user to an edit page. The spot can be editted from that page, or they can delete the spot from the database with a deactivate listing button.

![](demo-images/Screen%20Shot%202022-10-22%20at%209.35.58%20PM.png)

![](demo-images/Screen%20Shot%202022-10-22%20at%209.34.35%20PM.png)

Review CRUD

All users are able to view reviews for any displayed spot. The user is able to create reviews for listings that aren't their own. After the review is created, they are able to delete it on that spot's page.

![](demo-images/Screen%20Shot%202022-10-22%20at%209.35.22%20PM.png)

Road Map for Future Features

Currently the spot details page feels a little empty, as users are unable to load images past the first. As a result, I would like to implement the ability to load more photos, change which one is the preview image, change the order, and look at full versions of the images when they are clicked.

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

My name is Nate Lumpkin. I live in Oakland, California.

Email me at: nate.lumpkin@gmail.com
