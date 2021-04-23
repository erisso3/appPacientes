export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "El correo electrónico no puede estar vacía."
    if (!re.test(email)) return '¡Vaya! Necesitamos una dirección de correo electrónico válida.'
    return ''
  }
  