#include "Display.h"
#include <iostream>
#include <iomanip>

using namespace std;

// ---- ANSI color codes for styling ----
// These work on macOS/Linux terminals
const string RESET   = "\033[0m";
const string BOLD    = "\033[1m";
const string DIM     = "\033[2m";
const string GREEN   = "\033[32m";
const string RED     = "\033[31m";
const string CYAN    = "\033[36m";
const string YELLOW  = "\033[33m";
const string MAGENTA = "\033[35m";

// Clears the terminal and redraws — gives an app-like feel
void Display::clearScreen() {
    system("clear");
}

// Waits for the user to press Enter before continuing
void Display::pause() {
    cout << endl;
    cout << DIM << "  Press Enter to continue..." << RESET;
    cin.get();
}

// Draws a boxed header with a title
void Display::showHeader(string title) {
    cout << endl;
    cout << CYAN << "  ╔══════════════════════════════════════════════╗" << RESET << endl;
    cout << CYAN << "  ║" << RESET << BOLD << "  " << title;

    // Pad the title to fit inside the box
    int padding = 44 - title.length();
    for (int i = 0; i < padding; i++) cout << " ";

    cout << CYAN << "║" << RESET << endl;
    cout << CYAN << "  ╚══════════════════════════════════════════════╝" << RESET << endl;
    cout << endl;
}

// Horizontal divider line
void Display::showDivider() {
    cout << CYAN << "  ──────────────────────────────────────────────" << RESET << endl;
}

// Green success message
void Display::showSuccess(string msg) {
    cout << GREEN << "  ✓ " << msg << RESET << endl;
}

// Red error message
void Display::showError(string msg) {
    cout << RED << "  ✗ " << msg << RESET << endl;
}

// ==================== MENUS ====================

void Display::showMainMenu() {
    clearScreen();
    showHeader("DIGITAL WALLET SYSTEM");
    cout << "  [1] Sign Up (Create Wallet)" << endl;
    cout << "  [2] Log In" << endl;
    cout << "  [3] Exit" << endl;
    cout << endl;
    cout << "  >> Enter choice: ";
}

void Display::showDashboard(string name, string walletID) {
    clearScreen();
    showHeader("WALLET DASHBOARD");
    cout << "  Welcome, " << BOLD << name << RESET
         << "  " << DIM << "[" << walletID << "]" << RESET << endl;
    showDivider();
    cout << endl;
    cout << "  [1] Check Balance" << endl;
    cout << "  [2] Deposit Funds" << endl;
    cout << "  [3] Transfer Funds" << endl;
    cout << "  [4] Transaction History" << endl;
    cout << "  [5] View Blockchain Ledger" << endl;
    cout << "  [6] Log Out" << endl;
    cout << endl;
    cout << "  >> Enter choice: ";
}

// ==================== DATA SCREENS ====================

void Display::showBalance(double balance) {
    clearScreen();
    showHeader("ACCOUNT BALANCE");
    cout << "  Current Balance: " << BOLD << GREEN << "Rs. "
         << fixed << setprecision(2) << balance << RESET << endl;
}

void Display::showTransactionHistory(vector<Transaction> history) {
    clearScreen();
    showHeader("TRANSACTION HISTORY");

    if (history.empty()) {
        cout << DIM << "  No transactions found." << RESET << endl;
        return;
    }

    // Table header
    cout << BOLD << "  "
         << left << setw(22) << "Date"
         << setw(12) << "From"
         << setw(12) << "To"
         << right << setw(12) << "Amount"
         << RESET << endl;
    showDivider();

    // Each transaction row
    for (int i = 0; i < history.size(); i++) {
        cout << "  "
             << left << setw(22) << history[i].getTimestamp()
             << setw(12) << history[i].getSenderID()
             << setw(12) << history[i].getReceiverID()
             << right << setw(10) << fixed << setprecision(2)
             << history[i].getAmount()
             << endl;
    }
}

void Display::showLedger(vector<Block> chain) {
    clearScreen();
    showHeader("BLOCKCHAIN LEDGER");

    for (int i = 0; i < chain.size(); i++) {
        cout << CYAN << "  ┌─ Block " << chain[i].getIndex()
             << " ──────────────────────────────────" << RESET << endl;
        cout << "  │ " << DIM << "Time:      " << RESET
             << chain[i].getTimestamp() << endl;
        cout << "  │ " << DIM << "Hash:      " << RESET
             << chain[i].getHash().substr(0, 16) << "..." << endl;
        cout << "  │ " << DIM << "Prev Hash: " << RESET
             << chain[i].getPreviousHash().substr(0, 16) << "..." << endl;

        vector<Transaction> txs = chain[i].getTransactions();
        if (txs.empty()) {
            cout << "  │ " << DIM << "Txs:       (genesis block)" << RESET << endl;
        } else {
            cout << "  │ " << DIM << "Txs:       " << txs.size() << RESET << endl;
            for (int j = 0; j < txs.size(); j++) {
                cout << "  │   " << YELLOW
                     << txs[j].getSenderID() << " -> "
                     << txs[j].getReceiverID() << "  Rs."
                     << fixed << setprecision(2) << txs[j].getAmount()
                     << RESET << endl;
            }
        }

        // Draw chain link arrow between blocks
        if (i < chain.size() - 1) {
            cout << CYAN << "  └──────────┬─────────────────────────────────" << RESET << endl;
            cout << CYAN << "             |" << RESET << endl;
            cout << CYAN << "             V" << RESET << endl;
        } else {
            cout << CYAN << "  └────────────────────────────────────────────" << RESET << endl;
        }
    }
}

void Display::showSignupSuccess(string walletID, string name) {
    clearScreen();
    showHeader("WALLET CREATED");
    showSuccess("Wallet created successfully!");
    cout << endl;
    cout << "  Name:      " << BOLD << name << RESET << endl;
    cout << "  Wallet ID: " << BOLD << CYAN << walletID << RESET << endl;
    cout << endl;
    cout << YELLOW << "  ! Save your Wallet ID — you need it to log in!" << RESET << endl;
}
