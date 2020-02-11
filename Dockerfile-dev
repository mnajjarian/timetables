# Use an official Node runtime as the parent image
FROM node:12.2.0-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN yarn --silent
RUN yarn add global react-scripts@3.0.1 --silent

# Run app
CMD ["yarn", "start"]