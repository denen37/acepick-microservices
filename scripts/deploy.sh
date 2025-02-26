echo "Deploying application..."

cd "$(dirname "$0")/.."

git pull origin main

docker-compose down

docker-compose up --build -d

docker system prune -f

echo "Deployment complete!"
