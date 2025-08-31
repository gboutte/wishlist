# Base image
FROM node:22


ENV DATABASE_HOST=captain.app2.greg.fail
ENV DATABASE_PORT=5566
ENV DATABASE_USER=postgres
ENV DATABASE_PASSWORD=ccf5cdcc9d3a1213
ENV DATABASE_NAME=wishlist-dev

# Create app directory
WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy both apps into container
COPY . /app

# Install dependencies for API
WORKDIR /app
RUN npm run install:all

# Go back to root
WORKDIR /app

RUN npm run build


WORKDIR /app/gateway
RUN npm install

WORKDIR /app/
# Copy PM2 ecosystem config
COPY ./ecosystem.config.js .

EXPOSE 3000

# Use PM2 to run both apps
CMD ["pm2-runtime", "ecosystem.config.js"]
