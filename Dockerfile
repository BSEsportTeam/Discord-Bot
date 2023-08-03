FROM node:19

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD npm run start:prod