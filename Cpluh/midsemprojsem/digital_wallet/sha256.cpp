// =============================================
// SHA-256 Hashing Implementation
// OPEN-SOURCE IMPLEMENTATION based on the NIST 
// FIPS 180-4 standard mathematically derived logic.
// This generates a unique 64-character hex string
// from any input — used for transaction security.
// =============================================

#include "sha256.h"
#include <vector>
#include <sstream>
#include <iomanip>
#include <ctime>
#include <cstring>

using namespace std;

// --- Constants used by the SHA-256 algorithm ---

// Initial hash values: derived from square roots of first 8 primes
static const unsigned int H_INIT[8] = {
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
};

// Round constants: derived from cube roots of first 64 primes
static const unsigned int K[64] = {
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
};

// --- Helper functions for bit manipulation ---

// Right rotate: shifts bits right and wraps them around
unsigned int rotr(unsigned int x, unsigned int n) {
    return (x >> n) | (x << (32 - n));
}

// Choose function: if bit in x is 1, pick from y; else pick from z
unsigned int ch(unsigned int x, unsigned int y, unsigned int z) {
    return (x & y) ^ (~x & z);
}

// Majority function: picks the majority bit among x, y, z
unsigned int maj(unsigned int x, unsigned int y, unsigned int z) {
    return (x & y) ^ (x & z) ^ (y & z);
}

// Sigma functions used in the compression rounds
unsigned int sigma0(unsigned int x) {
    return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22);
}

unsigned int sigma1(unsigned int x) {
    return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25);
}

// Gamma functions used in the message schedule
unsigned int gamma0(unsigned int x) {
    return rotr(x, 7) ^ rotr(x, 18) ^ (x >> 3);
}

unsigned int gamma1(unsigned int x) {
    return rotr(x, 17) ^ rotr(x, 19) ^ (x >> 10);
}

// =============================================
// Main SHA-256 function
// Takes any string input, returns 64-char hex hash
// =============================================
string sha256(string input) {

    // --- Step 1: Pre-processing (padding the message) ---
    unsigned long long bitLen = input.size() * 8;

    // Convert string to bytes
    vector<unsigned char> msg(input.begin(), input.end());

    // Append the bit '1' (as 0x80 byte)
    msg.push_back(0x80);

    // Pad with zeros until length is 56 mod 64 bytes
    while (msg.size() % 64 != 56) {
        msg.push_back(0x00);
    }

    // Append original message length as 64-bit big-endian
    for (int i = 7; i >= 0; i--) {
        msg.push_back((bitLen >> (i * 8)) & 0xFF);
    }

    // --- Step 2: Initialize hash values ---
    unsigned int h[8];
    for (int i = 0; i < 8; i++) h[i] = H_INIT[i];

    // --- Step 3: Process each 512-bit (64-byte) chunk ---
    for (size_t chunk = 0; chunk < msg.size(); chunk += 64) {

        // Create 64-word message schedule
        unsigned int w[64];

        // First 16 words come directly from the chunk
        for (int i = 0; i < 16; i++) {
            w[i] = (msg[chunk + i * 4] << 24) |
                   (msg[chunk + i * 4 + 1] << 16) |
                   (msg[chunk + i * 4 + 2] << 8) |
                   (msg[chunk + i * 4 + 3]);
        }

        // Remaining 48 words are derived from previous words
        for (int i = 16; i < 64; i++) {
            w[i] = gamma1(w[i - 2]) + w[i - 7] + gamma0(w[i - 15]) + w[i - 16];
        }

        // Initialize working variables with current hash values
        unsigned int a = h[0], b = h[1], c = h[2], d = h[3];
        unsigned int e = h[4], f = h[5], g = h[6], hh = h[7];

        // --- Step 4: Run 64 compression rounds ---
        for (int i = 0; i < 64; i++) {
            unsigned int t1 = hh + sigma1(e) + ch(e, f, g) + K[i] + w[i];
            unsigned int t2 = sigma0(a) + maj(a, b, c);

            hh = g;
            g = f;
            f = e;
            e = d + t1;
            d = c;
            c = b;
            b = a;
            a = t1 + t2;
        }

        // Add compressed values back to hash
        h[0] += a; h[1] += b; h[2] += c; h[3] += d;
        h[4] += e; h[5] += f; h[6] += g; h[7] += hh;
    }

    // --- Step 5: Produce final 64-character hex string ---
    stringstream ss;
    for (int i = 0; i < 8; i++) {
        ss << hex << setfill('0') << setw(8) << h[i];
    }

    return ss.str();
}

// Returns the current time as "YYYY-MM-DD HH:MM:SS"
string getCurrentTimestamp() {
    time_t now = time(0);
    char buf[80];
    strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", localtime(&now));
    return string(buf);
}
