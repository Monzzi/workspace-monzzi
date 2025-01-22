const bcrypt = require('bcrypt');

async function generatePasswordHash() {
    const password = 'pilo'; // La contraseña que quieres usar
    const hash = await bcrypt.hash(password, 10); // Generar el hash con 10 saltos
    console.log(`Hash generado: ${hash}`);
}

generatePasswordHash();
