# Node.js JWT Authentication API with CRUD Operations

This project provides a Node.js API that includes JWT authentication, user management, booking item management, and student management. It offers endpoints for creating, updating, and retrieving records, along with secure routes that require JWT authentication.

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
# 1. Generate JWT Token
Endpoint: POST /api/auth/generate-token
Description: Generates a JWT token for the user.
  <img width="368" alt="image" src="https://github.com/user-attachments/assets/ee5b3a07-6052-49f3-a07d-e4079cf8b6f4">

# 2. Login via Auth0 (under development )
Endpoint: POST /api/auth/login-v2 
Description: Handles login via Auth0 and retrieves an access token.

## User Management Endpoints
# 1. User Registration
Endpoint: POST /api/user/register
Description: Registers a new user.
  <img width="367" alt="image" src="https://github.com/user-attachments/assets/9592ef20-aca8-4df4-a218-7be6f12f5e60">

# 2. Update Password
Endpoint: POST /api/user/updatepassword
Description: Updates the user's password.
   <img width="361" alt="image" src="https://github.com/user-attachments/assets/dcf39696-3a25-42fb-b0cb-05d786085aa7">

# 3. Login
Endpoint: POST /api/user/login
Description: Authenticates the user and generates a JWT token.
  <img width="361" alt="image" src="https://github.com/user-attachments/assets/7f63d6a9-f4e0-4861-8cbc-0e95b6e15a9c">
