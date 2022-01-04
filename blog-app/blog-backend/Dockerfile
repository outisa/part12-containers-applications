FROM node:14

WORKDIR /usr/src/app
COPY . .
RUN npm ci --only-production

CMD npm start
