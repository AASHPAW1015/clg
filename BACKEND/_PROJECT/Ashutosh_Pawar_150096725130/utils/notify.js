const Notification = require("../models/Notification");
const firebase = require("../config/firebase");

// One place for every alert in the app:
// 1. push it through Firebase Cloud Messaging to the "fleetguard-<audience>" topic
// 2. save it in MongoDB
// 3. send it over Socket.io so open pages show it straight away
const notify = async (app, { title, body, audience = "all", vehicle, sentBy }) => {
  const notification = new Notification({ title, body, audience, vehicle, sentBy });
  await notification.validate();

  if (firebase) {
    try {
      await firebase.messaging.send({
        topic: `fleetguard-${audience}`,
        notification: { title, body },
      });
      notification.pushed = true;
    } catch (error) {
      notification.pushError = error.message;
    }
  }

  await notification.save();
  app.get("io").emit("notification", notification);
  return notification;
};

module.exports = notify;
