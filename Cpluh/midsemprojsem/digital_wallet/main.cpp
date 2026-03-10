// =============================================
// Digital Wallet System — Main Application
// Extremely simplified version for first-year viva
// =============================================

#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
#include <fstream>
#include <sstream>
#include <map>

#include "Block.h"
#include "Transaction.h"
#include "Wallet.h"
#include "Ledger.h"
#include "sha256.h"

using namespace std;

// ==================== GLOBAL VARIABLES ====================
// In a beginner project, it's very common to use global variables
// instead of complex classes like DataStore and FileStorage.
map<string, Wallet> wallets;
Ledger ledger;
int walletCount = 0;
string SAVE_FILE = "wallet_data.dat";

// ---- ANSI color codes for terminal styling ----
const string RESET   = "\033[0m";
const string BOLD    = "\033[1m";
const string DIM     = "\033[2m";
const string GREEN   = "\033[32m";
const string RED     = "\033[31m";
const string CYAN    = "\033[36m";
const string YELLOW  = "\033[33m";

// ==================== UI FUNCTIONS ====================
void clearScreen() {
    system("clear");
}

void pauseUI() {
    cout << endl << DIM << "  Press Enter to continue..." << RESET;
    cin.ignore(); // Clear any leftover newline
    cin.get();
}

void showHeader(string title) {
    cout << endl;
    cout << CYAN << "  ╔══════════════════════════════════════════════╗" << RESET << endl;
    cout << CYAN << "  ║" << RESET << BOLD << "  " << title;
    int padding = 44 - title.length();
    for (int i = 0; i < padding; i++) cout << " ";
    cout << CYAN << "║" << RESET << endl;
    cout << CYAN << "  ╚══════════════════════════════════════════════╝" << RESET << endl;
    cout << endl;
}

void showSuccess(string msg) {
    cout << GREEN << "  ✓ " << msg << RESET << endl;
}

void showError(string msg) {
    cout << RED << "  ✗ " << msg << RESET << endl;
}

// ==================== FILE SAVING/LOADING ====================
void saveData() {
    ofstream file(SAVE_FILE);
    if (!file.is_open()) return;

    // Save Wallets
    file << "WALLETS\n";
    file << walletCount << "\n";
    for (map<string, Wallet>::iterator it = wallets.begin(); it != wallets.end(); it++) {
        Wallet& w = it->second;
        file << w.getWalletID() << "|" << w.getName() << "|" << w.getHashedPin() << "\n";
    }

    // Save Ledger
    vector<Block> chain = ledger.getChain();
    file << "BLOCKCHAIN\n";
    file << chain.size() << "\n";
    for (int i = 0; i < chain.size(); i++) {
        Block& b = chain[i];
        vector<Transaction> txs = b.getTransactions();
        
        // Block header
        file << b.getIndex() << "|" << b.getTimestamp() << "|" << b.getPreviousHash() << "|" << b.getHash() << "|" << txs.size() << "\n";
        
        // Block transactions
        for (int j = 0; j < txs.size(); j++) {
            file << txs[j].getSenderID() << "|" << txs[j].getReceiverID() << "|" << txs[j].getAmount() << "|" << txs[j].getTimestamp() << "|" << txs[j].getTxHash() << "\n";
        }
    }
    file.close();
}

