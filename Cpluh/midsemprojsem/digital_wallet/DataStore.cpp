#include "DataStore.h"

using namespace std;

DataStore::DataStore() : walletCount(0) {}

// Adds a wallet to the dictionary
void DataStore::addWallet(Wallet w) {
    wallets[w.getWalletID()] = w;
    walletCount++;
}

// Returns a reference to the wallet (so changes persist)
Wallet& DataStore::getWallet(string id) {
    return wallets[id];
}

// Checks if a wallet exists in the dictionary
bool DataStore::walletExists(string id) {
    return wallets.find(id) != wallets.end();
}

int DataStore::getWalletCount() {
    return walletCount;
}

// Returns all wallet IDs (useful for listing)
vector<string> DataStore::getAllWalletIDs() {
    vector<string> ids;
    for (map<string, Wallet>::iterator it = wallets.begin();
         it != wallets.end(); it++) {
        ids.push_back(it->first);
    }
    return ids;
}

// Returns a reference to the ledger (so mined blocks persist)
Ledger& DataStore::getLedger() {
    return ledger;
}
