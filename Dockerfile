# Build Stage
FROM node:14-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Final Stage
FROM nginx:1.19-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/MyTodoUI /usr/share/nginx/html
COPY --from=build /app/startup.sh /
CMD /startup.sh
