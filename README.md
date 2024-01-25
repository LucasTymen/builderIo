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


###

# Docker

 Based on the provided information, it seems that your Dockerfile and docker-compose.yml files for each microservice are mostly correct. Here's a summary:

1. Each microservice has its own Dockerfile specifying its base image (node:lts), working directory, copying package.json and installing dependencies using npm.
2. The docker-compose.yml file defines the service name, build context (the folder containing the Dockerfile), ports to expose, and any required environment files or services as dependencies.
3. Both docker-compose.yml and Dockerfiles reference 'mongodb' as a dependency but do not specify its image name or version. If you are using a local MongoDB instance, this is fine; otherwise, consider replacing the 'mongo:latest' image with your preferred MongoDB image to ensure compatibility.
4. Ensure that the directories mentioned in the docker-compose.yml files (backend and frontend/builderio) are correct and exist within the project directory structure.
5. Make sure the .env file is present at the root directory of your project, as it's being referenced by both docker-compose.yml files.

To run the containers:

1. Ensure Docker is installed and running on your local machine.
2. Navigate to the root directory of your project in a terminal window or command prompt and execute `docker-compose up`. This will build the images for each microservice if they don't exist, start the containers, and connect them based on their dependencies.
###

# Sesame Digital Backend

A simple Node.js backend built using Express and MongoDB to serve as the foundation for a content management system (CMS) for the Sesame Digital website. This project includes basic authentication, CRUD operations for articles, and user sessions management.

## Prerequisites

To get started with this project, make sure you have the following prerequisites installed:

- Node.js
- MongoDB

You will also need to install the `mongoose` package in your project's `package.json`. Run `npm install mongoose` to do that.

## Setup

To get started, clone the repository and navigate into your project folder:

```bash
git clone https://github.com/[your-username]/sesameDigital.git
cd sesameDigital
```

Next, initialize a new Node.js project by creating a `package.json` file:

```bash
npm init -y
```

Now install all dependencies listed in your `package.json` file:

```bash
npm install
```

## Running the server

To start the server, run the following command:

```bash
node index.js
```

The server will listen on port 3001 by default. To check if it's running, open your browser and navigate to `http://localhost:3001`. You should see a welcome message indicating that the server is up and running.

## API Endpoints

Currently, this project has two main endpoints: one for creating/retrieving articles and another for handling user authentication.

### Articles

#### Create an article

```bash
POST /api/articles
Content-Type: application/json

{
  "title": "New Article Title",
  "description": "Description of the new article",
  "image": "path/to/article-image.jpg"
}

Response:
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "634d7f5a1b9ddc01e98aae9b", // Unique ID for the new article
  "title": "New Article Title"
}
```

#### Get all articles

```bash
GET /api/articles

Response:
HTTP/1.1 200 OK
Content-Type: application/json
[
  {
    "_id": "634d7f5a1b9ddc01e98aae9a", // ID of the first article
    "title": "Article Title 1"
  },
  {
    "_id": "634d7f5a1b9ddc01e98aae9b", // ID of the second article
    "title": "Article Title 2"
  }
]
```

#### Get a specific article by ID

Replace `[article-id]` with an actual article ID.

```bash
GET /api/articles/[article-id]

Response:
HTTP/1.1 200 OK
Content-Type: application/json
{
  "_id": "634d7f5a1b9ddc01e98aae9a", // ID of the article
  "title": "Article Title 1"
}
```

#### Delete an article by ID

Replace `[article-id]` with an actual article ID.

```bash
DELETE /api/articles/[article-id]

Response:
HTTP/1.1 204 No Content
```

### User Authentication

#### Register a new user

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "newUserName",
  "email": "newUserEmail@example.com",
  "password": "secretPassword"
}

Response:
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "634d7f5a1b9ddc01e98ab00c", // Unique ID for the new user
  "username": "newUserName"
}
```

#### Login an existing user

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "existingUserEmail@example.com",
  "password": "correctPassword"
}

Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "634d7f5a1b9ddc01e98ab00c", // ID of the logged in user
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQys8hA5SgZARGBXUFvVB_t_BkQ9"
}
```

## Future improvements

- Implement proper password hashing and encryption using a library like bcrypt or scrypt
- Add input validation and error handling to endpoints
- Create a separate `auth.js` module for user authentication middleware
- Add CORS headers to enable cross-origin requests from the frontend
- Add tests using Jest and Supertest to ensure proper functionality
- Implement proper CRUD operations with validations and input sanitization for articles in the backend (currently, only creating an article is supported)
- Add user roles and permissions to the backend to secure access to certain endpoints or resources.
