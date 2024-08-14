# Node.js JWT Authentication API with CRUD Operations

This project provides a Node.js API that includes JWT authentication, user management, booking item management, and student management. It offers endpoints for creating, updating, and retrieving records, along with secure routes that require JWT authentication.

**Public Deployment**
The API is publicly deployed and can be accessed at:
https://data-service-7pt4.onrender.com

## Features

- **JWT Token Generation**: Securely create JWT tokens with user data.
- **User Registration and Login**: Register new users, update passwords, and authenticate users.
- **Auth0 Integration**: Retrieve OAuth tokens using client credentials.
- **CRUD Operations**: Manage users, booking items, and students with full CRUD functionality.
- **Protected Routes**: Secure API endpoints that require a valid JWT token.

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (Node package manager)
- **MongoDB** (for database operations)
- An Auth0 account with client credentials set up

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ReactWithRajesh/DataManagemntServices.git
   cd DataManagemntServices
   npm install
   
## Usage
npm start
The server will start on http://localhost:4041/3033

# API Endpoints:

1. **Generate JWT Token**:
Endpoint: POST /api/auth/generate-token
Description: Generates a JWT token for the user.
  <img width="368" alt="image" src="https://github.com/user-attachments/assets/ee5b3a07-6052-49f3-a07d-e4079cf8b6f4">

2. **Login via Auth0 (under development)**
Endpoint: POST /api/auth/login-v2 
Description: Handles login via Auth0 and retrieves an access token.

## User Management Endpoints

 1. **User Registration**
Endpoint: POST /api/user/register
Description: Registers a new user.
  <img width="367" alt="image" src="https://github.com/user-attachments/assets/9592ef20-aca8-4df4-a218-7be6f12f5e60">

2. **Update Password**
Endpoint: POST /api/user/updatepassword
Description: Updates the user's password.
  <img width="361" alt="image" src="https://github.com/user-attachments/assets/dcf39696-3a25-42fb-b0cb-05d786085aa7">

3. **Login**
Endpoint: POST /api/user/login
Description: Authenticates the user and generates a JWT token.
  <img width="361" alt="image" src="https://github.com/user-attachments/assets/7f63d6a9-f4e0-4861-8cbc-0e95b6e15a9c">

## Booking Item Management Endpoints

1. **Add or Update Booking Item**
Endpoint: POST /api/booking/
Description: Adds a new booking item or updates an existing one.
  <img width="374" alt="image" src="https://github.com/user-attachments/assets/bb06d31a-fa24-47a3-9ebe-80fd5b959251">
  
2. **Get Booking Items List**
Endpoint: GET /api/booking/list
Description: Retrieves a list of all booking items.
  <img width="371" alt="image" src="https://github.com/user-attachments/assets/0abb6ff3-b368-402c-8fe5-d6800e72e1ee">
  
3. **Get Booking Item by ID**
Endpoint: GET /api/booking/:_id
Description: Retrieves a specific booking item by its ID.
  <img width="370" alt="image" src="https://github.com/user-attachments/assets/8c43576a-6d12-4445-ba7d-0c6e3f5ffcbd">

4. **Delete Booking Item by ID**
Endpoint: GET /api/booking/delete/:_id
Description: Deletes a specific booking item by its ID.
Response:{
  "msg": "Record deleted successfully."
}

## Student Management Endpoints

1. **Add or Update Student**
Endpoint: POST /api/student/
Description: Adds a new student or updates an existing one.

  <img width="365" alt="image" src="https://github.com/user-attachments/assets/b986c24a-894a-45c2-8093-fac2d9c74039">

2. **Get Students List**
Endpoint: GET /api/student/list
Description: Retrieves a list of all students.
  <img width="374" alt="image" src="https://github.com/user-attachments/assets/4e9a4ccb-a110-48e0-9efd-7cb3cc9ab040">

3. **Get Student by ID**
Endpoint: GET /api/student/:_id
Description: Retrieves a specific student by their ID.
  <img width="375" alt="image" src="https://github.com/user-attachments/assets/69161c89-ae65-4a58-8ae8-1c92964a31a8">

4. **Delete Student by ID**
Endpoint: GET /api/student/delete/:_id
Description: Deletes a specific student by their ID.
Response:{
  "msg": "Record deleted successfully."
}

# Environment Variables
The following environment variables should be set in your .env file:

- **JWT_SECRET:** Secret key for signing JWT tokens.
- **clientId:** Your Auth0 client ID.
- **clientSecret:** Your Auth0 client secret.
- **audience:** The Auth0 audience for your API.
- **PORT:** The port number for your server.
- **MONGODB_URI:** The MongoDB connection URI.
  
# Dependencies
- **dotenv:** Loads environment variables from a .env file.
- **jsonwebtoken:** Used for creating and verifying JWT tokens.
- **express:** Web framework for Node.js.
- **mongoose:** MongoDB object modeling tool.
- **request:** Simplified HTTP request client.

# Author
- **Name:** Rajesh Kumar
- **GitHub:** ReactWithRajesh
- **Email:** rjsreact@gmail.com
  
# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# Acknowledgments
- **Auth0** for providing a robust authentication solution.
- **JWT** for the concept of JSON Web Tokens.
- **MongoDB** for the database solution.


### Notes:

- Replace placeholders like `yourusername`, `your-repo-name`, and specific environment variables with actual data.
- The sections are structured to provide clarity on how each part of your API works, making it easier for others to understand and contribute.



