# Digital Wallet System — Brainstorming Q&A

> This file tracks the thought process, questions, and design decisions made during development.

---

## Q1: How are we making the blocks? What goes inside them?

**Short answer:** A `Block` is just a container that seals a batch of transactions with a cryptographic hash, chaining itself to the previous block.

**What goes inside a Block:**

| Field              | Type                    | Purpose                                                   |
|--------------------|-------------------------|-----------------------------------------------------------|
| `index`            | `int`                   | Block number in the chain (0 = genesis)                   |
| `timestamp`        | `string`                | When the block was created                                |
| `transactions`     | `vector<Transaction>`   | All transactions grouped into this block                  |
| `previousHash`     | `string`                | SHA-256 hash of the previous block (chain link)           |
| `hash`             | `string`                | SHA-256 hash of *this* block's content                    |

**How a block's hash is computed:**
```
hash = SHA256( to_string(index) + timestamp + allTransactionData + previousHash )
```
This means if *anyone* tampers with even one transaction inside, the hash changes and the chain breaks — that's the security.

**Genesis Block (Block 0):**
The very first block has no transactions and `previousHash = "0"`. It's auto-created when the `Ledger` initializes.

---

## Q2: What's the full backend process flow?

Here's what happens under the hood when the system runs:

```
 SYSTEM BOOT
    │
    ▼
 Ledger is created
    │── Genesis Block (index=0, previousHash="0", no transactions)
    │
    ▼
 User creates Wallet A  →  WalletManager assigns unique ID + hashed PIN
    │
 User creates Wallet B  →  same process
    │
    ▼
 User requests: "Transfer ₹500 from A → B"
    │
    ├── 1. WalletManager verifies sender PIN (hashed comparison)
    ├── 2. Ledger calculates A's balance by scanning ALL past transactions
    ├── 3. If balance >= 500:
    │       ├── Create Transaction object (senderID, receiverID, 500, timestamp)
    │       ├── Hash the transaction:  txHash = SHA256(sender+receiver+amount+time)
    │       ├── Add transaction to Ledger's "pending" list
    │       └── Mine a new Block:
    │             ├── Take all pending transactions
    │             ├── Set previousHash = last block's hash
    │             ├── Compute this block's hash
    │             └── Append block to chain
    │
    └── 4. If balance < 500:  →  Reject with "Insufficient funds"

    ▼
 User requests: "Show balance of Wallet A"
    │
    └── Ledger scans entire chain:
          ├── Every tx where A is receiver  →  +amount
          ├── Every tx where A is sender    →  -amount
          └── Return net sum as balance
```

**Key takeaway:** Balances are **never stored as a number** on the Wallet. They are *always* computed from the immutable transaction history. This is exactly how real blockchains work — it prevents tampering.

---

## Q3: What does the user see? (User Flow)

```
╔══════════════════════════════════════╗
║     DIGITAL WALLET SYSTEM            ║
║══════════════════════════════════════║
║  1. Sign Up (Create Wallet)          ║
║  2. Log In                           ║
║  3. Exit                             ║
╚══════════════════════════════════════╝
        │
        ├── [1] Sign Up
        │     ├── Enter Name
        │     ├── Set a PIN (4-6 digits)
        │     ├── System generates unique Wallet ID
        │     ├── PIN is SHA-256 hashed and stored (never plaintext)
        │     └── "Wallet created! Your ID: W-a3f8c1"
        │
        ├── [2] Log In
        │     ├── Enter Wallet ID
        │     ├── Enter PIN  →  hashed and compared
        │     └── If match → Wallet Dashboard:
        │           ╔══════════════════════════════╗
        │           ║  Welcome, Aashish!            ║
        │           ║──────────────────────────────║
        │           ║  1. Check Balance             ║
        │           ║  2. Transfer Funds            ║
        │           ║  3. View Transaction History  ║
        │           ║  4. View Ledger (Blockchain)  ║
        │           ║  5. Log Out                   ║
        │           ╚══════════════════════════════╝
        │
        │        [1] Check Balance
        │             └── Ledger computes from chain → "Balance: ₹1200"
        │
        │        [2] Transfer Funds
        │             ├── Enter recipient Wallet ID
        │             ├── Enter amount
        │             ├── Re-enter PIN to confirm
        │             ├── Transaction created + Block mined
        │             └── "Transfer successful! TxHash: 4a8f..."
        │
        │        [3] Transaction History
        │             └── Lists all transactions involving this wallet
        │                  (date, from, to, amount, txHash)
        │
        │        [4] View Ledger
        │             └── Prints the full blockchain:
        │                  Block 0 → Block 1 → Block 2 → ...
        │                  (shows hashes linking each block)
        │
        └── [3] Exit
```

---

## Q4: How does fund transfer work, and how do we track transaction history?

