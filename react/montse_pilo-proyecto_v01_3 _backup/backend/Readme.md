# Proyecto Final Express

Este proyecto implementa una API RESTful utilizando **Express** y **Sequelize** para la gestión de usuarios, profesores y estudiantes.

## Instrucciones para Iniciar el Proyecto

1. **Ejecutar servicios: docker y pgadmin**
    ```
    npm run start-services
    ```

2. **Variables de entorno**:
     - **[Archivo docker-compose-services.yml](/docker/dev/docker-compose.services.yml)**
    ```
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "postgres"
      POSTGRES_DB: "express-db-mpilo"
     ```

3. **Ejecutar migraciones y seeds**:

    #### ** Notas sobre los Datos Iniciales
    **La base de datos está "limpia" para que poder inicializarla desde cero con los datos básicos definidos en los seeders.**
    - **[Archivo curls.sh](/queries.sh)**

   - Ejecuta los siguientes comandos para preparar la base de datos:
     ```bash
     npx sequelize-cli db:migrate
     npx sequelize-cli db:seed:all
     ```

4. **Iniciar el servidor**:
   - Una vez configurado todo, inicia el servidor con:
     ```bash
     npm start
     ```
   - El servidor estará disponible en `http://localhost:3000`.

---
