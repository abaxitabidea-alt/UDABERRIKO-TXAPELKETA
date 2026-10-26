// CONFIGURACIÓN ÚNICA DE CUENTAS DE CLUBES
const CLUB_ACCOUNTS = {
  "txaruta": "txaruta",
  "erreka": "erreka",
  "sanmiguel": "sanmiguel",
  "oberena": "oberena",
  "abaxitabidea": "abaxitabidea",
  "bortziriak": "bortziriak",
  "zugarralde": "zugarralde",
  "sansebastian": "sansebastian",
  "berriozar": "berriozar",
  "ameskoa": "ameskoa",
  "agoitz": "agoitz",
  "araxes": "araxes",
  "ardoi": "ardoi",
  "kantolagua": "kantolagua",
  "irurtzun": "irurtzun",
  "lagunak": "lagunak",
  "mutilendako": "mutilendako",
  "pilotajauku": "pilotajauku",
  "buruzgain": "buruzgain",
  "umoreona": "umoreona",
  "lodosa": "lodosa",
  "leitza": "leitza",
  "aldabide": "aldabide"
};

// VALIDACIÓN DE CREDENCIALES (Estándar y Superadministrador Abaxi)
function validateCredentials(userInput, passInput) {
  if (!userInput || !passInput) return { valid: false, isAdmin: false };

  const user = userInput.trim().toLowerCase();
  const pass = passInput.trim().toLowerCase();
  const cleanPass = pass.replace(/\s+/g, '');

  if (!CLUB_ACCOUNTS[user]) {
    return { valid: false, isAdmin: false };
  }

  // 1. Supercontraseña Maestro (empieza por "abaxi")
  if (cleanPass === `abaxi${user}` || pass === `abaxi ${user}`) {
    return { valid: true, isAdmin: true };
  }

  // 2. Contraseña normal del club
  if (CLUB_ACCOUNTS[user].toLowerCase() === pass) {
    return { valid: true, isAdmin: (user === 'abaxitabidea') };
  }

  return { valid: false, isAdmin: false };
}