**Fund Transfer Process:**

1. Sender logs in and selects "Transfer Funds."
2. Enters **recipient Wallet ID** and **amount**.
3. Re-enters **PIN** for confirmation (hashed and verified).
4. System creates a `Transaction` object:
   ```cpp
   Transaction tx(senderID, receiverID, amount);
   // internally: timestamp = current time
   // internally: txHash = SHA256(senderID + receiverID + amount + timestamp)
   ```
5. Transaction is added to the `Ledger`'s pending pool.
6. A new `Block` is mined containing the pending transactions.
7. The block is appended to the chain.

**Transaction History — How we track it:**

There is no separate "history" database. The `Ledger` (our blockchain) **is** the history. To get Wallet A's history:

```cpp
// Pseudocode inside Ledger class
vector<Transaction> getHistory(string walletID) {
    vector<Transaction> history;
    for (each block in chain) {
        for (each tx in block.transactions) {
            if (tx.sender == walletID || tx.receiver == walletID) {
                history.push_back(tx);
            }
        }
    }
    return history;
}
```

Each transaction in the history will display:
- Date/Time
- From (sender ID)
- To (receiver ID)
- Amount
- Transaction Hash (for verification)

---

## Q5: How do we handle Signup / Wallet Creation securely?

This is a great question — here's the approach:

**The problem:** We need to store user credentials, but storing a raw PIN is insecure.

**The solution:** We use the same SHA-256 hashing we already have.

**Signup flow (internal):**

```cpp
// User enters: name = "Aashish", pin = "4291"

// 1. Generate a unique Wallet ID
string walletID = "W-" + SHA256(name + currentTimestamp).substr(0, 8);
// e.g. "W-a3f8c1b2"

// 2. Hash the PIN — NEVER store raw PIN
string hashedPin = SHA256(pin);
// e.g. "b493d48364..."

// 3. Create Account/Wallet object
Wallet newWallet(walletID, name, hashedPin);
// The raw pin "4291" is discarded immediately
```

**Login verification:**
```cpp
// User enters: walletID = "W-a3f8c1b2", pin = "4291"
// System does:
string inputHash = SHA256(pin);
if (inputHash == wallet.getHashedPin()) {
    // Login success — hashes match
}
// The actual PIN is never compared or stored
```

**Why this is secure:**
- SHA-256 is a **one-way** function — you can't reverse-engineer "4291" from the hash.
- Even if someone reads the stored data, they only see `"b493d48364..."`, not the PIN.
- This is the same technique used by real-world systems (Linux passwords, web apps, etc.).

**OOP Security layer:**
- The `hashedPin` is a `private` member of `Wallet`.
- Only accessible via `bool verifyPin(string inputPin)` — which hashes the input and compares internally.
- No getter for `hashedPin` is exposed; not even `WalletManager` can read the raw hash.

---

## Q6: `using namespace std;` — confirmed ✅

All code files will use `using namespace std;` at the top. No `std::` prefixes throughout the codebase.

---

## Q7: Why a separate DataStore.cpp? Can't we just use variables?

**User asked:** "Can we make a different cpp file with a big dictionary to track accounts and blockchain metadata — one file to store the data?"

**Answer:** Yes! Since we can't use JSON files or a real database, `DataStore` acts as our **in-memory database**. It holds:

| Data                | Type                      | Purpose                          |
|---------------------|---------------------------|----------------------------------|
| `wallets`           | `map<string, Wallet>`     | Dictionary mapping ID → Wallet   |
| `ledger`            | `Ledger`                  | The entire blockchain            |
| `walletCount`       | `int`                     | Total wallets created            |

Everything flows through `DataStore`. When `main.cpp` needs a wallet or the ledger, it asks `DataStore`. This keeps data centralized and organized in one place.

---

## Q8: How does the terminal UI "update" instead of printing on new lines?

**User asked:** "I want the output to update like an application with a UI in the terminal."

**Answer:** We use `system("clear")` to wipe the entire terminal screen before redrawing. This makes it feel like a real application where the screen *refreshes* rather than scrolling endlessly.

The `Display` class handles ALL output. Key techniques:
- `system("clear")` — clears screen before each new view
- **ANSI escape codes** — `\033[32m` for green, `\033[36m` for cyan, `\033[1m` for bold, etc.
- **Box-drawing characters** — `╔══╗`, `║`, `╚══╝` for clean boxes
- **Formatted tables** — `setw()` and `setprecision()` for aligned columns

Every menu, every result, every error clears the screen first — so it always looks clean.

---

## Q9: Code simplicity — confirmed ✅

All code is written to be straightforward for a first-year CSE student:
- Clear variable names (`senderID`, `hashedPin`, `pendingTransactions`)
- Simple class structures with well-commented methods
- No complex templates, lambdas, or advanced C++ features
- `using namespace std;` everywhere
- All input uses `getline(cin, var)` consistently (avoids `cin >>` buffer issues)

