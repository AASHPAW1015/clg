const Notification = require("../models/Notification");
const notify = require("../utils/notify");

const sendNotification = async (request, response) => {
  const { title, body, audience, vehicle } = request.body;
  const notification = await notify(request.app, {
    title,
    body,
    audience,
    vehicle: vehicle || undefined,
    sentBy: request.user.id,
  });
  return response.status(201).json({ message: "Notification sent!", notification });
};

// latest 50 meant for everyone or for this user's role
const getNotifications = async (request, response) => {
  const notifications = await Notification.find({
    audience: { $in: ["all", `${request.user.role}s`] },
  })
    .sort({ createdAt: -1 })
    .limit(50)
    .populate("sentBy", "name");
  return response.status(200).json({ count: notifications.length, notifications });
};

module.exports = { sendNotification, getNotifications };
