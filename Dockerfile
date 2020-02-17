FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install --silent
COPY . .
RUN yarn build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE $PORT
CMD ["/usr/sbin/nginx","-g","daemon off;"]
