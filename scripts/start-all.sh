echo "Starting all services with Docker Compose..."

cd "$(dirname "$0")/.."

docker-compose down

docker-compose up --build -d

echo "All services started!"
