FROM node:alpine

WORKDIR /app
COPY package*.json ./
COPY . /app
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start:dev:docker"]

