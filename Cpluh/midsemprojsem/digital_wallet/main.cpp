// =============================================
// Digital Wallet System — Main Application
// Entry point for the CLI application
// =============================================

#include <iostream>
#include <string>
#include "DataStore.h"
#include "Display.h"
#include "FileStorage.h"
#include "sha256.h"

using namespace std;

// Global data store — our in-memory "database"
DataStore dataStore;

// File storage — saves/loads data to wallet_data.dat
FileStorage fileStorage("wallet_data.dat");

// ==================== SIGNUP ====================
void handleSignup() {
    Display::clearScreen();
    Display::showHeader("CREATE NEW WALLET");

    string name, pin, confirmPin;

    cout << "  Enter your name: ";
    getline(cin, name);

    cout << "  Set a PIN (4-6 digits): ";
    getline(cin, pin);

    cout << "  Confirm PIN: ";
    getline(cin, confirmPin);

    // Validate PIN match
    if (pin != confirmPin) {
        Display::showError("PINs do not match!");
        Display::pause();
        return;
    }

    // Validate PIN length
    if (pin.length() < 4 || pin.length() > 6) {
        Display::showError("PIN must be 4-6 digits!");
        Display::pause();
        return;
    }

    // Generate unique wallet ID using SHA-256 of name + timestamp
    string walletID = "W-" + sha256(name + getCurrentTimestamp()).substr(0, 8);

    // Hash the PIN — NEVER store raw PIN
    string hashedPin = sha256(pin);

    // Create wallet and store it
    Wallet newWallet(walletID, name, hashedPin);
    dataStore.addWallet(newWallet);

    Display::showSignupSuccess(walletID, name);
    fileStorage.saveToFile(dataStore);  // Auto-save after signup
    Display::pause();
}

// ==================== DASHBOARD ACTIONS ====================

void handleCheckBalance(string walletID) {
    double balance = dataStore.getLedger().getBalance(walletID);
    Display::showBalance(balance);
    Display::pause();
}

void handleDeposit(string walletID) {
    Display::clearScreen();
    Display::showHeader("DEPOSIT FUNDS");

    string amountStr;
    cout << "  Enter amount to deposit: Rs. ";
    getline(cin, amountStr);
    double amount = stod(amountStr);

    if (amount <= 0) {
        Display::showError("Amount must be positive!");
        Display::pause();
        return;
    }

    // Deposit = transaction from "SYSTEM" to this wallet
    Transaction tx("SYSTEM", walletID, amount);
    dataStore.getLedger().addTransaction(tx);
    dataStore.getLedger().mineBlock();

    Display::clearScreen();
    Display::showHeader("DEPOSIT SUCCESSFUL");
    Display::showSuccess("Rs. " + to_string(amount) + " deposited!");
    cout << "  Tx Hash: " << tx.getTxHash().substr(0, 16) << "..." << endl;
    fileStorage.saveToFile(dataStore);  // Auto-save after deposit
    Display::pause();
}

void handleTransfer(string walletID) {
    Display::clearScreen();
    Display::showHeader("TRANSFER FUNDS");

    string receiverID, amountStr, pin;

    cout << "  Enter recipient Wallet ID: ";
    getline(cin, receiverID);

    if (!dataStore.walletExists(receiverID)) {
        Display::showError("Recipient wallet not found!");
        Display::pause();
        return;
    }

    if (receiverID == walletID) {
        Display::showError("Cannot transfer to yourself!");
        Display::pause();
        return;
    }

    cout << "  Enter amount: Rs. ";
    getline(cin, amountStr);
    double amount = stod(amountStr);

    if (amount <= 0) {
        Display::showError("Amount must be positive!");
        Display::pause();
        return;
    }

    // Check balance from ledger
    double balance = dataStore.getLedger().getBalance(walletID);
    if (balance < amount) {
        Display::showError("Insufficient funds! Balance: Rs. " + to_string(balance));
        Display::pause();
        return;
    }

    cout << "  Enter PIN to confirm: ";
    getline(cin, pin);

    if (!dataStore.getWallet(walletID).verifyPin(pin)) {
        Display::showError("Incorrect PIN!");
        Display::pause();
        return;
    }

    // Create and mine the transaction
    Transaction tx(walletID, receiverID, amount);
    dataStore.getLedger().addTransaction(tx);
    dataStore.getLedger().mineBlock();

    Display::clearScreen();
    Display::showHeader("TRANSFER SUCCESSFUL");
    Display::showSuccess("Rs. " + to_string(amount) + " sent to " + receiverID);
    cout << "  Tx Hash: " << tx.getTxHash().substr(0, 16) << "..." << endl;
    fileStorage.saveToFile(dataStore);  // Auto-save after transfer
    Display::pause();
}

void handleHistory(string walletID) {
    vector<Transaction> history = dataStore.getLedger().getHistory(walletID);
    Display::showTransactionHistory(history);
    Display::pause();
}

void handleViewLedger() {
    vector<Block> chain = dataStore.getLedger().getChain();
    Display::showLedger(chain);
    Display::pause();
}

// ==================== DASHBOARD ====================
void dashboard(string walletID) {
    string choiceStr;

    while (true) {
        string name = dataStore.getWallet(walletID).getName();
        Display::showDashboard(name, walletID);
        getline(cin, choiceStr);

        if (choiceStr.empty()) continue;
        int choice = stoi(choiceStr);

        switch (choice) {
            case 1: handleCheckBalance(walletID); break;
            case 2: handleDeposit(walletID);      break;
            case 3: handleTransfer(walletID);      break;
            case 4: handleHistory(walletID);       break;
            case 5: handleViewLedger();            break;
            case 6: return; // Log out
            default:
                Display::showError("Invalid choice!");
                Display::pause();
        }
    }
}

// ==================== LOGIN ====================
void handleLogin() {
    Display::clearScreen();
    Display::showHeader("LOG IN");

    string walletID, pin;

    cout << "  Enter Wallet ID: ";
    getline(cin, walletID);

    if (!dataStore.walletExists(walletID)) {
        Display::showError("Wallet not found!");
        Display::pause();
        return;
    }

    cout << "  Enter PIN: ";
    getline(cin, pin);

    if (!dataStore.getWallet(walletID).verifyPin(pin)) {
        Display::showError("Incorrect PIN!");
        Display::pause();
        return;
    }

    Display::showSuccess("Login successful!");
    Display::pause();
    dashboard(walletID);
}

// ==================== MAIN ====================
int main() {
    string choiceStr;

    // Load saved data if it exists
    if (fileStorage.fileExists()) {
        fileStorage.loadFromFile(dataStore);
    }

    while (true) {
        Display::showMainMenu();
        getline(cin, choiceStr);

        if (choiceStr.empty()) continue;
        int choice = stoi(choiceStr);

        switch (choice) {
            case 1: handleSignup();  break;
            case 2: handleLogin();   break;
            case 3:
                Display::clearScreen();
                Display::showHeader("GOODBYE!");
                cout << "  Thank you for using Digital Wallet System!" << endl;
                cout << endl;
                return 0;
            default:
                Display::showError("Invalid choice!");
                Display::pause();
        }
    }

    return 0;
}
