// Archivo temporal que he utilizado para encriptar contraseñas y hacer pruebas
const bcrypt = require('bcrypt');

async function generatePasswordHash() {
  const password = 'tu_contraseña'; // Introducir la contraseña que quieres usar para encriptar
  const hash = await bcrypt.hash(password, 10);
  console.log(`Hash generado: ${hash}`);
}

generatePasswordHash();
