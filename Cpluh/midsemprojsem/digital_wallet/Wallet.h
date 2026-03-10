#ifndef WALLET_H
#define WALLET_H

#include "Account.h"
#include <string>
using namespace std;

// Wallet class — INHERITS from Account
// Demonstrates: inheritance, encapsulation, polymorphism
//
// SECURITY: The PIN is stored as a SHA-256 hash (never plaintext!)
//           There is NO getter for hashedPin — maximum data hiding
class Wallet : public Account {
private:
    // PRIVATE — only accessible inside this class
    // Even derived classes or friend classes CANNOT read this directly
    string hashedPin;

public:
    Wallet();
    Wallet(string id, string n, string hPin);

    // Verifies PIN by hashing input and comparing — never exposes stored hash
    bool verifyPin(string inputPin);

    // Returns hashed PIN (used ONLY by FileStorage for saving)
    string getHashedPin();
};

#endif
