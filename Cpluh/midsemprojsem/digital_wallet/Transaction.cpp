#include "Transaction.h"
#include "sha256.h"
#include <sstream>

using namespace std;

// Constructor: sets all fields and generates a unique hash
Transaction::Transaction(string sender, string receiver, double amt) {
    senderID = sender;
    receiverID = receiver;
    amount = amt;
    timestamp = getCurrentTimestamp();

    // Hash is generated from all transaction data combined
    // This makes each transaction uniquely identifiable
    txHash = sha256(toHashString());
}

// Constructor for loading saved data — no recomputation
Transaction::Transaction(string sender, string receiver, double amt, string ts, string hash) {
    senderID = sender;
    receiverID = receiver;
    amount = amt;
    timestamp = ts;
    txHash = hash;
}

// --- Getters ---
string Transaction::getSenderID()   { return senderID; }
string Transaction::getReceiverID() { return receiverID; }
double Transaction::getAmount()     { return amount; }
string Transaction::getTimestamp()   { return timestamp; }
string Transaction::getTxHash()     { return txHash; }

// Combines all data into one string for hashing
string Transaction::toHashString() {
    stringstream ss;
    ss << senderID << receiverID << amount << timestamp;
    return ss.str();
}
