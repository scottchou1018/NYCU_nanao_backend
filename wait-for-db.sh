#!/bin/sh
# Wait for MySQL to start
echo "Waiting for MySQL to start..."
until nc -z -v -w60 db 3306; do
  echo "Waiting for database connection..."
  sleep 5
done
echo "MySQL is up - executing command"

# Execute the command passed to the entrypoint
exec "$@"
