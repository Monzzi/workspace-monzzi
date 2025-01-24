#!/bin/bash

# USERS
# Get all users
curl -X GET http://localhost:3000/api/users -H "Content-Type: application/json"

# Get a specific user by ID
curl -X GET http://localhost:3000/api/users/1 -H "Content-Type: application/json"

# Create a new user
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456", "type": "admin"}'

# Update a user by ID
curl -X PUT http://localhost:3000/api/users/1 -H "Content-Type: application/json" \
  -d '{"email": "updated@example.com", "type": "user"}'

# Delete a user by ID
curl -X DELETE http://localhost:3000/api/users/1 -H "Content-Type: application/json"

# Activate a user
curl -X POST http://localhost:3000/api/users/1/active -H "Content-Type: application/json"

# Get the active status of a user
curl -X GET http://localhost:3000/api/users/1/active -H "Content-Type: application/json"

# TEACHERS
# Get all teachers
curl -X GET http://localhost:3000/api/teachers -H "Content-Type: application/json"

# Get a specific teacher by ID
curl -X GET http://localhost:3000/api/teachers/1 -H "Content-Type: application/json"

# Create a new teacher
curl -X POST http://localhost:3000/api/teachers -H "Content-Type: application/json" \
  -d '{"dni": "87654321B", "name": "Jane", "last_name": "Doe", "date_of_birth": "1980-01-01", "user_id": 2}'

# Update a teacher by ID
curl -X PUT http://localhost:3000/api/teachers/1 -H "Content-Type: application/json" \
  -d '{"name": "Jane Updated", "last_name": "Doe Updated"}'

# Delete a teacher by ID
curl -X DELETE http://localhost:3000/api/teachers/1 -H "Content-Type: application/json"

# Get all students of a teacher
curl -X GET http://localhost:3000/api/teachers/1/students -H "Content-Type: application/json"

# STUDENTS
# Get all students
curl -X GET http://localhost:3000/api/students -H "Content-Type: application/json"

# Get a specific student by ID
curl -X GET http://localhost:3000/api/students/1 -H "Content-Type: application/json"

# Create a new student
curl -X POST http://localhost:3000/api/students -H "Content-Type: application/json" \
  -d '{"dni": "12345678A", "name": "John", "last_name": "Doe", "date_of_birth": "2000-01-01", "teacher_id": 1}'

# Update a student by ID
curl -X PUT http://localhost:3000/api/students/1 -H "Content-Type: application/json" \
  -d '{"name": "John Updated", "last_name": "Doe Updated"}'

# Delete a student by ID
curl -X DELETE http://localhost:3000/api/students/1 -H "Content-Type: application/json"

# LOGIN AND LOGOUT
# Render login view
curl -X GET http://localhost:3000/login

# Attempt to log in
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" \
  -d '{"username": "test@example.com", "password": "123456"}'

# Log out
curl -X POST http://localhost:3000/logout

# HOME
# Access the home page
curl -X GET http://localhost:3000/home

# TOKEN
# Get a JWT token
curl -X POST http://localhost:3000/api/token -H "Content-Type: application/json" \
  -d '{"username": "test@example.com", "password": "123456"}'
