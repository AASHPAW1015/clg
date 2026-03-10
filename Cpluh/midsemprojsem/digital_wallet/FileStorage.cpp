// =============================================
// FileStorage — Handles saving/loading data to disk
// File format uses | as delimiter between fields
// =============================================

#include "FileStorage.h"
#include <fstream>
#include <sstream>
#include <iostream>
#include <vector>

using namespace std;

FileStorage::FileStorage(string file) {
    filename = file;
}

// Checks if the save file exists
bool FileStorage::fileExists() {
    ifstream f(filename);
    return f.good();
}

// ==================== SAVE ====================
// Writes all wallets and the entire blockchain to file
void FileStorage::saveToFile(DataStore& store) {
    ofstream file(filename);

    if (!file.is_open()) {
        cout << "  Error: Could not save data!" << endl;
        return;
    }

    // --- Save Wallets ---
    vector<string> ids = store.getAllWalletIDs();
    file << "WALLETS" << endl;
    file << ids.size() << endl;

    for (int i = 0; i < ids.size(); i++) {
        Wallet& w = store.getWallet(ids[i]);
        // Format: walletID|name|hashedPin
        // We access hashedPin through the getAccountInfo + verifyPin approach
        // Since hashedPin is private, we use a workaround:
        // We save the wallet info that we CAN access
        file << w.getWalletID() << "|" << w.getName() << "|" << w.getHashedPin() << endl;
    }

    // --- Save Blockchain ---
    vector<Block> chain = store.getLedger().getChain();
    file << "BLOCKCHAIN" << endl;
    file << chain.size() << endl;

    for (int i = 0; i < chain.size(); i++) {
        Block& b = chain[i];
        vector<Transaction> txs = b.getTransactions();

        // Block header: index|timestamp|previousHash|hash|txCount
        file << b.getIndex() << "|"
             << b.getTimestamp() << "|"
             << b.getPreviousHash() << "|"
             << b.getHash() << "|"
             << txs.size() << endl;

        // Each transaction: senderID|receiverID|amount|timestamp|txHash
        for (int j = 0; j < txs.size(); j++) {
            file << txs[j].getSenderID() << "|"
                 << txs[j].getReceiverID() << "|"
                 << txs[j].getAmount() << "|"
                 << txs[j].getTimestamp() << "|"
                 << txs[j].getTxHash() << endl;
        }
    }

    file.close();
}

// ==================== LOAD ====================
// Reads wallets and blockchain from file
void FileStorage::loadFromFile(DataStore& store) {
    ifstream file(filename);

    if (!file.is_open()) {
        return;  // No save file — fresh start
    }

    string line;

    // --- Load Wallets ---
    getline(file, line);  // "WALLETS"
    getline(file, line);  // wallet count
    int walletCount = stoi(line);

    for (int i = 0; i < walletCount; i++) {
        getline(file, line);

        // Parse: walletID|name|hashedPin
        stringstream ss(line);
        string walletID, name, hashedPin;

        getline(ss, walletID, '|');
        getline(ss, name, '|');
        getline(ss, hashedPin, '|');

        // Create wallet with the stored hashed PIN (already hashed)
        Wallet w(walletID, name, hashedPin);
        store.addWallet(w);
    }

    // --- Load Blockchain ---
    getline(file, line);  // "BLOCKCHAIN"
    getline(file, line);  // block count
    int blockCount = stoi(line);

    vector<Block> chain;

    for (int i = 0; i < blockCount; i++) {
        getline(file, line);

        // Parse block header: index|timestamp|previousHash|hash|txCount
        stringstream bs(line);
        string indexStr, timestamp, prevHash, hash, txCountStr;

        getline(bs, indexStr, '|');
        getline(bs, timestamp, '|');
        getline(bs, prevHash, '|');
        getline(bs, hash, '|');
        getline(bs, txCountStr, '|');

        int txCount = stoi(txCountStr);

        // Load transactions for this block
        vector<Transaction> txs;
        for (int j = 0; j < txCount; j++) {
            getline(file, line);

            // Parse: senderID|receiverID|amount|timestamp|txHash
            stringstream ts(line);
            string sender, receiver, amtStr, txTime, txHash;

            getline(ts, sender, '|');
            getline(ts, receiver, '|');
            getline(ts, amtStr, '|');
            getline(ts, txTime, '|');
            getline(ts, txHash, '|');

            // Use the load constructor (all fields provided)
            Transaction tx(sender, receiver, stod(amtStr), txTime, txHash);
            txs.push_back(tx);
        }

        // Use the load constructor for Block
        Block block(stoi(indexStr), txs, prevHash, timestamp, hash);
        chain.push_back(block);
    }

    // Replace the ledger's chain with loaded data
    store.getLedger().setChain(chain);

    file.close();
}
