# Fullstack Frontend Example with Next.js (REST API)

## NextJS, The React Framework
Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.

## Prisma Database
All db schema was predefined, just a single command can create all the table that we needed. With the seeding feature, it will insert all the test data we will use in the project, which is very convenient for project development.

We can also user prisma client in frontend to crud the database.

## Next Authentication
I use NextAuth.js for authentication, which designed to work with any OAuth service, it supports OAuth 1.0, 1.0A, 2.0 and OpenID Connect.
The JWT was stored in the session of NextAuth, which can be retrieved in components for Bearer Authorization, in order to connect to backend api.

## Getting started

### 1. Configure your local environment

fits of all, go to the root path
```
npm install
```

this is for frontend Nextjs env
```
cp .env.local.example .env.local
```

we can use openssl to generate secret
```
openssl rand -base64 32
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

add demo data into the tables if necessary
```
npx prisma db seed
```

first time init the project or after updated the schema, it must run the following command to update client prisma for frontend
```
npx prisma generate
```

### 3. Run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
