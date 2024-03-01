# Start with Node image
FROM node:16-alpine

# Specify app directory
WORKDIR /usr/src/app

# Copy app package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

# Expose dev server port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
