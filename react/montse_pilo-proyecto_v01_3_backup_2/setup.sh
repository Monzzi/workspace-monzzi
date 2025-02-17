#!/bin/bash

echo "🚀 Iniciando configuración del proyecto completo..."

# Comprobar si Docker está funcionando (funciona tanto en Linux como en Mac)
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker no está en ejecución."
    echo "👉 En Linux: Ejecuta 'sudo systemctl start docker'"
    echo "👉 En Mac: Abre Docker Desktop"
    exit 1
fi

echo "✅ Docker está funcionando correctamente"

# Configurar el backend
echo "🔧 Configurando el backend..."
cd backend
echo "📦 Instalando dependencias del backend..."
npm install

echo "🐳 Iniciando servicios de Docker..."
npm run start-services

echo "⏳ Esperando a que la base de datos esté lista..."
sleep 10

echo "🗃️ Ejecutando migraciones..."
npx sequelize-cli db:migrate

echo "🌱 Ejecutando seeds..."
npx sequelize-cli db:seed:all

echo "🚀 Iniciando servidor backend..."
npm start &

# Volver al directorio raíz
cd ..

# Configurar el frontend
echo "🔧 Configurando el frontend..."
cd frontend
echo "📦 Instalando dependencias del frontend..."
npm install

echo "🚀 Iniciando servidor de desarrollo frontend..."
npm run dev