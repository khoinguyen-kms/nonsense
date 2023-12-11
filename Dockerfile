FROM node:20.10-alpine

WORKDIR /app
COPY package*.json ./
COPY . /app
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN yarn
EXPOSE 3000

ENTRYPOINT ["sh", "./entrypoint.sh"]
#CMD ["yarn", "start:dev"]

