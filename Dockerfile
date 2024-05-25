FROM node:16
WORKDIR /app

RUN apt-get update && apt-get install -y netcat
RUN npm install -g prisma

COPY package*.json ./
RUN npm install && npm rebuild bcrypt --build-from-source

COPY prisma/schema.prisma ./prisma/
COPY prisma/migrations ./prisma/migrations/
RUN prisma generate

COPY . .
RUN npm run build

COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh
EXPOSE 3000
ENTRYPOINT ["/wait-for-db.sh"]

CMD ["npx", "prisma", "migrate", "deploy", "&&", "node", "dist/src/main"]
