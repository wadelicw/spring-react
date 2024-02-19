FROM node:18.18-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN touch .env.production
RUN echo "API_ENDPOINT=http://localhost/api" >> .env.production
RUN echo "DATABASE_URL=mysql://root:admin@mysql:3306/SpringReactDemo" >> .env.production
RUN echo "NEXTAUTH_URL=http://localhost" >> .env.production
RUN echo "NEXTAUTH_URL_INTERNAL=http://frontend:3000" >> .env.production
RUN echo "NEXTAUTH_SECRET=EnDx9JFXgsJUNaavbTCwHyyNCfphJPeFJca/RZud/pI=" >> .env.production
RUN echo "JWT_SECRET=cyNPKFN0z8MOX5N5OyTqG8Z5M0z/WwIas5BsmDphkJY=" >> .env.production
RUN cat .env.production

RUN touch .env
RUN echo "DATABASE_URL=mysql://root:admin@mysql:3306/SpringReactDemo" >> .env
RUN cat .env

RUN npm run build