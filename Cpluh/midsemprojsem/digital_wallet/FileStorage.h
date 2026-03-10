#ifndef FILESTORAGE_H
#define FILESTORAGE_H

#include <string>
#include "DataStore.h"

using namespace std;

// =============================================
// FileStorage — Saves and loads ALL data to a file
// This makes the blockchain and wallets persist
// even after the program is closed and reopened
// Uses a simple text-based format with | delimiters
// =============================================
class FileStorage {
private:
    string filename;  // Path to the save file

public:
    FileStorage(string file);

    // Saves all wallets + blockchain to file
    void saveToFile(DataStore& store);

    // Loads wallets + blockchain from file into DataStore
    void loadFromFile(DataStore& store);

    // Checks if a save file exists
    bool fileExists();
};

#endif
