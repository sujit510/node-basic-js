# Stage 0 - Build the Product
FROM node:14.14.0-alpine3.11

ENV DOCKERIZE_VERSION v0.5.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENV NODE_ENV development

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY . /app/

RUN npm install
RUN npm run build

RUN rm -rf /app/src

RUN mv /app/node_modules /app/dist

# 24/9/2021: This was throwing error, hence commented
# RUN rm /app/.npmrc

ENV NODE_ENV production

ENV PORT 8000

ENV APP_PORT=8000
ENV ENV=DEV

EXPOSE 8000

CMD [ "npm", "run", "start-production" ]
