# build environment
FROM node:12.2.0-alpine as build
WORKDIR /usr/src/app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn install --silent
RUN yarn add react-scripts@3.0.1 global --silent
RUN yarn build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]