const supabase = require("../config/db");
const unwrap = require("./unwrap");

async function findAll() {
  return unwrap(await supabase.from("salons").select("*"));
}

async function findById(id) {
  return unwrap(
    await supabase.from("salons").select("*").eq("id", id).maybeSingle()
  );
}

async function findByCity(city) {
  // ilike = case insensitive match, so "pune" and "Pune" both work.
  return unwrap(await supabase.from("salons").select("*").ilike("city", city));
}

async function findTopRated(limit = 5) {
  return unwrap(
    await supabase
      .from("salons")
      .select("*")
      .order("rating", { ascending: false })
      .limit(limit)
  );
}

async function create({ name, city, address, rating }) {
  return unwrap(
    await supabase
      .from("salons")
      .insert({ name, city, address, rating })
      .select()
      .maybeSingle()
  );
}

async function update(id, fields) {
  // Returns null when no row had that id -- that is our 404 signal.
  return unwrap(
    await supabase.from("salons").update(fields).eq("id", id).select().maybeSingle()
  );
}

async function remove(id) {
  return unwrap(
    await supabase.from("salons").delete().eq("id", id).select().maybeSingle()
  );
}

module.exports = { findAll, findById, findByCity, findTopRated, create, update, remove };
