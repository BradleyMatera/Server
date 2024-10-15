# Use the official Node.js image as the base
FROM node:latest

# Switch to root to install MySQL client
USER root

# Install default MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Set the working directory inside the container
WORKDIR /home/node/app

# Ensure node user owns the app directory
RUN chown -R node:node /home/node/app

# Copy package.json and package-lock.json before running npm install as root
COPY package*.json ./

# Run npm install as root to avoid permission issues
RUN npm install

# Switch to node user after installation
USER node

# Copy all files to the working directory
COPY . .

# Set the command to start the app
CMD ["npm", "run", "watch"]