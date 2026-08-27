// Supabase returns { data, error } instead of throwing.
// This turns an error result back into a thrown Error so the
// controllers can use plain try/catch, like mongoose did.
function unwrap({ data, error }) {
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

module.exports = unwrap;
