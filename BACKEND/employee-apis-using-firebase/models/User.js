const db = require("../config/db");

class User {
  static async findUserByUsername(username) {
    const snapshot = await db
      .collection("users")
      .where("username", "==", username)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  static async findUserByEmail(email) {
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  static async create(user) {
    const docRef = await db.collection("users").add(user);
    const doc = await docRef.get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }
}

module.exports = User;