void loadData() {
    ifstream file(SAVE_FILE);
    if (!file.is_open()) return; // No save file yet, start fresh

    string line;
    
    // Load Wallets
    getline(file, line); // Read "WALLETS"
    getline(file, line); 
    walletCount = stoi(line);

    for (int i = 0; i < walletCount; i++) {
        getline(file, line);
        stringstream ss(line);
        string id, name, pin;
        getline(ss, id, '|');
        getline(ss, name, '|');
        getline(ss, pin, '|');
        wallets[id] = Wallet(id, name, pin);
    }

    // Load Ledger
    getline(file, line); // Read "BLOCKCHAIN"
    getline(file, line);
    int blockCount = stoi(line);
    vector<Block> chain;

    for (int i = 0; i < blockCount; i++) {
        getline(file, line);
        stringstream bs(line);
        string idxStr, timeStr, prev, hashStr, txCountStr;
        
        getline(bs, idxStr, '|');
        getline(bs, timeStr, '|');
        getline(bs, prev, '|');
        getline(bs, hashStr, '|');
        getline(bs, txCountStr, '|');
        
        int txCount = stoi(txCountStr);
        vector<Transaction> txs;

        for (int j = 0; j < txCount; j++) {
            getline(file, line);
            stringstream ts(line);
            string sender, receiver, amtStr, txTime, txHash;
            
            getline(ts, sender, '|');
            getline(ts, receiver, '|');
            getline(ts, amtStr, '|');
            getline(ts, txTime, '|');
            getline(ts, txHash, '|');
            
            txs.push_back(Transaction(sender, receiver, stod(amtStr), txTime, txHash));
        }
        chain.push_back(Block(stoi(idxStr), txs, prev, timeStr, hashStr));
    }
    ledger.setChain(chain);
    file.close();
}

// ==================== APP LOGIC ====================

// Check if a wallet ID is registered
bool walletExists(string id) {
    return wallets.find(id) != wallets.end();
}

void handleSignup() {
    clearScreen();
    showHeader("CREATE NEW WALLET");

    string name, pin, confirmPin;
    cout << "  Enter your name: ";
    cin.ignore(); // clear buffer
    getline(cin, name);
    cout << "  Set a PIN (4-6 digits): ";
    getline(cin, pin);
    cout << "  Confirm PIN: ";
    getline(cin, confirmPin);

    if (pin != confirmPin) { showError("PINs do not match!"); pauseUI(); return; }
    if (pin.length() < 4) { showError("PIN too short!"); pauseUI(); return; }

    string walletID = "W-" + sha256(name + getCurrentTimestamp()).substr(0, 8);
    string hashedPin = sha256(pin);

    wallets[walletID] = Wallet(walletID, name, hashedPin);
    walletCount++;
    
    saveData(); // Save instantly to file

    clearScreen();
    showHeader("WALLET CREATED");
    showSuccess("Success!");
    cout << "  Name:      " << BOLD << name << RESET << endl;
    cout << "  Wallet ID: " << BOLD << CYAN << walletID << RESET << endl;
    cout << YELLOW << "  ! Save your Wallet ID — you need it to log in!" << RESET << endl;
    pauseUI();
}

