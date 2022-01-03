FROM node:14

WORKDIR /usr/src/app
COPY . .

RUN npm ci

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN npm run build && rm -rf node_modules

RUN npm install -g serve

CMD ["serve","build"]