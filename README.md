# SpringBoot 3 + NextJS 14 Fullstack with JWT authentication

### The current project is a Full Stack web application with latest React and Java Spring Boot with authenticate with JWT from an NextJs frontend to a Spring Boot backend. You can find more details in the README files of the respective folders.

**Frontend Features:**
- Next Auth
- Next Routing
- Prisma migrate db/mysql client/seeding
- Server side + client side rendering
- ReactJS + TS
- Bootstrap 5
- JWT for protecting backend api
- ESLint + Airbnb style + Husky

**Backend Features:**
- Hibernate/JPA CRUD
- REST CRUD
- Spring Data JPA
- Spring Security
- JWT Auth, Roles('ADMIN'/'USER')

**Docker Features:**
- Nginx
- Demo Mysql with prisma seeding
- One cmd to deploy the whole demo project

```
make
```
###  After running the makefile, the website will be available at http://localhost. The docker-compose will create the mysql container first, then create the frontend container with the prisma command to create the tables and the test details based on the prisma schema. The last two container will be the backend container and nginx which will act as a reverse proxy and security layer for the project.