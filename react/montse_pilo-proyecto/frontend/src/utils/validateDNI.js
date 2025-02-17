export const validateDNI = (dni) => {
  // Solo validamos formato: 8 números seguidos de una letra mayúscula
  const dniRegex = /^[0-9]{8}[A-Z]$/;

  if (!dniRegex.test(dni)) {
    return 'El DNI debe tener 8 números seguidos de una letra mayúscula';
  }

  return ''; // DNI válido
};
