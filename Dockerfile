FROM node:12

ARG DATABASE_URL
ARG API_DOMAIN
ENV DATABASE_URL=$DATABASE_URL
ENV API_DOMAIN=$API_DOMAIN

COPY wait-for-it.sh /usr/bin/wait-for
RUN chmod +x /usr/bin/wait-for

WORKDIR /app


COPY . .

RUN npm install

RUN rm .env -f > /dev/null
RUN rm ./client/.env -f > /dev/null
RUN rm ./dist/ -fr > /dev/null
RUN echo DATABASE_URL=$DATABASE_URL >> .env
RUN echo API_DOMAIN=$API_DOMAIN >> ./client/.env
RUN echo TITLE_NAME=$TITLE_NAME >> ./client/.env

CMD wait-for postgres:5432 -- npm run deploy --loglevel verbose;npm start

EXPOSE 3000
