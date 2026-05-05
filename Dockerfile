# We use one stage so 'npm' and 'nginx' are both available at runtime
FROM node:18-alpine

# 1. Install Nginx
RUN apk add --no-cache nginx

WORKDIR /app

# 2. Standard install
COPY package*.json ./
RUN npm install
COPY . .

# 3. Copy Nginx config (Alpine path)
COPY nginx/default.conf /etc/nginx/http.d/default.conf

# 4. MINIMALIST CHANGE: Run build ONLY when the container starts
# This will look for the .env file provided by Docker Compose on your EC2
CMD sh -c "npm run build && cp -r build/* /usr/share/nginx/html/ && nginx -g 'daemon off;'"
