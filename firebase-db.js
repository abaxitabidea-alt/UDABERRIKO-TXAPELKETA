// Configuración e Inicialización Centralizada de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForFirestoreDB",
  authDomain: "udaberri-txapelketak.firebaseapp.com",
  projectId: "udaberri-txapelketak",
  storageBucket: "udaberri-txapelketak.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Garantizar inicialización única
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// Configurar transporte directo y limpiar caché previa
db.settings({
  host: "firestore.googleapis.com",
  ssl: true,
  experimentalForceLongPolling: true
});

// 1. Obtener parejas inscritas de la nube directamente
async function getCloudPairs() {
  try {
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
    await db.collection("txapelketa").doc("udaberri_pairs").set(pairsData);
    return true;
  } catch (error) {
    console.error("Error guardando parejas en la nube:", error);
    return false;
  }
}

// 3. Obtener partidos de la nube
async function getCloudMatches() {
  try {
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
    await db.collection("txapelketa").doc("udaberri_matches").set(matchesData);
    return true;
  } catch (error) {
    console.error("Error guardando partidos en la nube:", error);
    return false;
  }
}
