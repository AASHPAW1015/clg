const supabase = require("../config/db");
const unwrap = require("./unwrap");

// Never select("*") here -- that would pull the password hash out too.
const PUBLIC_FIELDS = "id, username, email";

async function findByEmail(email) {
  // maybeSingle() gives back null when there is no matching row,
  // instead of erroring the way single() does.
  return unwrap(
    await supabase.from("users").select("*").eq("email", email).maybeSingle()
  );
}

async function create({ username, email, password }) {
  return unwrap(
    await supabase
      .from("users")
      .insert({ username, email, password })
      .select(PUBLIC_FIELDS)
      .maybeSingle()
  );
}

module.exports = { findByEmail, create };
