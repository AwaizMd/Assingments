# Backend:-
 
Step 1:-In utils>jwtToken.js enter email and password in line 24 and 25 from which you wanna send email to users.

Step 2:- nodemon server

step 3:-POST: http://localhost:4000/api/v1/register  run on postman
body->raw->JSON
{
    "name": "Awaiz",
    "email": "awaizmd043@gmail.com",
    "password": "password"
}