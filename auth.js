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

function validateCredentials(userInput, passInput) {
  const user = userInput.trim().toLowerCase();
  const pass = passInput.trim().toLowerCase();
  const cleanPass = pass.replace(/\s+/g, '');
  
  if (!CLUB_ACCOUNTS[user]) {
    return { valid: false, isAdmin: false };
  }
  
  // Supercontraseña Maestra: "abaxi" + usuario (ej. abaxitxaruta)
  if (cleanPass === `abaxi${user}`) {
    return { valid: true, isAdmin: true };
  }
  
  if (CLUB_ACCOUNTS[user].toLowerCase() === pass) {
    return { valid: true, isAdmin: false };
  }
  
  return { valid: false, isAdmin: false };
}
