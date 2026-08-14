# Learning Management System (LMS)

A full-stack Learning Management System built with a frontend application and backend API.

The system supports three types of users:

- Admin
- Teacher
- Student


## Features

- Full-stack application (Frontend + Backend)
- JWT-based authentication
- Role-based access control
- User management
- Course management
- Teacher assignment
- Student course assignment
- Assignment creation and submission
- Assignment grading and feedback
- Student result tracking


## Project Structure

```
/frontend
    Next.js frontend application

/backend
    ASP.NET Core Web API backend

/database
    BDSCRIPT.sql
    Database creation script
```


## Database Setup

The database script is included in the repository.

Database script location:

```
/database/BDSCRIPT.sql
```


To create the database:

1. Open your database management tool.
2. Execute the `BDSCRIPT.sql` file.
3. Update the backend database connection string.
4. Run the backend API.


The SQL script contains the required database tables and initial data needed for the application.


## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | tanvir@gmail.com | password |
| Teacher | nayem@gmail.com | password |
| Admin | admin@gmail.com | password |



## Running the Project


## Backend Setup

Go to the backend folder:

```bash
cd backend
```


Restore dependencies:

```bash
dotnet restore
```


Run backend API:

```bash
dotnet run
```



## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```


Install dependencies:

```bash
npm install
```


Start frontend application:

```bash
npm run dev
```




## Role-Based Access


### Admin

Admin can:

- Manage users
- Manage courses
- Assign teachers to courses
- Assign students to courses
- View assignment submissions



### Teacher

Teacher can:

- View assigned courses
- Create assignments
- View student submissions
- Grade student assignments
- Provide feedback



### Student

Student can:

- View enrolled courses
- View assignments
- Submit assignments
- View assignment results



## Security

- No real secrets or credentials are committed to the repository.
- Authentication is implemented using JWT.
- Backend API enforces role-based authorization.
- Features are protected according to user roles.



## Business Rules Implemented

- Role-based access is enforced by backend API.
- Students can only access their assigned courses.
- Students can submit assignments before the deadline.
- Duplicate assignment submissions are prevented.
- Teachers can grade student submissions.
- Students can view their own results.
- Unauthorized users cannot access restricted features.



## Notes

- Make sure the database is created before running the backend.
- Run both frontend and backend applications together.
- Update database configuration according to your local environment.