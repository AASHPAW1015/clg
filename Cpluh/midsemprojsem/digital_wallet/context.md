# Digital Wallet System - Context & Brainstorming

## Problem Statement
Digital wallets require secure transaction handling. This system simulates digital wallet operations.

## Objectives
- To manage digital transactions securely.
- To implement: Wallet creation, Fund transfer, Balance tracking.
- Deliverable: A comprehensive C++ digital wallet application.

## Core Inspiration: Blockchain Technology
To ensure the security of transactions, this digital wallet simulation adopts key concepts from blockchain technology. This aligns well with the request for cryptography elements and strong Object-Oriented Programming (OOP) design.

### Key Concepts

1. **SHA-256 Encryption / Hashing**:
   - Every transaction will generate a unique cryptographic hash (using SHA-256) based on sender, receiver, amount, and timestamp.
   - This ensures transaction data is immutable and verifiable, simulating real-world cryptographic integrity.

2. **Secure Ledger (Blockchain Concept)**:
   - Instead of a simple integer array storing mutable balances, the system maintains a `Ledger` (resembling a blockchain).
   - A `Block` contains a batch of `Transaction`s (even a single transaction). Each block relies on the hash of the previous block, creating a tamper-evident chain.
   - Balances are dynamically calculated by summing the inflows and outflows for an account from the entire ledger history.

3. **Data Encapsulation and Access Security (C++ OOP)**:
   - Robust application of C++ OOP concepts.
   - **Data Hiding**: User balances, keys, and transaction history vectors will be strictly private.
   - **Friend Classes / Access Rights**: Certain controllers (like `WalletManager` or `Ledger`) may have restricted access to instances of `Wallet`.
   - **Inheritance vs Polymorphism**: A base `Account` class could represent a standard entity, extended securely by the user-facing `Wallet`.

## Proposed C++ Structure Location

`/Users/aashpaw/COLLEHE/Cpluh/midsemprojsem/digital_wallet/`

Files to be created:
- `sha256.h`, `sha256.cpp` - Hash generator utility mapping std::string to hash values.
- `Transaction.h`, `Transaction.cpp` - Holds read-only tx info.
- `Block.h`, `Block.cpp` - Validates the sequence of transactions.
- `Ledger.h`, `Ledger.cpp` - Central authority evaluating available balances securely.
- `Account.h`, `Account.cpp` - Base OOP Class specifying virtual identity functions.
- `Wallet.h`, `Wallet.cpp` - Derived from Account, handles balance calculation request and private data.
- `main.cpp` - Interactive menu managing the wallet creation, transfer interface, and view routines.
