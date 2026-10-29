// Enlace a la API de Google Sheets en Drive
const DRIVE_API_URL = "https://script.google.com/macros/s/AKfycbw7myV2ohCRTZAoAHwQvcSXGTvlYSaK8ZiYpYrBff5SX-DLc-Esm00eS-O3jDAQHtS64A/exec";

// 1. Obtener todas las parejas inscritas desde Google Sheets
async function getCloudPairs() {
  try {
    const response = await fetch(DRIVE_API_URL);
    const data = await response.json();
    return data.pairs || {};
  } catch (error) {
    console.error("Error leyendo parejas de Drive:", error);
    return {};
  }
}

// 2. Guardar parejas inscritas en Google Sheets
async function saveCloudPairs(pairsData) {
  try {
    const currentData = await fetchDriveData();
    currentData.pairs = pairsData;
    
    await fetch(DRIVE_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentData)
    });
    return true;
  } catch (error) {
    console.error("Error guardando parejas en Drive:", error);
    return false;
  }
}

// 3. Obtener partidos desde Google Sheets
async function getCloudMatches() {
  try {
    const response = await fetch(DRIVE_API_URL);
    const data = await response.json();
    return data.matches || {};
  } catch (error) {
    console.error("Error leyendo partidos de Drive:", error);
    return {};
  }
}

// 4. Guardar partidos en Google Sheets
async function saveCloudMatches(matchesData) {
  try {
    const currentData = await fetchDriveData();
    currentData.matches = matchesData;
    
    await fetch(DRIVE_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentData)
    });
    return true;
  } catch (error) {
    console.error("Error guardando partidos en Drive:", error);
    return false;
  }
}

// Función auxiliar para leer la estructura JSON completa de la hoja
async function fetchDriveData() {
  try {
    const response = await fetch(DRIVE_API_URL);
    return await response.json();
  } catch (e) {
    return { pairs: {}, matches: {} };
  }
}
