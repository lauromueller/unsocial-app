# 1. Build the production version of our application
FROM node:fermium-alpine
WORKDIR /app
# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm ci
# Copy files necessary for production
COPY webpack.config.js tsconfig.json .babelrc ./
COPY src/ src/
COPY public/ public/
RUN npm run build

# 2. Serve the production files via an http server
FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html