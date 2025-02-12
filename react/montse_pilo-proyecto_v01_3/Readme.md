# Proyecto Full Stack React + Express

## Requisitos previos
- Node.js instalado (versión 14 o superior)
- npm instalado
- Docker instalado y en ejecución
  - En Mac: Docker Desktop abierto
  - En Linux: Servicio Docker activo (`sudo systemctl start docker`)
- Puertos necesarios:
  - 5173 (frontend)
  - 3000 (backend)
  - 5432 (PostgreSQL)

## Instrucciones de ejecución rápida

1. Asegúrate de que Docker está en ejecución
   - Mac: Abre Docker Desktop
   - Linux: Verifica con `systemctl status docker`
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta:
   ```bash
   npm run setup
   ```
4. Espera a que todos los servicios estén en funcionamiento
5. Abre el navegador en: http://localhost:5173

## Detener el proyecto
Para detener todos los servicios de forma ordenada:
```bash
npm run stop
```

## Servicios
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Base de datos PostgreSQL: http://localhost:5432

## Credenciales de prueba
- Usuario admin:
  - email: admin@example.com
  - Password: adminPass123
- Usuario profesor:
  - Username: teacher1@example.com
  - Password: teacherPass456

## Solución de problemas
- Si ves un error de Docker:
  - Mac: Verifica que Docker Desktop está abierto
  - Linux: Ejecuta `sudo systemctl start docker`
- Error de puertos en uso: Verifica que los puertos 5173, 3000 y 5432 están libres
- Para reiniciar desde cero:
  - Mac: Reinicia Docker Desktop
  - Linux: `sudo systemctl restart docker`
- Si el comando stop no funciona:
  1. Usa Ctrl + C en las terminales del frontend y backend
  2. Ejecuta `cd backend && npm run stop-services` para detener Docker