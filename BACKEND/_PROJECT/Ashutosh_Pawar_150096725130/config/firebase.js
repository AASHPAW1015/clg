const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getMessaging } = require("firebase-admin/messaging");

// Credentials come from the FIREBASE_SERVICE_ACCOUNT env var (one-line JSON)
// or from serviceAccountKey.json in the project root.
// Firebase is optional: without credentials the app still runs, notifications
// are saved and shown live over Socket.io, they just are not pushed through FCM.
function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }
  try {
    return require("../serviceAccountKey.json");
  } catch (error) {
    return null;
  }
}

const serviceAccount = loadServiceAccount();

let firebase = null;

if (serviceAccount) {
  const app = initializeApp({ credential: cert(serviceAccount) });
  firebase = { auth: getAuth(app), messaging: getMessaging(app) };
  console.log(`firebase connected: ${serviceAccount.project_id}`);
} else {
  console.log("firebase not configured, push notifications and firebase login are off");
}

module.exports = firebase;
