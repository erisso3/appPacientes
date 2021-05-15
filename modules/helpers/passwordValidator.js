export function passwordValidator(password) {
    if (!password) return "La contraseña no puede estar vacía."
    if (password.length < 2) return 'La contraseña debe tener al menos 2 caracteres.'
    return ''
  }
  