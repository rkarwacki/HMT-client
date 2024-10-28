# Use Node.js to build the React app
FROM node:18-alpine as build
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN apk add --no-cache python3 g++ make


# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Serve the React app with a lightweight web server
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80