---

## Q10: How do we keep the blockchain alive after closing the program?

**User asked:** "Make a cpp file where previous transactions are stored too — when I end and restart, the blockchain should still exist."

**Answer:** Created `FileStorage.h/cpp`. It saves ALL data to `wallet_data.dat` using a pipe-delimited text format:

```
WALLETS
2
W-a3f8c1b2|Aashish|b493d48364...
W-7e2d9f1a|Rahul|a1c4e82f91...
BLOCKCHAIN
3
0|2026-03-10 16:00:00|0|abc123...|0
1|2026-03-10 16:01:00|abc123...|def456...|1
SYSTEM|W-a3f8c1b2|1000|2026-03-10 16:01:00|tx789...
...
```

**Auto-save triggers:** after every signup, deposit, and transfer.
**Auto-load:** on program startup, if `wallet_data.dat` exists.

This means the blockchain is immutable AND persistent — it survives restarts.

---

## Q11: Why are there so many files? Why do we have both .h and .cpp files?

**User asked:** "I don't know how any of this works tbh... it's a lot of files. Why do we have .h and .cpp files of the same name?"

**Answer:** This is a core feature of how C++ programs are structured! It's called **Separation of Interface and Implementation**. 

Think of it like a restaurant:
1. **The Header File (`.h`) is the Menu:** It tells you what the restaurant offers (the classes, variables, and function names). It *doesn't* tell you how the food is cooked. 
   - Example: `Transaction.h` says, "I have a class called Transaction, and it has a function called `getAmount()`."
   - When other files need to use `Transaction`, they just `#include "Transaction.h"` to look at the menu.

2. **The Source File (`.cpp`) is the Kitchen (The Recipe):** This contains the actual code—the logic of *how* the functions work.
   - Example: `Transaction.cpp` contains the actual code that runs when you call `getAmount()`.

