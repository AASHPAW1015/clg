#include "Block.h"
#include "sha256.h"
#include <sstream>

using namespace std;

// Constructor: creates a block and seals it with a hash
Block::Block(int idx, vector<Transaction> txs, string prevHash) {
    index = idx;
    transactions = txs;
    previousHash = prevHash;
    timestamp = getCurrentTimestamp();
    hash = calculateHash();  // seal the block
}

// Constructor for loading saved blocks — uses stored hash/timestamp
Block::Block(int idx, vector<Transaction> txs, string prevHash, string ts, string h) {
    index = idx;
    transactions = txs;
    previousHash = prevHash;
    timestamp = ts;
    hash = h;
}

// Computes hash from: index + timestamp + previousHash + all transaction hashes
// If ANY data changes, this hash changes — tamper detection
string Block::calculateHash() {
    stringstream ss;
    ss << index << timestamp << previousHash;

    for (int i = 0; i < transactions.size(); i++) {
        ss << transactions[i].getTxHash();
    }

    return sha256(ss.str());
}

// --- Getters ---
int Block::getIndex()                         { return index; }
string Block::getTimestamp()                   { return timestamp; }
vector<Transaction> Block::getTransactions()   { return transactions; }
string Block::getPreviousHash()               { return previousHash; }
string Block::getHash()                       { return hash; }
