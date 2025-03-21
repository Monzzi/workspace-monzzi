#!/bin/bash

echo "🛑 Deteniendo todos los servicios..."

# Detener los contenedores de Docker del proyecto
echo "🐳 Deteniendo contenedores de Docker..."
cd backend
npm run stop-services
cd ..

# Encontrar y detener el proceso del backend (Node) - con verificación
echo "🔍 Deteniendo servidor backend..."
backend_pids=$(pgrep -f "node.*start" || echo "")
if [ -n "$backend_pids" ]; then
  echo "  🔄 Terminando procesos Node: $backend_pids"
  kill -15 $backend_pids 2>/dev/null || true
  sleep 2
  # Verificar si todavía están en ejecución, forzar terminación si es necesario
  if pgrep -f "node.*start" > /dev/null; then
    echo "  ⚠️ Forzando terminación de procesos Node persistentes..."
    pkill -9 -f "node.*start" 2>/dev/null || true
  fi
else
  echo "  ✅ No se encontraron procesos Node en ejecución"
fi

# Encontrar y detener el proceso del frontend (Vite) - con verificación
echo "🔍 Deteniendo servidor frontend..."
vite_pids=$(pgrep -f vite || echo "")
if [ -n "$vite_pids" ]; then
  echo "  🔄 Terminando procesos Vite: $vite_pids"
  kill -15 $vite_pids 2>/dev/null || true
  sleep 2
  # Verificar si todavía están en ejecución, forzar terminación si es necesario
  if pgrep -f vite > /dev/null; then
    echo "  ⚠️ Forzando terminación de procesos Vite persistentes..."
    pkill -9 -f vite 2>/dev/null || true
  fi
else
  echo "  ✅ No se encontraron procesos Vite en ejecución"
fi

# Verificar si hay procesos escuchando en los puertos relevantes
if lsof -i :3000 > /dev/null 2>&1; then
  echo "⚠️ Todavía hay un proceso usando el puerto 3000. Terminando..."
  fuser -k 3000/tcp 2>/dev/null || true
fi

if lsof -i :5173 > /dev/null 2>&1; then
  echo "⚠️ Todavía hay un proceso usando el puerto 5173. Terminando..."
  fuser -k 5173/tcp 2>/dev/null || true
fi

echo "✅ Todos los servicios han sido detenidos"