void dashboard(string walletID) {
    while (true) {
        clearScreen();
        showHeader("WALLET DASHBOARD");
        cout << "  Welcome, " << BOLD << wallets[walletID].getName() << RESET << " [" << walletID << "]" << endl;
        cout << CYAN << "  ──────────────────────────────────────────────" << RESET << endl;
        cout << "  [1] Check Balance\n  [2] Deposit Funds\n  [3] Transfer Funds\n  [4] Transaction History\n  [5] Blockchain Ledger\n  [6] Log Out\n\n  >> Enter choice: ";
        
        int choice;
        cin >> choice;

        if (choice == 1) {
            clearScreen(); showHeader("ACCOUNT BALANCE");
            cout << "  Balance: " << GREEN << "Rs. " << fixed << setprecision(2) << ledger.getBalance(walletID) << RESET << endl;
            pauseUI();
        } 
        else if (choice == 2) {
            clearScreen(); showHeader("DEPOSIT");
            cout << "  Enter amount to deposit: Rs. ";
            double amount; cin >> amount;
            if (amount > 0) {
                Transaction tx("SYSTEM", walletID, amount);
                ledger.addTransaction(tx);
                ledger.mineBlock();
                saveData();
                showSuccess("Deposited Rs. " + to_string(amount));
            } else showError("Invalid amount!");
            pauseUI();
        }
        else if (choice == 3) {
            clearScreen(); showHeader("TRANSFER FUNDS");
            string receiver, pin; double amount;
            cout << "  Recipient Wallet ID: "; cin >> receiver;
            
            if (!walletExists(receiver)) { showError("Recipient not found!"); pauseUI(); continue; }
            if (receiver == walletID) { showError("Cannot send to yourself!"); pauseUI(); continue; }
            
            cout << "  Enter amount: Rs. "; cin >> amount;
            if (amount <= 0 || ledger.getBalance(walletID) < amount) { showError("Invalid amount or insufficient funds!"); pauseUI(); continue; }
            
            cout << "  Enter PIN: "; cin >> pin;
            if (!wallets[walletID].verifyPin(pin)) { showError("Incorrect PIN!"); pauseUI(); continue; }
            
            Transaction tx(walletID, receiver, amount);
            ledger.addTransaction(tx);
            ledger.mineBlock();
            saveData();
            showSuccess("Transferred Rs. " + to_string(amount) + " to " + receiver);
            pauseUI();
        }
        else if (choice == 4) {
            clearScreen(); showHeader("TRANSACTION HISTORY");
            vector<Transaction> history = ledger.getHistory(walletID);
            if (history.empty()) {
                cout << DIM << "  No transactions found." << RESET << endl;
            } else {
                cout << BOLD << "  " << left << setw(22) << "Date" << setw(12) << "From" << setw(12) << "To" << right << setw(12) << "Amount" << RESET << endl;
                cout << CYAN << "  ──────────────────────────────────────────────" << RESET << endl;
                for (int i = 0; i < history.size(); i++) {
                    cout << "  " << left << setw(22) << history[i].getTimestamp()
                         << setw(12) << history[i].getSenderID()
                         << setw(12) << history[i].getReceiverID()
                         << right << setw(10) << fixed << setprecision(2) << history[i].getAmount() << endl;
                }
            }
            pauseUI();
        }
        else if (choice == 5) {
            clearScreen(); showHeader("LEDGER");
            vector<Block> chain = ledger.getChain();
            for (int i = 0; i < chain.size(); i++) {
                cout << CYAN << "  ┌─ Block " << chain[i].getIndex() << " ──────────────────────" << RESET << endl;
                cout << "  │ " << DIM << "Hash: " << RESET << chain[i].getHash().substr(0, 16) << "..." << endl;
                vector<Transaction> txs = chain[i].getTransactions();
                if (txs.empty()) cout << "  │ " << DIM << "(genesis block)" << RESET << endl;
                else {
                    for (int j = 0; j < txs.size(); j++) {
                        cout << "  │  " << YELLOW << txs[j].getSenderID() << " -> " << txs[j].getReceiverID() << " Rs." << txs[j].getAmount() << RESET << endl;
                    }
                }
                cout << CYAN << "  └─────────────────────────────────" << RESET << endl;
            }
            pauseUI();
        }
        else if (choice == 6) {
            return; // Log out
        }
    }
}

void handleLogin() {
    clearScreen();
    showHeader("LOG IN");
    string id, pin;
    cout << "  Enter Wallet ID: "; cin >> id;
    if (!walletExists(id)) { showError("Wallet not found!"); pauseUI(); return; }
    
    cout << "  Enter PIN: "; cin >> pin;
    if (!wallets[id].verifyPin(pin)) { showError("Incorrect PIN!"); pauseUI(); return; }
    
    showSuccess("Login successful!");
    dashboard(id);
}

int main() {
    loadData(); // Load any saved wallets and blocks at startup

    while (true) {
        clearScreen();
        showHeader("DIGITAL WALLET SYSTEM");
        cout << "  [1] Sign Up\n  [2] Log In\n  [3] Exit\n\n  >> Enter choice: ";
        
        int choice;
        cin >> choice;

        if (choice == 1) handleSignup();
        else if (choice == 2) handleLogin();
        else if (choice == 3) {
            clearScreen(); showHeader("GOODBYE!");
            cout << "  Thank you for using Digital Wallet System!\n\n";
            return 0;
        }
    }
    return 0;
}
