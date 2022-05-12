FROM node:16.15.0-alpine
WORKDIR /app/user
ADD package*.json /.
RUN npm install
ADD . .
CMD npm start
