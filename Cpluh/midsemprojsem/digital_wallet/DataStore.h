#ifndef DATASTORE_H
#define DATASTORE_H

#include <map>
#include <vector>
#include <string>
#include "Wallet.h"
#include "Ledger.h"

using namespace std;

// =============================================
// DataStore — Central data storage for the app
// Since we can't use JSON files or databases,
// this file acts as our "in-memory database"
// holding all wallets and the blockchain ledger
// =============================================
class DataStore {
private:
    map<string, Wallet> wallets;   // walletID -> Wallet (our dictionary)
    Ledger ledger;                 // The blockchain
    int walletCount;               // Total wallets created

public:
    DataStore();

    // ---- Wallet operations ----
    void addWallet(Wallet w);
    Wallet& getWallet(string id);       // returns by reference (editable)
    bool walletExists(string id);
    int getWalletCount();
    vector<string> getAllWalletIDs();

    // ---- Ledger access ----
    Ledger& getLedger();                // returns by reference
};

#endif
