# Nest.js Assignment

This application has 3 entities: **User**, **Course** and **Lesson**
* Each Course contains many Lessons
* User can complete lessons of a Course
* Once all the Lessons of a Course are completed, the Course is considered as Complete.
* User can see his/her progress of courses/lessons completion.
* When you delete a Course, its subsequent Lessons also gets deleted in cascade.

## Installation and Run Setup

Please make sure you are on Node.js 16+. Run the following commands:

```bash
git clone https://github.com/sanidhya-saraswat/nest-js-assignment.git
cd nest-js-assignment
npm install && npm run migrate
npm start
```
The server runs on port `3000`. Access it using http://localhost:3000 

## Database Schema
![alt text](https://github.com/sanidhya-saraswat/nest-js-assignment/blob/main/extra_items/db_schema.png?raw=true)

## Routing
All API routes are authenticated. So you need to be logged in to access any route which you can do by `/auth/login` API. There are 2 types of routes: Admin and Non-admin. Admin routes will allow the user to perform CRUD operations on users, courses and lessons. **Two dummy users and some dummy courses are created for you to try things out**
#### Admin User
```
username: "admin"
password: "admin"
```
#### Non-admin User
```
username: "sam"
password: "sam"
```

### Admin routes
* `/courses`: CRUD courses
* `/courses/:courseId/lessons`: CRUD lessons
* `/users`: CRUD Users

### Non Admin routes
* `/users/complete-lesson/:id`: Mark a lesson as complete (user info is taken from Auth session)
* `/users/courses`: List my courses (Logged in user's courses with completion info are returned) 

### Postman collection
I have added the postman collection for this application in this repo in `extra_items` folder. Please use the same for easy testing.

## Some Points
* All passwords are stored in encrypted form.
* The database used is SQLIte since its very lightweight gets automatically installed with `npm install` command.
* Currently sessions are maintained in memory, so if you restart the server your session will get lost. You need to hit the login API again. The sessions can be maintained in SQL DB or Redis, to avoid this issue.
