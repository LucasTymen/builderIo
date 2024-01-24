# BuilderIO App

BuilderIO is a full-stack application built with Node.js, Express, MongoDB, and Docker. It consists of separate Docker containers for the frontend and backend, managed by a root-level Docker setup.

## Getting Started

### Prerequisites

- Docker
- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd builderio

    Set up the environment variables:

    Create a .env file in the root directory with the following content:

    env

PORT=3000
MONGODB_URI=mongodb://localhost:27017/builderiocd

Start the Docker containers:

bash

    docker-compose up

    Access the application:
        Frontend: http://localhost:8080
        Backend: http://localhost:3000

Development
Frontend

The frontend is located in the frontend directory. Any changes made in this directory will be automatically reflected.
Backend

The backend is located in the backend directory. The Node.js server is configured to run on port 3000.
API Endpoints

    GET /api/users: Get all users.
    GET /api/users/:id: Get a user by ID.
    POST /api/users: Create a new user.
    PUT /api/users/:id: Update a user.
    DELETE /api/users/:id: Delete a user.

Troubleshooting

    If you encounter issues with the MongoDB connection, ensure that the MongoDB URI in the .env file is correct.
    Check the Docker logs for each container to identify any errors.
