# Fullstack Backend Example with Spring-Boot 3

## JWT Authentication

The authentication is handled with a JWT, the application is stateless, which means that no session is managed by Spring, no data is stored in the session.
Request to protected resources must contain a JWT in the Authorization header to be accepted.
For some route may need specific ROLES to access, e.g:
```
.requestMatchers("/api/admin/secure/**").hasAnyAuthority("ADMIN")
.requestMatchers("/api/books/secure/**").hasAnyAuthority("USER", "ADMIN")
```

## Getting started

### Install

```
mvn clean package
```

### Run on local

```
mvn spring-boot:run
```

### Configure your local environment
add .env file to resources with the local env:
```
MYSQLDB_URL=
MYSQLDB_USER=
MYSQLDB_PASSWORD=
JWT_SECRET=
```

after setting the local env, run the project by:

```
mvn spring-boot:run
```

## Local Docker Test
```
docker build -t test1 .
```
```
docker run test1
```