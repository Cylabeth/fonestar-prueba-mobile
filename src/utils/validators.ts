/**
 * Basic field validators.
 * Returns an error message string or null if valid.
 */

export const validateEmail = (value: string): string | null => {
  if (!value.trim()) return 'El email es obligatorio';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Introduce un email válido';
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value) return 'La contraseña es obligatoria';
  if (value.length < 4) return 'Mínimo 4 caracteres';
  return null;
};
