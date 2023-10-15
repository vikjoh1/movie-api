FROM node:18

WORKDIR /backend
COPY ./package*.json ./
RUN npm install
COPY ./src ./
CMD nodemon --exec ts-node src/index.ts