# Fullstack Frontend Example with Next.js (REST API)

## Getting started

### 1. Configure your local environment

fits of all, go to the root path
```
npm i
```

this is for frontend Nextjs env
```
cp .env.local.example .env.local
```

this is for local test Prisma setup
<br />
add .env with
```
DATABASE_URL=mysql://<name>:<pw>@<url>:3306/<db>?sslaccept=strict"
```
for local test with AWS db, there is a error without `sslaccept`, which will not occur on client side

### 2. Setup Prisma

run the following command to create your Mysql database file. This also creates the `User` and others tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):
```
npx prisma migrate dev --name init
```

add demo data into the tables
```
npx prisma db seed
```

on the other hand, if you already have db
```
npx prisma db pull
```

for some situation, if you have updated schema, it must run the following command to update client prisma for frontend
```
npx prisma generate
```

### 3. Run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
