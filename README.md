# CourseAssignment_3
Course Assignment 3 (October 30 - November 5 2017)

## Sprint 2 (Saturday 20.00)
### [Link to our deployed client](https://ca3.cph-an178.dk/#/)

**How to use the system**

When you arrive at the client site you will see the home page, there you will see at the top of the page a menu where you can either go to the Interesting Places page, the Register page or you the login page. If you havent allready registered, a good first choice would be to register on the Register page. After you have registered you can login with your username and password on the login page. When you've logged in you can either rate a place or register a new place on the interesting places page. Provided you have admin priviliges you can view a list of the users in the menu.   

### Features: 

**Frontend**: 

**Backend**:

**App**:

### Who did what:

|Frontend         |Alexander|Jonas|Mads|
|-----------------|:-------:|:---:|:--:|
|About.js         |         |     |     |
|App.js           |         |     |     |
|Details.js       |         |     |     |
|Home .js         |         |     |     |
|Login.js         |         |     |     |
|Logout.js        |         |     |     |
|PlaceRegister.js |         |     |  x  |
|Places.js        |         |     |  x  |
|Register.js      |         |     |  x  |
|TopMenu.js       |         |     |     |
|UserList.js      |         |     |  x  |


|Backend                  |Alexander|Jonas|Mads|
|-------------------------|:-------:|:---:|:--:|
|Place.java               |         |     |  x  |
|Rating.java              |         |     |  x  |
|Role.java                |         |     |     |
|User.java                |         |     |     |
|PlaceFacade.java         |         |     |     |
|UserFacade.java          |         |     |     |
|Admin.java               |         |     |  x  |
|All.java                 |         |     |     |
|ApplicationConfig.java   |    X    |     |     |
|PlaceResource.java       |         |     |  x  |
|RandomnumberResource.java|         |     |     |
|RegisterResourse.java    |         |     |  x  |
|UploadResource.java      |    X    |     |     |

|App                |Alexander|Jonas|Mads|
|-------------------|:-------:|:---:|:--:|
|MainTabNavigator.js|    X    |     |    |
|AddPlace.js        |    X    |     |    |
|HomeScreen.js      |         |  X  |    |
|Login.js           |         |     |    |
|Place.js           |         |  X  |    |


**Deployed our project**: Alexander

## Sprint 1 (Wednesday 20.00 - 1. Noveber)
Like is was suggested, we've used the Semester Seed both for our client and our server.

**Frontend** (/seedClient-master): The frontend is React so we have fetch methods that communicate with our backend. We've used an React Router to create a simple single page website. Our websiste have the following pages:
- *Front page*: This page is blank at the moment.
- *About*: This page is also black at the moment.
- *Interesting Places*: This page shows all the individual places with the name and image of the place. 
- *Place/{id}*: This is the page you are directed to when you click on a place on 'Interesting Places' page. The page shows the name, Address, image, Description, Gps-location and the average score of the place. This is also the page where you can rate the place if you are logged in as a user.
- *Register*: Here you can register a user. 
- *User List*: see a list of all the users (admin role needed)
- *Login*: Here you can login. 


**Backend** (/seedServer-master): With the Rest API we have created 'GET' and 'POST' methods for our Users and a 'GET' method for our places. The backend also validates our Users and check that thier password is correct.     
We have an Persistance Unit that connects to our MySQL database hosted on Digital Ocean. Then we have three entity classes that create their macthing tables in the database: 'Place', 'Role' and 'User'.  

**Database:** We have four tables in our databse which have been generated thrue our entity classes. 
- *SEED_USER*: which stores usernames and hashed passwords. 
- *USER_ROLE*: whom has our diffrent roles an user can have (User & Admin). 
- *SEED_USER_USER_ROLE*: that map which user have what role. 
- *PLACE*: in which we store an address, an GPS-location, a description, a rating and a uri to an image.
- *RATING*: Here we store the users ratings.
