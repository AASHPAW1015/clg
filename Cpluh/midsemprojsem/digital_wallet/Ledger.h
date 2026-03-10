#ifndef LEDGER_H
#define LEDGER_H

#include <vector>
#include <string>
#include "Block.h"
#include "Transaction.h"

using namespace std;

// Ledger — the blockchain that stores ALL transactions
// Balances are NEVER stored as numbers; they are COMPUTED
// by scanning the entire chain (just like real blockchains)
class Ledger {
private:
    vector<Block> chain;                    // The blockchain itself
    vector<Transaction> pendingTransactions; // Waiting to be mined into a block

    // Creates the very first block (genesis block)
    Block createGenesisBlock();

public:
    Ledger();

    // Adds a transaction to the pending pool
    void addTransaction(Transaction tx);

    // Mines a new block: seals all pending transactions into a block
    void mineBlock();

    // Computes balance by scanning the ENTIRE chain
    double getBalance(string walletID);

    // Gets all transactions involving a specific wallet
    vector<Transaction> getHistory(string walletID);

    // Returns the full blockchain
    vector<Block> getChain();

    // Returns the most recent block
    Block getLastBlock();

    // For file persistence — replace the entire chain
    void setChain(vector<Block> newChain);

    // Access pending transactions (for saving)
    vector<Transaction> getPendingTransactions();
};

#endif
