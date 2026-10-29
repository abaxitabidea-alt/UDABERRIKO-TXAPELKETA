// Configuración e Inicialización Centralizada de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForFirestoreDB",
  authDomain: "udaberri-txapelketak.firebaseapp.com",
  projectId: "udaberri-txapelketak",
  storageBucket: "udaberri-txapelketak.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Garantizar inicialización única sin errores
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function getDbInstance() {
  return firebase.firestore();
}

// 1. Obtener todas las parejas inscritas directamente del servidor
async function getCloudPairs() {
  try {
    const db = getDbInstance();
    const doc = await db.collection("txapelketa").doc("udaberri_pairs").get();
    if (doc.exists) {
      return doc.data() || {};
    }
    return {};
  } catch (error) {
    console.error("Error leyendo parejas de la nube:", error);
    return {};
  }
}

// 2. Guardar parejas inscritas en la nube
async function saveCloudPairs(pairsData) {
  try {
    const db = getDbInstance();
    await db.collection("txapelketa").doc("udaberri_pairs").set(pairsData);
    return true;
  } catch (error) {
    console.error("Error guardando parejas en la nube:", error);
    return false;
  }
}

// 3. Obtener todos los partidos de la nube
async function getCloudMatches() {
  try {
    const db = getDbInstance();
    const doc = await db.collection("txapelketa").doc("udaberri_matches").get();
    if (doc.exists) {
      return doc.data() || {};
    }
    return {};
  } catch (error) {
    console.error("Error leyendo partidos de la nube:", error);
    return {};
  }
}

// 4. Guardar partidos en la nube
async function saveCloudMatches(matchesData) {
  try {
    const db = getDbInstance();
    await db.collection("txapelketa").doc("udaberri_matches").set(matchesData);
    return true;
  } catch (error) {
    console.error("Error guardando partidos en la nube:", error);
    return false;
  }
}
