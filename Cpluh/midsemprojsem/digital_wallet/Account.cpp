#include "Account.h"

using namespace std;

// Default constructor
Account::Account() : walletID(""), name("") {}

// Parameterized constructor
Account::Account(string id, string n) : walletID(id), name(n) {}

string Account::getWalletID() { return walletID; }
string Account::getName()     { return name; }
