// Configuración centralizada e inicialización única de Firebase Firestore
(function initFirebaseApp() {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: "AIzaSyDummyKeyForFirestoreDB",
      authDomain: "udaberri-txapelketak.firebaseapp.com",
      projectId: "udaberri-txapelketak",
      storageBucket: "udaberri-txapelketak.appspot.com",
      messagingSenderId: "1234567890",
      appId: "1:1234567890:web:abcdef123456"
    };
    firebase.initializeApp(firebaseConfig);
  }
})();

const db = firebase.firestore();

// 1. Obtener todas las parejas inscritas directamente del servidor (sin caché)
async function getCloudPairs() {
  try {
    const doc = await db.collection("txapelketa").doc("udaberri_pairs").get({ source: 'server' });
    if (doc.exists) {
      return doc.data() || {};
    }
    return {};
  } catch (error) {
    // Si falla la consulta a servidor, consulta la persistencia por defecto
    const fallbackDoc = await db.collection("txapelketa").doc("udaberri_pairs").get();
    return fallbackDoc.exists ? fallbackDoc.data() : {};
  }
}

// 2. Guardar parejas inscritas en la nube
async function saveCloudPairs(pairsData) {
  try {
    await db.collection("txapelketa").doc("udaberri_pairs").set(pairsData);
    return true;
  } catch (error) {
    console.error("Error al guardar parejas en la nube:", error);
    return false;
  }
}

// 3. Obtener todos los partidos de la nube (sin caché)
async function getCloudMatches() {
  try {
    const doc = await db.collection("txapelketa").doc("udaberri_matches").get({ source: 'server' });
    if (doc.exists) {
      return doc.data() || {};
    }
    return {};
  } catch (error) {
    const fallbackDoc = await db.collection("txapelketa").doc("udaberri_matches").get();
    return fallbackDoc.exists ? fallbackDoc.data() : {};
  }
}

// 4. Guardar partidos en la nube
async function saveCloudMatches(matchesData) {
  try {
    await db.collection("txapelketa").doc("udaberri_matches").set(matchesData);
    return true;
  } catch (error) {
    console.error("Error al guardar partidos en la nube:", error);
    return false;
  }
}
