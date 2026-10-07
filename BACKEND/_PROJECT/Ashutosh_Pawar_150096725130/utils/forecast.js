// Turns a scheduled service into a prediction using the vehicle's odometer
// and its average km per day.
// e.g. tire rotation due at 32,800 km, truck at 31,200 km doing 120 km/day
//      -> 1,600 km left -> about 13 days -> "due soon"
const DUE_SOON_DAYS = 14;

const label = (type) => type.replace(/_/g, " ");

const forecast = (maintenance, vehicle) => {
  if (maintenance.status === "completed") {
    return { kmLeft: null, daysLeft: null, alert: "done", message: "completed" };
  }

  const kmLeft = maintenance.dueAtKm - vehicle.mileage;
  const daysLeft = Math.max(0, Math.floor(kmLeft / vehicle.avgKmPerDay));

  if (kmLeft <= 0) {
    return {
      kmLeft,
      daysLeft: 0,
      alert: "overdue",
      message:
        kmLeft === 0
          ? `${vehicle.plateNumber} ${label(maintenance.type)} due now at ${maintenance.dueAtKm} km`
          : `${vehicle.plateNumber} ${label(maintenance.type)} overdue by ${-kmLeft} km`,
    };
  }

  return {
    kmLeft,
    daysLeft,
    alert: daysLeft <= DUE_SOON_DAYS ? "due soon" : "ok",
    message: `${vehicle.plateNumber} ${label(maintenance.type)} due in ${daysLeft} days (${kmLeft} km left)`,
  };
};

module.exports = { forecast, label };
