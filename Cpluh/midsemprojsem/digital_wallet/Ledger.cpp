#include "Ledger.h"

using namespace std;

// Constructor: initializes the chain with the genesis block
Ledger::Ledger() {
    chain.push_back(createGenesisBlock());
}

// Genesis block = Block 0, no transactions, previous hash is "0"
Block Ledger::createGenesisBlock() {
    vector<Transaction> empty;
    return Block(0, empty, "0");
}

// Adds a transaction to the pending pool (not yet in any block)
void Ledger::addTransaction(Transaction tx) {
    pendingTransactions.push_back(tx);
}

// Mine: takes all pending transactions, seals them into a new block
void Ledger::mineBlock() {
    if (pendingTransactions.empty()) return;

    // New block links to the previous block's hash (the chain!)
    Block newBlock(
        chain.size(),                 // index = next position
        pendingTransactions,          // seal these transactions
        getLastBlock().getHash()      // link to previous block
    );

    chain.push_back(newBlock);
    pendingTransactions.clear();       // reset the pool
}

// Computes balance by scanning EVERY transaction in the chain
// Money received = +amount, Money sent = -amount
double Ledger::getBalance(string walletID) {
    double balance = 0.0;

    for (int i = 0; i < chain.size(); i++) {
        vector<Transaction> txs = chain[i].getTransactions();

        for (int j = 0; j < txs.size(); j++) {
            if (txs[j].getReceiverID() == walletID) {
                balance += txs[j].getAmount();    // inflow
            }
            if (txs[j].getSenderID() == walletID) {
                balance -= txs[j].getAmount();    // outflow
            }
        }
    }

    return balance;
}

// Filters all transactions involving a specific wallet
vector<Transaction> Ledger::getHistory(string walletID) {
    vector<Transaction> history;

    for (int i = 0; i < chain.size(); i++) {
        vector<Transaction> txs = chain[i].getTransactions();

        for (int j = 0; j < txs.size(); j++) {
            if (txs[j].getSenderID() == walletID ||
                txs[j].getReceiverID() == walletID) {
                history.push_back(txs[j]);
            }
        }
    }

    return history;
}

vector<Block> Ledger::getChain() { return chain; }

Block Ledger::getLastBlock() { return chain.back(); }

// Replaces the entire chain (used when loading from file)
void Ledger::setChain(vector<Block> newChain) {
    chain = newChain;
}

vector<Transaction> Ledger::getPendingTransactions() {
    return pendingTransactions;
}
