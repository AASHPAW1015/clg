#ifndef DISPLAY_H
#define DISPLAY_H

#include <string>
#include <vector>
#include "Transaction.h"
#include "Block.h"

using namespace std;

// =============================================
// Display — Handles ALL terminal output
// Uses system("clear") to refresh the screen
// giving an app-like UI feel in the terminal
// =============================================
class Display {
public:
    // Screen control
    static void clearScreen();
    static void pause();

    // UI elements
    static void showHeader(string title);
    static void showDivider();
    static void showSuccess(string msg);
    static void showError(string msg);

    // Menus
    static void showMainMenu();
    static void showDashboard(string name, string walletID);

    // Data screens
    static void showBalance(double balance);
    static void showTransactionHistory(vector<Transaction> history);
    static void showLedger(vector<Block> chain);
    static void showSignupSuccess(string walletID, string name);
};

#endif
