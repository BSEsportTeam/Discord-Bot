FROM node:19

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install


CMD npm run start:prod