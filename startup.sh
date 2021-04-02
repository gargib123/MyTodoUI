#!/bin/sh

# Dynamically set Backend API path while starting the container from Environment variable
sed -e 's|API_URL_WITH_BASE_PATH|'${API_URL:-'https://localhost:5001/api'}'|g' -i /usr/share/nginx/html/main.*.js

# Start the Nginx Web Server
nginx -g "daemon off;"
