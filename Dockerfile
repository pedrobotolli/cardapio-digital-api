FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV DATABASE_URL=file:./dev.db
RUN npx prisma generate
EXPOSE 8000
CMD [ "npx","nodemon", "./src/app.ts" ]