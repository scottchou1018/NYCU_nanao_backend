#!/bin/sh
# Wait for MySQL
echo "Waiting for MySQL to start..."
until nc -z -v -w60 db 3306
do
  echo "Waiting for database connection..."
  sleep 5
done
echo "MySQL is up - executing command"

# Run the command
npx prisma migrate dev --name nanao_db
node initDB.js
npm run start:dev