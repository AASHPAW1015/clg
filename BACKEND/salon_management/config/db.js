// Supabase client. Unlike mongoose there is no connection to open --
// this object just knows the project URL + key and turns every query
// into an HTTP request.
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = supabase;
