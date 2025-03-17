# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose port
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]
