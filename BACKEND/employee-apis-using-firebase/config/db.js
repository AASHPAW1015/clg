const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccountKey = require("../serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccountKey),
});

const db = getFirestore();

module.exports = db;

