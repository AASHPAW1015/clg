#ifndef SHA256_H
#define SHA256_H

// =============================================
// OPEN-SOURCE SHA-256 IMPLEMENTATION
// This math is based on the standard NIST FIPS 180-4 
// cryptographic hash function algorithm.
// =============================================

#include <string>
using namespace std;

// Generates a SHA-256 hash string from any input string
string sha256(string input);

// Returns current timestamp as a readable string
string getCurrentTimestamp();

#endif
