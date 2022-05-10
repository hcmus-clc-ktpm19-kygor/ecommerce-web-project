FROM node:lts-alpine
WORKDIR /app/user
ADD package*.json /.
RUN npm install
ADD . .
CMD npm start