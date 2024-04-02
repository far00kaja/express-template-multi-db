# SETUP ARVIS

## Requirements

- Node 20
- Redis
- RSMQ
- PostgreSQL
- MongoDB
- JWT

## How to build docker image

```bash
docker build -t be-api-gateway:env .
```

```environment variable
# LIST API
PORT=3001

REDIS_IP=localhost
REDIS_PORT=6377
REDIS_URL=redis://localhost:6377

DB_USER=postgres
DB_HOST=localhost
DB_NAME=db_arvis
DB_PASSWORD=postgres
DB_PORT=5432

JWT_KEY=secret

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db_arvis?schema=public"

MONGODB_URL=mongodb://localhost:27017/
```



## How to run with docker compose

```
docker-compose up -d
```

## How to run with npm

```
npm install
npm run dev
```


## How to run unit test

```
npm run test
```
