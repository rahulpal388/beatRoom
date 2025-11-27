FROM node:22-alpine


WORKDIR /backend


COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm","run","start"]
