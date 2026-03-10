#ifndef TRANSACTION_H
#define TRANSACTION_H

#include <string>
using namespace std;

// Represents a single transaction between two wallets
// Once created, transaction data cannot be changed (immutability)
class Transaction {
private:
    string senderID;    // Wallet ID of the sender
    string receiverID;  // Wallet ID of the receiver
    double amount;      // Amount transferred
    string timestamp;   // When the transaction was created
    string txHash;      // SHA-256 hash of this transaction's data

public:
    // Constructor: auto-generates timestamp and hash
    Transaction(string sender, string receiver, double amt);

    // Constructor for loading saved data (all fields provided)
    Transaction(string sender, string receiver, double amt, string ts, string hash);

    // Getters — read-only access to private data
    string getSenderID();
    string getReceiverID();
    double getAmount();
    string getTimestamp();
    string getTxHash();

    // Combines all fields into one string (used for hashing)
    string toHashString();
};

#endif
