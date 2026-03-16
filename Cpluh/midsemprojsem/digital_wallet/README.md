# Blockchain-Inspired Digital Wallet 💳🔗

A secure, persistent, and command-line-based Digital Wallet application built in C++17. This project utilizes Object-Oriented Programming (OOP) principles and a blockchain-inspired ledger architecture to ensure data integrity and track transactions.

## 🌟 Key Features

*   **Cryptographic Security:** Uses industry-standard SHA-256 to hash and secure user PINs. PINs are never stored in plain text.
*   **Blockchain Ledger:** Balances are not stored as arbitrary numbers. They are dynamically calculated by scanning an immutable chain of transactions.
*   **Tamper-Evident History:** Every block in the ledger contains the hash of the previous block. Modifying past transactions breaks the mathematical chain.
*   **Data Persistence:** Memory is serialized and saved across sessions using robust File I/O techniques `ofstream`/`ifstream` and pipe-delimited data structures.
*   **Clean Terminal UI:** Uses ANSI escape codes and C++ `<iomanip>` formatting to render clean, readable dashboards and tables in the console.

## 🏗️ Architecture & Flow

The system is broken down into clean, modular C++ concepts:
1.  **Wallet (`Account` base class):** Handles user creation, PIN hashing, and authentication verification without exposing private keys.
2.  **Transactions:** Encapsulates sender ID, receiver ID, amount, and timestamp.
3.  **Blocks:** Bundles multiple transactions into a single immutable block, linked mathematically to the previous block via a SHA-256 hash.
4.  **Ledger:** Managers the list of mined blocks and calculates global user balances natively from the transaction history.

## 🚀 Getting Started

### Prerequisites
*   A C++17 compiler (e.g., `g++` or `clang++`).
*   Make (optional, for the provided Makefile).

### Compilation

You can compile the application using the included Makefile:
```bash
make
```

Alternatively, you can compile it manually using `g++`:
```bash
g++ *.cpp -o wallet_app -std=c++17
```

### Running the Application

Execute the compiled binary:
```bash
./wallet_app
```

On first run, the application will initialize a fresh database inside the `data/` directory.

## 📂 Project Structure

*   `main.cpp` - The central application logic, dashboard UI, and File I/O persistence mapping.
*   `Block.h` & `Block.cpp` - The Block entity logic for the ledger chain.
*   `Transaction.h` & `Transaction.cpp` - The transactional records logic.
*   `Ledger.h` & `Ledger.cpp` - Manages the chain, block mining, and ledger auditing.
*   `Wallet.h` / `Account.h` - User identity, PIN encryption, and authentication.
*   `sha256.h` & `sha256.cpp` - The core cryptography engine.
*   `docs/` - Contains the project architecture diagram and Viva preparation guide.

## 📜 License

This project is licensed under the [MIT License](LICENSE) - feel free to study, modify, and build upon it!
