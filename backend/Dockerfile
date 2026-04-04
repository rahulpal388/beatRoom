FROM node:22-alpine AS builder


WORKDIR /backend


COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# production stage file only
FROM node:22-alpine

WORKDIR /backend

COPY package*.json .
RUN npm ci --omit=dev

COPY --from=builder /backend/dist ./dist


RUN addgroup -S app && adduser -S app -G app


RUN chown -R app:app /backend


USER app

EXPOSE 8080

CMD ["npm","run","start"]
