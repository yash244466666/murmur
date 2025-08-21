#!/bin/bash
set -e

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! mysqladmin ping -h"$DATABASE_HOST" -u"$DATABASE_USERNAME" -p"$DATABASE_PASSWORD" --silent; do
    sleep 1
done

echo "Database is ready!"

# Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid

# Create database if it doesn't exist
bundle exec rails db:create || true

# Run database migrations
bundle exec rails db:migrate

# Seed database if empty - check more robustly
USER_COUNT=$(bundle exec rails runner 'puts User.count' 2>/dev/null || echo '0')
echo "Current user count: $USER_COUNT"
if [ "$USER_COUNT" = "0" ]; then
    echo "Database is empty, seeding..."
    if bundle exec rails db:seed; then
        echo "Database seeded successfully!"
    else
        echo "Seeding failed or data already exists, continuing..."
    fi
else
    echo "Database already has $USER_COUNT users, skipping seeding..."
fi

# Generate Swagger documentation
RAILS_ENV=test bundle exec rails rswag:specs:swaggerize || true

# Build Tailwind CSS
bundle exec rails tailwindcss:build

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
