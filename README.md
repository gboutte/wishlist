
## Description

## Project setup

```bash
npm run install:all
```

in `.env` file

```
APP_MODE=prod
DATABASE_USER=postgres
DATABASE_PASSWORD=pass123
DATABASE_NAME=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost
APP_SECRET=secret
ACCESS_TOKEN_EXPIRATION=1h
```
```
APP_MODE=dev
APP_SECRET=secret
ACCESS_TOKEN_EXPIRATION=1h
```

## Compile and run the project

```bash
# development
npm run start:dev

```

## Deployment

```bash
npm run build
npm run start:prod
```



## Build docker

```bash
docker build -t gboutte/wishlist .

docker run -p 3000:3000 -e DATABASE_HOST=myhost.db.com -e DATABASE_PORT=5432 -e DATABASE_USER=myuser -e DATABASE_PASSWORD=supersecret -e DATABASE_NAME=mydb gboutte/wishlist

docker push gboutte/wishlist
```
