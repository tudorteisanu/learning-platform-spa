# Use Node.js as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular app to the container
COPY . .

# Open the development server port
EXPOSE 4200

# Run the Angular development server
CMD ["npm", "run", "start"]
