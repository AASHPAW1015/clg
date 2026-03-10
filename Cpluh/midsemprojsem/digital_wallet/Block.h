#ifndef BLOCK_H
#define BLOCK_H

#include <string>
#include <vector>
#include "Transaction.h"

using namespace std;

// A Block holds a group of transactions and links to the previous block
// via its hash — forming the "chain" in blockchain
class Block {
private:
    int index;                          // Position in the chain (0 = genesis)
    string timestamp;                   // When this block was created
    vector<Transaction> transactions;   // Transactions sealed in this block
    string previousHash;                // Hash of the previous block (the chain link!)
    string hash;                        // This block's own hash

    // Computes hash from all block data
    string calculateHash();

public:
    // Constructor: auto-computes hash based on contents
    Block(int idx, vector<Transaction> txs, string prevHash);

    // Constructor for loading saved data (all fields provided)
    Block(int idx, vector<Transaction> txs, string prevHash, string ts, string h);

    // Getters
    int getIndex();
    string getTimestamp();
    vector<Transaction> getTransactions();
    string getPreviousHash();
    string getHash();
};

#endif
