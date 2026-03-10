#ifndef ACCOUNT_H
#define ACCOUNT_H

#include <string>
using namespace std;

// Base class for all accounts — demonstrates INHERITANCE
// Wallet class inherits from this (see Wallet.h)
class Account {
protected:
    string walletID;  // Unique identifier
    string name;      // Account holder name

public:
    Account();
    Account(string id, string n);

    // Getters
    string getWalletID();
    string getName();
};

#endif
