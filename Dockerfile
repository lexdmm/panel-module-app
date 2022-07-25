FROM node:16.14.2-alpine

WORKDIR /app/panel-module-app

CMD npm run start:docker:dev

# run the command below to create the container
# docker build -t run panel-form-generator-api