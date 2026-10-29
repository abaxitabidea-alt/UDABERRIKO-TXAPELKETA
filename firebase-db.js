// Configuración e Inicialización Centralizada de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbdhnPDtATGlXh7emwUBXs8FqlfvKiT7o",
  authDomain: "udaberri-txapelketak.firebaseapp.com",
  projectId: "udaberri-txapelketak",
  storageBucket: "udaberri-txapelketak.firebasestorage.app",
  messagingSenderId: "47658305625",
  appId: "1:47658305625:web:9c55567ae2fd35874a4940"
};

// Inicialización única de la aplicación
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// 1. Obtener todas las parejas inscritas directamente de la nube
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

// 3. Obtener todos los partidos de la nube
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
