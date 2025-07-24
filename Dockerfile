# Dockerfile

# --- Stage 1: Build Stage ---
# Use a Node image to build the Angular app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app for production
RUN npm run build

# --- Stage 2: Production Stage ---
# Use a lighter, production-ready Node image
FROM node:20-alpine

WORKDIR /app

# Copy package files from the builder stage
COPY --from=builder /app/package*.json ./

# Install ONLY production dependencies (e.g., express)
RUN npm install --omit=dev

# Copy the built Angular app from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the Node.js server code from the builder stage
COPY --from=builder /app/server ./server

# Expose the port the server runs on
EXPOSE 8080

# The command to start the Node.js server
CMD [ "node", "server/index.js" ]
