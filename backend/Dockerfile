# Start from the official Node.js LTS version
FROM node:16

# Set your working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to your working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your app's source code from your current directory to the container's working directory
COPY . .

# Set the command to run your application
CMD ["npm", "start"]

# Expose the port that your app runs on
EXPOSE 4000
