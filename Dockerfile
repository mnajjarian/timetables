FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM node:alpine

RUN yarn global add serve

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE $PORT

CMD ["serve", "-p", "$port", "-s", "."]