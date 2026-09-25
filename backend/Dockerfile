FROM node:20

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend .

EXPOSE 4000

CMD ["sh", "-c", "npm run migrate && node src/models/seed.js && npm run start"]