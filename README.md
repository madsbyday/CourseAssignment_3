# CourseAssignment_3
Course Assignment 3 (October 30 - November 5 2017)

## Sprint 1 (Wednesday 20.00 - 1. October)
### [Link to our deployed client](http://static1.nydailynews.com/polopoly_fs/1.3598149.1509374530!/img/httpImage/image.jpg_gen/derivatives/landscape_635_424/kevin-spacey.jpg) {CHANGE URL}

Like is was suggested, we've used the Semester Seed both for our client and our server.

**Frontend** (/seedClient-master): The frontend is React so we have fetch methods that communicate with our backedn. We've used an React Router to create a simple single page website. Our websiste have the following pages:
- *Front page*: This page is blank at the moment.
- *About*: This page is also black at the moment.
- *Interesting Places*: Is shows two dummy data places. You don't need to be logged in to see the places. The page uses fetch to get the information from the backend. When you click on an place it goes to the places' page. 
- *Place/{id}*: This is the page you are directed to when you click on a place on 'Interesting Places' page. 
- *Register*: Here you can register. 
- *Login*: Here you can login. 


**Backend** (/seedServer-master): With the Rest API we have created 'GET' and 'POST' methods for our Users and a 'GET' method for our places. The backend also validates our Users and check that thier password is correct.     
We have an Persistance Unit that connects to our MySQL database hosted on Digital Ocean. Then we have three entity classes that create their macthing tables in the database: 'Place', 'Role' and 'User'.  

**Database:** We have four tables in our databse which have been generated thrue our entity classes. 
- *SEED_USER*: which stores usernames and hashed passwords. 
- *USER_ROLE*: whom has our diffrent roles an user can have (User & Admin). 
- *SEED_USER_USER_ROLE*: that map which user have what role. 
- *PLACE*: in which we store an address, an GPS-location, a description, a rating and a uri to an image.   


---
[Link to fileUpload exercise from monday 30-10-17](https://github.com/cph-an178/fileUpload)
