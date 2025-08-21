#!/bin/bash

# Murmur Twitter Clone - Quick Start Script
# This script helps you get the application running quickly

set -e

echo "🐦 Welcome to Murmur - Twitter Clone Setup!"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check if containers are already running
if docker-compose ps | grep -q "Up"; then
    echo "🟡 Services are already running. Stopping them first..."
    docker-compose down
fi

echo "🔧 Building Docker containers..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "🎉 Success! Murmur is now running!"
    echo ""
    echo "📱 Application URLs:"
    echo "   Main App:          http://localhost:3000"
    echo "   API Documentation: http://localhost:3000/api-docs"
    echo "   Database Admin:    http://localhost:8080"
    echo ""
    echo "👤 Test Accounts (username/email/password):"
    echo "   john_doe / john@example.com / password123"
    echo "   jane_smith / jane@example.com / password123"
    echo "   bob_wilson / bob@example.com / password123"
    echo ""
    echo "🛠️  Useful Commands:"
    echo "   make logs    - View application logs"
    echo "   make shell   - Open shell in Rails container"
    echo "   make console - Open Rails console"
    echo "   make down    - Stop all services"
    echo "   make test    - Run tests"
    echo ""
    echo "📖 For more information, see README.md"
else
    echo "❌ Something went wrong. Check the logs with: docker-compose logs"
    exit 1
fi
