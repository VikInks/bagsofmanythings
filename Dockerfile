#  mongodb:
#    image: mongo:latest
#    ports:
#      - '27017:27017'
#    volumes:
#      - mongodb_data:/data/db
#    mongoose.connect('mongodb://mongodb:27017/bagsofmanythings')

#  dockerfile for mongodb

# 1. Use the official image as a base image
FROM mongo:latest

# 2. Expose the port

EXPOSE 27017

# 3. Set the default command with npm start

CMD ["mongod"]
