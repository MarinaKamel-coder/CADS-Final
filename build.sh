#!/bin/bash
set -e

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Generating Prisma client..."
node ./backend/node_modules/prisma/build/index.js generate --schema=./backend/prisma/schema.prisma

echo "Building backend..."
npm run build --prefix backend

echo "Building frontend..."
npm run build --prefix frontend

echo "Build completed successfully!"
