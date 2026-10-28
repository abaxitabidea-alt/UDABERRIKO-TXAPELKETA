// ==========================================
// CONFIGURACIÓN CENTRAL DE FIREBASE (NUBE)
// Udaberriko Txapelketak
// ==========================================

// Importación de SDKs de Firebase desde CDN (Compatibilidad)
(function loadFirebaseSDKs() {
  if (typeof firebase === 'undefined') {
    const appScript = document.createElement('script');
    appScript.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js";
    document.head.appendChild(appScript);

    appScript.onload = () => {
      const dbScript = document.createElement('script');
      dbScript.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js";
      document.head.appendChild(dbScript);
      dbScript.onload = initFirebase;
    };
  } else {
    initFirebase();
  }
})();

let db = null;

function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDhdhnPDtATGjXh7euwUBXs8Fq1fxKit7o",
    authDomain: "udaberri-txapelketa.firebaseapp.com",
    projectId: "udaberri-txapelketa",
    storageBucket: "udaberri-txapelketa.appspot.com",
    messagingSenderId: "47658305626",
    appId: "1:47658305625:web:9c55567ae2fd35874a4948"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  db = firebase.firestore();
  console.log("🔥 Conexión con Firebase Firestore establecida con éxito.");
}

// ==========================================
// FUNCIONES DE LECTURA Y ESCRITURA GLOBAL
// ==========================================

// 1. Obtener todas las parejas inscritas desde la nube
async function getCloudPairs() {
  try {
    if (!db) await waitForFirebase();
    const doc = await db.collection('torneo').doc('udaberri_pairs').get();
    return doc.exists ? doc.data() : {};
  } catch (error) {
    console.error("Error leyendo parejas de la nube:", error);
    return JSON.parse(localStorage.getItem('udaberri_pairs')) || {};
  }
}

// 2. Guardar parejas inscritas en la nube
async function saveCloudPairs(allPairsData) {
  try {
    if (!db) await waitForFirebase();
    await db.collection('torneo').doc('udaberri_pairs').set(allPairsData);
    // Guardar respaldo local por seguridad
    localStorage.setItem('udaberri_pairs', JSON.stringify(allPairsData));
    return true;
  } catch (error) {
    console.error("Error guardando parejas en la nube:", error);
    return false;
  }
}

// 3. Obtener el calendario de partidos y marcadores desde la nube
async function getCloudMatches() {
  try {
    if (!db) await waitForFirebase();
    const doc = await db.collection('torneo').doc('udaberri_matches').get();
    return doc.exists ? doc.data() : {};
  } catch (error) {
    console.error("Error leyendo partidos de la nube:", error);
    return JSON.parse(localStorage.getItem('udaberri_matches')) || {};
  }
}

// 4. Guardar el calendario de partidos y marcadores en la nube
async function saveCloudMatches(allMatchesData) {
  try {
    if (!db) await waitForFirebase();
    await db.collection('torneo').doc('udaberri_matches').set(allMatchesData);
    // Guardar respaldo local por seguridad
    localStorage.setItem('udaberri_matches', JSON.stringify(allMatchesData));
    return true;
  } catch (error) {
    console.error("Error guardando partidos en la nube:", error);
    return false;
  }
}

// Auxiliar para esperar la carga del SDK de Firebase
function waitForFirebase() {
  return new Promise((resolve) => {
    const check = setInterval(() => {
      if (db) {
        clearInterval(check);
        resolve();
      }
    }, 100);
  });
}
