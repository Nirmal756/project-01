FROM node:18-alpine

# Install Nginx
RUN apk add --no-cache nginx

WORKDIR /app

# Install dependencies (Baked into the image for speed)
COPY package*.json ./
RUN npm install

# Copy raw source code
COPY . .

# Copy Nginx configuration
COPY nginx/default.conf /etc/nginx/http.d/default.conf

# STARTUP COMMAND: 
# 1. Build the app using the .env provided by Docker Compose at runtime
# 2. Move files to Nginx folder
# 3. Start Nginx
CMD ["sh", "-c", "npm run build && mkdir -p /usr/share/nginx/html && cp -r build/* /usr/share/nginx/html/ && nginx -g 'daemon off;'"]
