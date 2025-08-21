#!/bin/bash

# Murmur Next.js Frontend - Start Script
echo "🌟 Starting Murmur Next.js Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the nextjs-frontend directory"
    exit 1
fi

echo "✅ Node.js is installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
fi

echo "🚀 Starting development server..."
echo "📱 Frontend will be available at: http://localhost:3001"
echo "🔗 Make sure Rails backend is running at: http://localhost:3000"
echo ""

npm run dev
