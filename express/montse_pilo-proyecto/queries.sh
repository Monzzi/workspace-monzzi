#!/bin/bash

# USERS
# 1 Get all users
curl -X GET http://localhost:3000/api/users -H "Content-Type: application/json"

# 2 Get a specific user by ID
curl -X GET http://localhost:3000/api/users/1 -H "Content-Type: application/json"

# 3 Create a new user
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" \
  -d '{"email": "testFausto@eparaprobar.com", "password": "digitales", "type": "user"}'

# 4 Update a user by ID
curl -X PUT http://localhost:3000/api/users/4 -H "Content-Type: application/json" \
  -d '{"type": "admin"}'

# 5 Delete a user by ID
curl -X DELETE http://localhost:3000/api/users/1 -H "Content-Type: application/json"

# 6 Activate a user who is not active
curl -X POST http://localhost:3000/api/users/1/active -H "Content-Type: application/json"

# 7 Get the active status of a user
curl -X GET http://localhost:3000/api/users/1/active -H "Content-Type: application/json"

# TEACHERS
# 1 Get all teachers
curl -X GET http://localhost:3000/api/teachers -H "Content-Type: application/json"

# 2 Get a specific teacher by ID
curl -X GET http://localhost:3000/api/teachers/1 -H "Content-Type: application/json"

# 3 Create a new teacher
curl -X POST http://localhost:3000/api/teachers -H "Content-Type: application/json" \
  -d '{"dni": "87654321B", "name": "Julieta", "last_name": "Perez", "date_of_birth": "1981-01-01", "user_id": 3}'

# 4 Update a teacher by ID
curl -X PUT http://localhost:3000/api/teachers/3 -H "Content-Type: application/json" \
  -d '{"last_name": "Benegas"}'

# 5 Delete a teacher by ID
curl -X DELETE http://localhost:3000/api/teachers/3 -H "Content-Type: application/json"

# 6 Get all students of a teacher
curl -X GET http://localhost:3000/api/teachers/1/students -H "Content-Type: application/json"

# STUDENTS
# 1 Get all students
curl -X GET http://localhost:3000/api/students -H "Content-Type: application/json"

# 2 Get a specific student by ID
curl -X GET http://localhost:3000/api/students/3 -H "Content-Type: application/json"

# 3 Create a new student
curl -X POST http://localhost:3000/api/students -H "Content-Type: application/json" \
  -d '{"dni": "12345678A", "name": "Tatum", "last_name": "Oneill", "date_of_birth": "1967-01-01", "teacher_id": 2}'

# 4 Update a student by ID
curl -X PUT http://localhost:3000/api/students/1 -H "Content-Type: application/json" \
  -d '{"name": "Alice Updated", "last_name": "Johnson Updated"}'

# 5 Delete a student by ID
curl -X DELETE http://localhost:3000/api/students/4 -H "Content-Type: application/json"

# LOGIN AND LOGOUT
# Render login view
curl -X GET http://localhost:3000/login

# Attempt to log in
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" \
  -d '{"username": "updated@example.com", "password": "digitales"}'

# Log out
curl -X POST http://localhost:3000/logout

# HOME
# Access the home page
curl -X GET http://localhost:3000/home

# TOKEN
# Get a JWT token
curl -X POST http://localhost:3000/api/token -H "Content-Type: application/json" \
  -d '{"email": "testFausto@eparaprobar.com", "password": "digitales"}'
