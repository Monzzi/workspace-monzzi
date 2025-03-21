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

# Verificar si los puertos necesarios están libres
echo "🔍 Verificando puertos necesarios..."
if lsof -i :3000 > /dev/null 2>&1; then
  echo "⚠️ El puerto 3000 ya está en uso. Intentando liberar..."
  fuser -k 3000/tcp 2>/dev/null || true
  sleep 2
  if lsof -i :3000 > /dev/null 2>&1; then
    echo "❌ No se pudo liberar el puerto 3000. Por favor, deténgalo manualmente."
    exit 1
  fi
fi

if lsof -i :5173 > /dev/null 2>&1; then
  echo "⚠️ El puerto 5173 ya está en uso. Intentando liberar..."
  fuser -k 5173/tcp 2>/dev/null || true
  sleep 2
  if lsof -i :5173 > /dev/null 2>&1; then
    echo "❌ No se pudo liberar el puerto 5173. Por favor, deténgalo manualmente."
    exit 1
  fi
fi

# Configurar el backend
echo "🔧 Configurando el backend..."
cd backend
echo "📦 Instalando dependencias del backend..."
npm install

echo "🐳 Iniciando servicios de Docker..."
npm run start-services

echo "⏳ Esperando a que la base de datos esté lista..."
# Esperar más tiempo y comprobar realmente que la base de datos esté lista
for i in {1..30}; do
  if docker exec postgres_container pg_isready -h localhost -U postgres > /dev/null 2>&1; then
    echo "  ✅ Base de datos lista después de $i segundos"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "  ❌ Tiempo de espera agotado para la base de datos"
    exit 1
  fi
  sleep 1
  echo -n "."
done

# Opción para recrear la base de datos desde cero
if [ "$1" == "--fresh" ]; then
  echo "🔄 Recreando la base de datos desde cero..."
  npx sequelize-cli db:drop || true
  npx sequelize-cli db:create || { echo "❌ Error al crear la base de datos"; exit 1; }
  
  echo "🗃️ Ejecutando migraciones..."
  npx sequelize-cli db:migrate || { echo "❌ Error en las migraciones"; exit 1; }
  
  echo "🌱 Ejecutando seeds..."
  npx sequelize-cli db:seed:all || { echo "❌ Error en los seeds"; exit 1; }
else
  echo "🗃️ Verificando y ejecutando migraciones pendientes..."
  npx sequelize-cli db:migrate || { echo "❌ Error en las migraciones"; exit 1; }
  
  # Para los seeds, intentar ejecutarlos pero ignorar errores específicos de duplicados
  echo "🌱 Verificando y ejecutando seeds pendientes..."
  npx sequelize-cli db:seed:all || echo "⚠️ Algunos seeds ya existen (esto es normal si la base de datos ya tenía datos)"
fi

echo "🚀 Iniciando servidor backend..."
npm start &
backend_pid=$!
echo "  📝 Proceso backend iniciado con PID: $backend_pid"

# Volver al directorio raíz
cd ..

# Configurar el frontend
echo "🔧 Configurando el frontend..."
cd frontend
echo "📦 Instalando dependencias del frontend..."
npm install

echo "🚀 Iniciando servidor de desarrollo frontend..."
npm run dev