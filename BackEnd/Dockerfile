# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend files to the container
COPY . .

# Expose the port your Express app is running on
EXPOSE 3000

# Command to start your Express app
CMD ["node", "index.js"]