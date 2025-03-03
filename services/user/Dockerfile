FROM node:20.18-alpine3.21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

EXPOSE ${PORT}

RUN npm run build

CMD ["npm","run", "start"]




