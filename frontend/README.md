
1. Configure your local environment

This is for frontend Nextjs env
```
cp .env.local.example .env.local
```

This is for local test Prisma setup
add .env with DATABASE_URL=mysql://<name>:<pw>@<url>:3306/<db>?sslaccept=strict" for local test with AWS db, there is a error without `sslaccept`, which will not occur on client side

2. Setup Prisma
Run the following command to create your Mysql database file. This also creates the `User` and others tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):
```
npx prisma migrate dev --name init
```

if you already have db
```
run npx prisma db pull
```

if you have updated schema, it must run the following command to update client prisma for frontend
```
run npx prisma generate
```

3. run the development server:

npm run dev

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
