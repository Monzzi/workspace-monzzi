#!/bin/bash

echo "🛑 Deteniendo todos los servicios..."

# Detener los contenedores de Docker del proyecto
echo "🐳 Deteniendo contenedores de Docker..."
cd backend
npm run stop-services
cd ..

# Encontrar y detener el proceso del backend (Node)
echo "🔍 Deteniendo servidor backend..."
pkill -f "node.*start"

# Encontrar y detener el proceso del frontend (Vite)
echo "🔍 Deteniendo servidor frontend..."
pkill -f vite

echo "✅ Todos los servicios han sido detenidos"