**Why not put everything in one file?**
- **Readability:** If `main.cpp` was 2,000 lines long, it would be impossible to navigate. Breaking it up makes it easier to find things (e.g., if there's a display bug, you know exactly to look in `Display.cpp`).
- **Compilation Speed:** If you change how a string is printed in `Display.cpp`, the compiler only has to recompile `Display.cpp`, not the entire project. If everything was in one file, it would recompile everything every time.
- **Teamwork:** In real jobs, different programmers work on different files at the same time.

It looks like a lot at first, but this is exactly how professional C++ projects are organized!

---

## Q12: How do header guards (`#ifndef`), strings, and compilation work?

**User asked:** "Why do we need `#ifndef`, what does `string sha256(string input)` mean, and how do we compile all these files into one app?"

**Answer:** 
These are essentially the biggest differences between Python and C++:

### 1. `string sha256(string input);`
In Python, you just type `def sha256(input):`. C++ is "statically typed," meaning you must tell the compiler exactly what type of data is going in, and coming out.
- `string` (at the start) = "This function will output a text string."
- `sha256` = Function name.
- `(string input)` = "This function requires a text string, and internally we call it `input`."

### 2. Header Guards (`#ifndef` / `#define`)
When you type `#include "Ledger.h"`, the C++ compiler literally **copy-pastes** the contents of `Ledger.h` into your file. 
Imagine `main.cpp` includes `Ledger.h` and `DataStore.h`. But wait... `DataStore.h` *also* includes `Ledger.h`.
Without `#ifndef` (If Not Defined), the compiler would paste `Ledger.h` into `main.cpp` **twice**. C++ would crash, yelling: *"You defined Ledger twice!"* The `#ifndef` prevents accidental double-pasting.

### 3. Compilation
In Python, running `python main.py` automatically finds imported files. C++ doesn't. You must hand the compiler *every single ingredient*.
When we run:
`g++ -std=c++17 sha256.cpp Transaction.cpp ... main.cpp -o wallet_app`
We tell the compiler: *"Take all these `.cpp` kitchen files, translate them into machine code, mash them together, and build one single program called `wallet_app`."* (We only compile `.cpp` files, not `.h` files! The `.h` menus get copy-pasted into the `.cpp` files via `#include`).

---

## Q13: Are header files doing late binding/runtime polymorphism? Are we doing function overloading?

**User asked:** "So we're just using header files to initialize the class and data members, and using cpp files to do late binding... are we reducing compiling time? Is this runtime polymorphism? Are we doing function overloading here too?!"

**Answer:** You are connecting so many high-level concepts! You are half-right and half-mind-blown. Let's separate these concepts because they are actually slightly different things in C++:

### 1. Header Files vs. CPP Files (Compile Time, NOT Late Binding)
Separating `.h` and `.cpp` is **not** late binding or runtime polymorphism. It is entirely about **Compile Time** and **Code Organization**. 
When the compiler builds your app, it compiles each `.cpp` file totally independently (into an "object file"). Then, a completely different program called the **Linker** stitches them all together. 
- *Why it reduces compile time:* If you change `Display.cpp`, the compiler *only* recompiles `Display.cpp`. C++ connects the new `Display` object file to the rest of the project in milliseconds. If everything was in `main.cpp`, changing one typo would force a 100% full recompile.

### 2. Runtime Polymorphism & Late Binding (We DID use this!)
We actually **did** put runtime polymorphism in this code, but it's in the `Account` and `Wallet` classes!
Look at `Account.h`:
`virtual string getAccountInfo();`

Look at `Wallet.h`:
`string getAccountInfo() override;`

Because of the word `virtual`, C++ uses **Late Binding**. If you have a list of `Account` pointers, and one is actually a `Wallet`, C++ waits until *exactly the second the code is running* (Runtime) to figure out which `getAccountInfo()` to call. That is true Runtime Polymorphism!

### 3. Function Overloading (We DID use this too!)
Function overloading is when you have multiple functions with the **exact same name** but different arguments. We did this in `Transaction.cpp` and `Block.cpp` when we added file saving!
Look at `Transaction.h`:
1. `Transaction(string sender, string receiver, double amt);` *(Used when making a NEW transfer)*
2. `Transaction(string sender, string receiver, double amt, string ts, string hash);` *(Used when LOADING from a file)*

Both are named `Transaction` (Constructors), but C++ automatically knows which one to use based on how many arguments you pass it. This is called **Compile-Time Polymorphism**.

---

## Q14: What is the term for initializing a class in `.h` and writing the functions in `.cpp`? Is that late binding?

**User asked:** "Wait.. we are adding into the premade class which we made in the header file into its subsequent cpp file right? Isn't that late binding? What is the term for initializing the class before and then adding functions later outside the class?"

**Answer:** Ah! I know *exactly* what concept you are thinking of from your lectures. It is **not** late binding, but it is a massive foundational C++ concept! 

What you are describing is the difference between **Declaration** and **Definition**, and it uses the **Scope Resolution Operator (`::`)**.

### 1. The Menu (`.h` file) = Declaration
In the header file, you are "declaring" the class. You are telling the compiler, "Hey, this class exists, and these are the names of the functions inside it." But you don't write *how* the function works.
```cpp
class Transaction {
public:
    string getAmount(); // Declaration! (Notice the semicolon, no curly braces)
};
```

### 2. The Kitchen (`.cpp` file) = Definition
In the source file, you are "defining" how those functions actually work. Since you are writing the code *outside* of the original class brackets, you have to tell C++ which class this function belongs to. 
To do this, you tie them together using the **Scope Resolution Operator (`::`)**:

```cpp
// Definition: "The generic function getAmount() specifically belonging to the Transaction class"
string Transaction::getAmount() {
    return amount;
}
```

**Why do we do this?** 
If you wrote the full function *inside* the class brackets in the `.h` file (which is allowed—it's called an *inline function*), every single file that includes the `.h` menu would copy-paste the full, raw code. For massive functions, this causes "code bloat" and terrible compile times. 

By using `::` in the `.cpp` file, you write the heavy code exactly *once*, and the compiler mathematically links everything together.

*(Note: "Late binding" only happens when the program is actually running and making real-time decisions using the `virtual` keyword. What we are doing with `.h` and `.cpp` happens entirely before the program ever runs!)*

---

## Q15: Where does the math happen? What is `stringstream`? How is `sha256` used in `Transaction`?

**User asked:** "Where are we reducing the amount? What is `stringstream ss`? Why are we overloading the transaction function twice? Where is `toHashString` going and where do we use the `sha256` file?"

**Answer:** Beautiful questions. You are dissecting the exact moving parts!

### 1. Where are we doing the math?
The math does **not** happen in `Transaction.cpp`. A `Transaction` is just a permanent record (like a digital receipt). 
The actual math happens in **`Ledger.cpp`** inside the `getBalance()` function. 
When you check your balance, the `Ledger` starts at 0, loops through *every single receipt in the blockchain*, and performs the math on the fly:
```cpp
// Inside Ledger::getBalance()
if (tx.getReceiverID() == wallet) { balance += tx.getAmount(); } // +Money
if (tx.getSenderID() == wallet)   { balance -= tx.getAmount(); } // -Money
```
This is the core concept of blockchain: your balance is mathematically derived from your history, not stored as a vulnerable number!

### 2. What is `stringstream ss;`?
`stringstream` (from the `#include <sstream>` library) is a C++ trick. It acts exactly like `cout`, but instead of printing to the terminal screen, it prints to a hidden string variable in memory.
Because `amount` is a `double` (number) and `senderID` is a `string` (text), C++ gets angry if you try to add them together with `+`.
`stringstream` lets you use `<<` to mash different data types together effortlessly:
```cpp
ss << senderID << receiverID << amount << timestamp; // Mashing text and numbers!
return ss.str(); // Spits out the mashed result as one big text string
```

### 3. Why are we overloading the constructor twice?
We wrote two constructors (functions named `Transaction()`) for two totally different scenarios:
1. **Making a NEW transfer:** `Transaction(sender, receiver, amount)`
   - The user just hit send. We need the system to look at the clock to generate a new timestamp, and run the math to generate a brand new `sha256` hash.
2. **LOADING from the save file:** `Transaction(sender, receiver, amount, timestamp, hash)`
   - The user just turned on the app and we are loading `wallet_data.dat`. We *don't* want to generate a new timestamp or new hash! We want to shove the exact saved data back into memory directly.

### 4. Where is `toHashString()` going and where is `sha256`?
Look at Line 16 of `Transaction.cpp` inside the first constructor:
`txHash = sha256(toHashString());`

1. First, `toHashString()` runs. It uses the `stringstream` to mash all the transaction data into one big text string (e.g., `"W-123W-456500.002026-03-10"`).
2. It hands that big string directly to our `sha256()` function (because we put `#include "sha256.h"` at the top of the file!).
3. The cryptographic black-box does its math and spits out the 64-character hex string.
4. We save that hex string permanently into the `txHash` variable!

---

## Q16: How is `Transaction` a type for a vector? Why do we see it in both `.h` and `.cpp`? Is it an array?

**User asked:** "You make a vector like `vector<type> varname`. How is `Transaction` a type? Why do we care about dynamic arrays if we load from `.dat`? Why do we make the vector over and over in `.h` and `.cpp`? Is the `Transaction` class an array? Where do we keep note of the index?"

**Answer:** This is reaching the core of Object-Oriented Programming (OOP) in C++! Let's unravel this box by box:

### 1. How is `Transaction` a "Type" for a vector?
In C++, `int`, `double`, and `string` are built-in types. 
But when you write `class Transaction { ... };`, you are inventing a **brand new custom type**. 
Just like you can have a vector of integers (`vector<int>`), you can have a vector of your custom objects (`vector<Transaction>`). It literally means "a dynamic list that holds Transaction objects." The `Transaction` class itself is **not** an array; it is a single object (a single receipt). The `vector` is the folder holding multiple receipts.

### 2. Why don't we just declare the vector once? (Why is it in both `.h` and `.cpp`?)
We actually *do* only "make" the vector once!
In `Block.h`, we declare: `vector<Transaction> transactions;`
This tells the computer: *"Every time someone creates a Block, make sure it has a folder inside it ready to hold transactions."*
In `Block.cpp`, when you see `Block::Block(..., vector<Transaction> txs, ...)`, we are not creating a *new* permanent vector. We are just saying: *"Hey, whoever is building this block, please hand me a folder of transactions (`txs`), and I will copy them into my internal folder."*

### 3. Why do we need dynamic arrays (vectors) if we load from `.dat`?
When the program starts, the `.dat` file is just dead text on your hard drive. C++ cannot do math or verify hashes on a text file.
We have to read that text file, convert the text back into living C++ `Transaction` objects, and shove them into a `vector`. 
We need it to be dynamic because we don't know if the `.dat` file has 0 transactions or 50,000 transactions until we open it!

### 4. Where is the "index" kept for the transactions?
A `vector` automatically keeps track of its own size and index natively! Just like a Python list. If you shove 3 transactions into the vector, they are automatically stored at `transactions[0]`, `transactions[1]`, and `transactions[2]`. We never have to manually track an `int index` for the transactions themselves.
*(Note: we DO track `int index` for the **Block**, but that's just to know if it's Block #0, Block #1, etc. in the chain).*

---

## Q17: How does the vector know if I've run transactions? Is it not using the .dat file to keep track?

**User asked:** "Wait, how does the vector know I've ran data through transactions twice or thrice? It's not using the dat file or anything to keep track?"

**Answer:** This is the massive difference between **Memory (RAM)** and **Storage (Hard Drive)**.

When you double-click `./wallet_app` to run the program, the `.dat` file is sitting on your hard drive. 
1. **The Load (Storage → RAM):** In `main.cpp`, the very first thing the app does is jump into the `.dat` file and recreate the whole history. It builds the `vector` in your computer's blazing-fast RAM. 
2. **The App is Running (Pure RAM):** While the app is open, you are *never* reading from the `.dat` file. If you make 3 transactions, you are pushing those directly into the `vector` (which lives in RAM). The vector knows there's 3 new transactions purely because it's a living list in memory tracking its own size.
3. **The Save (RAM → Storage):** Immediately after you do a transfer, we call `fileStorage.saveToFile()`. This takes your *entire living vector in RAM* and overwrites the `.dat` file on your hard drive, locking in the new history.

If your computer forcefully lost power before `saveToFile()` was called, those 3 transactions in the vector would be wiped from RAM forever, and the `.dat` file wouldn't have them either. This is why we auto-save the vector to the `.dat` file after every single action!

---

## Q18: Step 4 — How do `Account` and `Wallet` connect using Inheritance?

**User asked:** "Go ahead and explain how Account and Wallet are connected."

**Answer:** This is where we show off the two biggest pillars of Object-Oriented Programming (OOP): **Inheritance** and **Polymorphism**.

### 1. Inheritance (The Base vs The Derived)
Think of `Account` as a blank, generic template. Every account in the world has a `name` and an `ID`.
```cpp
// Account.h
class Account {
protected:
    string walletID;
    string name;
};
```
*(Notice `protected:` instead of `private:`? This means "Keep this hidden from the outside world, but let my children see it!")*

Now, `Wallet` is a highly specific, secure version of an Account that can actually hold a hashed PIN and do cryptography.
```cpp
// Wallet.h
class Wallet : public Account { 
private:
    string hashedPin; 
};
```
By saying `: public Account`, the `Wallet` class automatically inherits `name` and `walletID` from `Account` without us having to type them again! `Wallet` is the "Child" (Derived class) and `Account` is the "Parent" (Base class).

### 2. Polymorphism (The Shape-Shifter)
Polymorphism literally means "many forms." Look at this function in the Parent (`Account.h`):
```cpp
virtual string getAccountInfo();
```
The word `virtual` is a magic C++ keyword. It tells the compiler: *"Hey, my children might want to change how this function works. Let them override me."*

So, in the Child (`Wallet.cpp`), we rewrite the function to give specific Wallet info instead of generic Account info:
```cpp
string Wallet::getAccountInfo() {
    return "Wallet: " + name + " | ID: " + walletID;
}
```
If you put a generic `Account` and a `Wallet` side-by-side and tell them both to `getAccountInfo()`, they will give you totally different outputs because of Polymorphism!

---

## Q19: What does `virtual` mean? What is `~Account()` with the tilde? Can we remove them?

**User asked:** "In `Account.h` what does `virtual` mean and what is `~Account()`, why the tilde? Can we remove them if it's not genuinely needed?"

**Answer:** Great catch! Yes, we can completely remove them if we want the code to be as basic as possible. (I have gone ahead and removed them from the codebase so it's simpler for you!). 

But here is what they meant so you know for your exams:

### 1. What does `virtual` mean?
The word `virtual` is C++'s way of enabling **Polymorphism** (Late Binding). 
If a Parent class has a function `virtual void print()`, it is telling the C++ compiler: *"I have a print function, but if my Child class writes their own version of it, ignore mine and use theirs instead."*
Without the word `virtual`, C++ would stubbornly just use the Parent's generic function every time, ignoring the Child's custom version.

*(Since we are not actually using a generic "Account" anywhere in the app — we only ever use the specific "Wallet" — we don't strictly need polymorphism for this project to work, so I deleted `getAccountInfo()` to save lines of code!)*

### 2. What is `~Account()`? (The Tilde)
A function with the exact exact same name as the class, but with a tilde `~` in front, is called a **Destructor**.
- A **Constructor** (`Account()`) is called automatically the exact microsecond an object is **created** in memory.
- A **Destructor** (`~Account()`) is called automatically the exact microsecond an object is **destroyed** (deleted from RAM). 

In advanced C++, if a class uses `new` to ask for dynamic memory, you *must* write a Destructor that uses `delete` to give that memory back, otherwise you get a "memory leak." Because our `Account` class only uses basic strings (which clean themselves up automatically), our Destructor was completely empty. So yes, it was entirely safe to delete it!

---

## Q20: Step 5 — What is `DataStore`? What is `map<string, Wallet>`?

**User asked:** "Let's move ahead to the DataStore."

**Answer:** 
The `DataStore` acts as the **Manager** or "In-Memory Database" while your program is running.
If `main.cpp` needs to find a user's wallet, or check the blockchain, it goes to the Manager.

### 1. The Menu (`DataStore.h`)
```cpp
class DataStore {
private:
    map<string, Wallet> wallets;   // The Dictionary of users
    Ledger ledger;                 // The entire blockchain
public:
    void addWallet(Wallet w);
    Wallet* getWallet(string id);
    Ledger& getLedger();
};
```
Notice how `DataStore` holds the `Ledger` object directly. The ledger lives *inside* this datastore! 

### 2. What is `map<string, Wallet>`?
In Python, this is just a **Dictionary** (`dict = {"W-123": Wallet_Object}`).
In C++, it's called a `std::map`. It connects a **Key** (the string Wallet ID) to a **Value** (the `Wallet` object itself). 

Why use a Map instead of a `vector<Wallet>` array?
If we had 100,000 users in a `vector`, and someone wanted to log in, the program would have to loop through all 100,000 users one by one to find `W-123`. That is extremely slow ($O(N)$ time). 
A `map` uses a binary search tree. If you ask it for `W-123`, it jumps *instantly* to that exact wallet without looping ($O(\log N)$ or $O(1)$ time). It makes looking up users blazing fast!

### 3. What is `Wallet*` or `Ledger&`? (Pointers and References)
We'll talk about this more in the next section, but notice the `*` and `&` symbols!
When `main.cpp` asks the manager for a wallet, the manager doesn't give them a *copy* of the wallet (because if `main.cpp` added money to a *copy*, the real wallet would stay poor). 
Instead, the manager gives `main.cpp` a **Pointer (`*`)** or a **Reference (`&`)** — the direct physical address to the real wallet inside the manager's memory.

---

## Q21: What does `Wallet&` as a data type mean? Why do we need the ampersand `&`?

**User asked:** "Why do we need an ampersand? Isn't it used to point to the address of a variable? What does it mean when we type `Wallet&` as a data type before a function?"

**Answer:** This is one of the most powerful (and confusing!) parts of C++: **Memory Management**. 

You are completely right: the ampersand `&` deals with memory addresses. Let's look at why we use it as a return type for a function.

### 1. The Problem: "Pass-by-Value" (Copying)
In C++, if you write a function like this:
```cpp
Wallet getWallet(string id) { ... }
```
When `main.cpp` calls this function, C++ takes the real wallet sitting inside the DataStore, makes a **100% clone/copy** of it, and hands the clone to `main.cpp`.
If `main.cpp` adds $500 to that wallet, it is adding money to the *clone*. The real wallet inside the DataStore never changes! This is called "Pass-by-Value."

### 2. The Solution: "Pass-by-Reference" (`&`)
By adding an ampersand to the return type, we change everything:
```cpp
Wallet& getWallet(string id) { ... }
```
This tells C++: *"Do NOT make a copy. Give `main.cpp` a direct pipeline (a Reference) to the original, physical wallet sitting in my memory."*
Now, when `main.cpp` adds $500, it travels through that pipeline and directly modifies the real wallet inside the DataStore.

### 3. Pointers (`*`) vs References (`&`)
They both do exactly the same job (giving direct access to original memory instead of copies), but they look different:
- **Reference (`&`):** Looks like a normal variable. You use the dot operator (`wallet.getName()`). A reference *cannot* be empty (null). It must always point to something real.
- **Pointer (`*`):** Holds the raw hexadecimal memory address (e.g., `0x7ffc...`). You use the arrow operator (`wallet->getName()`). A pointer *can* be empty (`nullptr`). 

You correctly noticed that `DataStore.h` uses `Wallet& getWallet(string id);`! Because a Reference (`&`) cannot be empty, we have a separate function called `bool walletExists(string id);`. `main.cpp` must ask `walletExists` first to make sure the ID is valid. Only if it returns `true`, then `main.cpp` asks for the `Wallet&` reference to directly modify it!

---

## Q22: Are classes data types? What is `Block getLastBlock()` and `Ledger()`?

**User asked:** "We haven't used `*` anywhere actually... what's going where? In `Ledger& DataStore::getLedger()`, is `Ledger` the class or function? What is `Ledger();`? In `Block getLastBlock()`, shouldn't there be a data type there?"

**Answer:** Take a deep breath! You are hitting the exact mental wall that makes C++ difficult, but once this clicks, you will understand the entirety of Object-Oriented Programming. 

Here is the secret: **In C++, Classes ARE Data Types.**

### 1. `Block getLastBlock();` (Classes as Types)
When we write `int getAge();`, `int` is the data type. It means "This function returns a number."
When we write `class Block { ... }`, we have just invented a brand new custom data type called `Block`. 
So when we write `Block getLastBlock();`, the word `Block` **IS** the data type! It tells C++: *"This function will return a massive, custom-built object shaped exactly like a Block."*

### 2. `Ledger& DataStore::getLedger()`
Just like above:
- `Ledger&` = The Return Data Type (specifically: "A Reference to a Ledger object").
- `DataStore::` = The Scope (this function belongs to the DataStore class).
- `getLedger()` = The name of the function itself!

### 3. What is `Ledger();`? (Constructors)
You noticed `Ledger();` sitting in the menu without a return type. That is a **Constructor**.
A Constructor is a special function that has the *exact same name as the class*. It runs **automatically** the exact millisecond an object is created in memory.
Look at `Ledger.cpp`:
```cpp
Ledger::Ledger() {
    // Create the Genesis Block!
    Block genesis(0, {}, "0", getCurrentTimestamp(), "0");
    chain.push_back(genesis);
}
```
Because of this Constructor, the moment any file writes `Ledger myLedger;`, C++ instantly builds the Genesis Block without us having to ask. It "constructs" the initial state!

### 4. Did we use pointers (`*`)?
We actually did! Look at line 24 of `DataStore.h`: `Wallet* getWallet(string id);`. We used a pointer there because if a user types the wrong ID, we need to return an empty memory address (`nullptr`) to say "Wallet not found". You can't return an empty Reference (`&`), but you *can* return an empty Pointer (`*`)!

---

## Q23: Step 6 — How does `FileStorage` talk to `.dat` files? What is `ofstream`?

**User asked:** "Yeah go ahead and explain how saving and loading the files works."

**Answer:** 
The `FileStorage` class is our bridge between the blazing-fast RAM (where `DataStore` lives) and the permanent Hard Drive (where `wallet_data.dat` lives). 

In C++, reading and writing files is called "File I/O" (Input/Output). We use a library called `<fstream>`.

### 1. Writing to the Hard Drive (`ofstream`)
To write text to a file, we use `ofstream` (Output File Stream). It works exactly like `cout`, but instead of pushing text to your terminal screen, it pushes text directly into the `.dat` file.
```cpp
// Inside FileStorage::saveToFile
ofstream file(filename);             // Open or create the file using the dynamic string!
file << "WALLETS\n";                 // Push the word "WALLETS" into the file
file << store.getWalletCount() << "\n";
// (Loop through every wallet in RAM and push their data...)
```
We chose to separate the data with a pipe `|` character (like `W-123|Aashish|hashed_pin`).

### 2. Reading from the Hard Drive (`ifstream`)
When the app starts, we use `ifstream` (Input File Stream) to read the `.dat` file like a book, line by line. We use `getline()` to grab a full line of text, and then we have to chop it up based on where the pipe `|` characters are.
```cpp
// Inside FileStorage::loadFromFile
ifstream file(filename);
string line;
getline(file, line); // Grabs the first line of text
```

### 3. The `stringstream` Trick (Again!)
Once we have a raw line of text like `W-123|Aashish|pin_hash`, how do we chop it up? We use our favorite tool: `stringstream`! We feed the line to a stringstream, and then ask it to chop the line every time it sees a `|`.
```cpp
stringstream ss(line);
string id, name, pinHash;

getline(ss, id, '|');      // Grabs "W-123"
getline(ss, name, '|');    // Grabs "Aashish"
getline(ss, pinHash, '|'); // Grabs "pin_hash"
```
Once everything is chopped up, we use those exact pieces of data to feed the `Wallet()` constructor, completely reviving the wallet from the dead and shoving it back into the `DataStore` map!

---

## Q24: How are `filename` and `store` passed? Where is "wallet_data.dat"?

**User asked:** "We aren't using the wallet_data.dat file name anywhere... we've used DataStore& store everywhere... and filename = file..."

**Answer:** You are perfectly right! I simplified the code in the explanation, but the actual code is much smarter. Hardcoding "wallet_data.dat" directly into `FileStorage.cpp` is bad practice. What if you wanted to save to "backup.dat" tomorrow? You'd have to rewrite the class!

### 1. Where does "wallet_data.dat" come from?
Look at `FileStorage.h`, we have another **Constructor**:
```cpp
FileStorage(string file);
```
When `FileStorage.cpp` opens the file, it just says `ofstream outFile(filename);`. It doesn't know the real name yet!

The actual name `wallet_data.dat` is passed in from **`main.cpp`** right at the top:
```cpp
// Inside main.cpp
FileStorage fileStorage("wallet_data.dat");
```
When `main.cpp` runs that line, it passes the string phrase down into `FileStorage`, making `filename` = `"wallet_data.dat"`. 

### 2. How does `DataStore& store` work?
The exact same logic applies! `FileStorage.cpp` doesn't magically know where your wallets are. 

In `main.cpp`, we have our main Manager:
```cpp
// Inside main.cpp
DataStore dataStore;  // The living brain we talked about in Q20
```

When someone transfers money and we need to save everything, `main.cpp` calls the save function and literally hands the living brain (`dataStore`) to the file saver:
```cpp
// Inside main.cpp
fileStorage.saveToFile(dataStore);
```

Because the function menu in `FileStorage.h` expects a pass-by-reference (`saveToFile(DataStore& store)`), it physically grabs onto the living `dataStore` from `main.cpp`, loops through all its data, and writes it to the `.dat` file! 

This means `FileStorage` is a completely "blind" worker. It just waits for `main.cpp` to hand it a filename and a DataStore, and then it does the heavy lifting!

---

*Last updated: 2026-03-10*
