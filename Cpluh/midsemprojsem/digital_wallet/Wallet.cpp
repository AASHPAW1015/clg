#include "Wallet.h"
#include "sha256.h"

using namespace std;

// Default constructor
Wallet::Wallet() : Account(), hashedPin("") {}

// Constructor: takes already-hashed PIN
Wallet::Wallet(string id, string n, string hPin)
    : Account(id, n), hashedPin(hPin) {}

// Verifies PIN without ever exposing the stored hash
// 1. Takes raw PIN input from user
// 2. Hashes it with SHA-256
// 3. Compares the hash to the stored hash
// The actual PIN is NEVER stored or compared directly
bool Wallet::verifyPin(string inputPin) {
    return sha256(inputPin) == hashedPin;
}

// Returns the hashed PIN (for FileStorage saving only)
string Wallet::getHashedPin() {
    return hashedPin;
}
