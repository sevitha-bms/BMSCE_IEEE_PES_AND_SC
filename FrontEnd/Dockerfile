# Use the official Node.js image as the base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend files to the container
COPY . .

# Build your React app
RUN npm run build

# Use Nginx as the production web server
FROM nginx:alpine

# Copy the built React app to the Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port for the Nginx web server
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]