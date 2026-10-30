const DRIVE_API_URL = "https://script.google.com/macros/s/AKfycbw7myV2ohCRTZAoAHwQvcSXGTvlYSaK8ZiYpYrBff5SX-DLc-Esm00eS-O3jDAQHtS64A/exec";

// Funciones de lectura y escritura inmediata en memoria local (Sin esperas de red)
function getLocalDB() {
  const data = localStorage.getItem('udaberri_local_db');
  return data ? JSON.parse(data) : { pairs: {}, matches: {} };
}

function saveLocalDB(db) {
  localStorage.setItem('udaberri_local_db', JSON.stringify(db));
}

async function getCloudPairs() {
  const db = getLocalDB();
  return db.pairs || {};
}

async function saveCloudPairs(pairsData) {
  const db = getLocalDB();
  db.pairs = pairsData;
  saveLocalDB(db);
  return true;
}

async function getCloudMatches() {
  const db = getLocalDB();
  return db.matches || {};
}

async function saveCloudMatches(matchesData) {
  const db = getLocalDB();
  db.matches = matchesData;
  saveLocalDB(db);
  return true;
}

// Sincronización manual explícita (Solo se activa al pulsar los botones)
async function syncFromCloud() {
  try {
    const response = await fetch(DRIVE_API_URL);
    const cloudData = await response.json();
    if (cloudData && typeof cloudData === 'object') {
      saveLocalDB({
        pairs: cloudData.pairs || {},
        matches: cloudData.matches || {}
      });
      return { success: true, message: "🔄 Datos descargados correctamente desde Google Drive." };
    }
    return { success: false, message: "La respuesta de Google Drive no es válida." };
  } catch (error) {
    console.error("Error al bajar de Drive:", error);
    return { success: false, message: "Error al conectar con Google Drive." };
  }
}

async function syncToCloud() {
  try {
    const localData = getLocalDB();
    await fetch(DRIVE_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(localData)
    });
    return { success: true, message: "☁️ Datos subidos con éxito a Google Drive." };
  } catch (error) {
    console.error("Error al subir a Drive:", error);
    return { success: false, message: "Error al enviar datos a Google Drive." };
  }
}
