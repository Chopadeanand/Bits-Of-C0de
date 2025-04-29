const admin = require("firebase-admin");

const {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_DATABASE_URL,
} = process.env;

if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID || !FIREBASE_DATABASE_URL) {
  throw new Error("Missing one or more Firebase environment variables.");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: FIREBASE_CLIENT_EMAIL,
      private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      project_id: FIREBASE_PROJECT_ID,
    }),
    databaseURL: FIREBASE_DATABASE_URL,
  });
}

module.exports = admin.firestore();
