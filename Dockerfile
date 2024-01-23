# Use an official Node.js runtime as a parent image
FROM node:lts

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for both backend and frontend
RUN npm install

# Copy the content of the current directory to the working directory
COPY . .

# Expose ports for both backend and frontend
EXPOSE 5000 3000

# Command to run both backend and frontend
CMD ["npm", "run", "start"]
