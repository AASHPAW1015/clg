const supabase = require("../config/db");
const unwrap = require("./unwrap");

async function findBySalon(salonId) {
  return unwrap(
    await supabase.from("services").select("*").eq("salon_id", salonId)
  );
}

async function findAvailable() {
  return unwrap(
    await supabase.from("services").select("*").eq("is_available", true)
  );
}

async function create(salonId, { serviceName, price, duration, isAvailable }) {
  // The DB columns are snake_case because Postgres lowercases any
  // identifier that is not quoted -- "serviceName" would become "servicename".
  return unwrap(
    await supabase
      .from("services")
      .insert({
        salon_id: salonId,
        service_name: serviceName,
        price,
        duration,
        is_available: isAvailable,
      })
      .select()
      .maybeSingle()
  );
}

async function update(id, fields) {
  return unwrap(
    await supabase.from("services").update(fields).eq("id", id).select().maybeSingle()
  );
}

async function remove(id) {
  return unwrap(
    await supabase.from("services").delete().eq("id", id).select().maybeSingle()
  );
}

module.exports = { findBySalon, findAvailable, create, update, remove };
