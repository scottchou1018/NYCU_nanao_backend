FROM node:16
WORKDIR /app
RUN apt-get update && apt-get install -y netcat

COPY package*.json ./
RUN npm install

COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

COPY . .
EXPOSE 3000
CMD ["/wait-for-db.sh"]
