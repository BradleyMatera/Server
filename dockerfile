# Use the official Node.js LTS image
FROM node:14

# Install MySQL Client
RUN apt-get update && apt-get install -y default-mysql-client

# Create and set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "watch"]