FROM node:14.17.3-alpine
WORKDIR /app/user
ADD package*.json /.
RUN npm install
ADD . .
CMD npm start
