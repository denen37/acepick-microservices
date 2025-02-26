FROM node:19-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

RUN npm run build

CMD ["npm","run", "start"]




