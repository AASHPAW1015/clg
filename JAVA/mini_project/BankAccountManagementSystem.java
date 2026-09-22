import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.util.*;
import javax.swing.*;


// ==========================================================
// MEMBER 1 — OOP: CUSTOMER, ACCOUNT AND ACCOUNT INFORMATION
// ==========================================================

class Customer {

    private String name;
    private String phone;

    public Customer(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}


class Account {

    private int accountNumber;
    private String accountType;
    private double balance;
    private Customer customer;

    public Account(int accountNumber, String accountType,
                   double balance, Customer customer) {

        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.customer = customer;
    }

    public int getAccountNumber() {
        return accountNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public double getBalance() {
        return balance;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public void deposit(double amount) {
        balance = balance + amount;
    }

    public boolean withdraw(double amount) {

        if (amount <= balance) {
            balance = balance - amount;
            return true;
        }

        return false;
    }

    public String getAccountDetails() {

        return "Account Number: " + accountNumber +
                "\nCustomer Name: " + customer.getName() +
                "\nPhone: " + customer.getPhone() +
                "\nAccount Type: " + accountType +
                "\nBalance: Rs. " + balance;
    }
}


class AccountArray {

    private Account[] accounts;
    private int count;

    public AccountArray(int size) {
        accounts = new Account[size];
        count = 0;
    }

    public boolean add(Account account) {

        if (count >= accounts.length) {
            return false;
        }

        accounts[count] = account;
        count++;

        return true;
    }

    public boolean remove(int accountNumber) {

        for (int i = 0; i < count; i++) {

            if (accounts[i].getAccountNumber() == accountNumber) {

                for (int j = i; j < count - 1; j++) {
                    accounts[j] = accounts[j + 1];
                }

                accounts[count - 1] = null;
                count--;

                return true;
            }
        }

        return false;
    }

    public boolean isFull() {
        return count >= accounts.length;
    }

    public Account[] getAccounts() {
        return accounts;
    }
}


// ==========================================================
// MEMBER 2 — LINKEDLIST, FILE HANDLING AND EXCEPTION HANDLING
// ==========================================================

class Transaction {

    private String type;
    private double amount;

    public Transaction(String type, double amount) {
        this.type = type;
        this.amount = amount;
    }

    @Override
    public String toString() {

        // Same idea as the accounts table: %-15s left-aligns the type
        // in 15 spaces, %12.2f right-aligns the amount in 12.
        return String.format("%-15s %12.2f", type, amount);
    }
}


class TransactionManager {

    private LinkedList<Transaction> transactions;

    // How many transactions are already written to the file, so a second
    // save appends only the new ones instead of repeating everything.
    private int savedCount;

    public TransactionManager() {
        transactions = new LinkedList<>();
        savedCount = 0;
    }

    public void addTransaction(String type, double amount) {
        transactions.add(new Transaction(type, amount));
    }

    private String tableHeader() {

        return String.format("%-15s %12s\n", "TYPE", "AMOUNT (Rs.)")
                + "-".repeat(28) + "\n";
    }

    public String getTransactions() {

        if (transactions.isEmpty()) {
            return "No transactions available.";
        }

        String result = tableHeader();

        for (Transaction transaction : transactions) {
            result = result + transaction + "\n";
        }

        return result;
    }

    public void saveToFile() {

        File file = new File("transactions.txt");

        // The header belongs at the top once. Without this check every
        // save would drop another header into the middle of the data.
        boolean needsHeader = !file.exists() || file.length() == 0;

        // The second argument, true, turns on append mode: new rows are
        // added after the old ones instead of wiping the file.
        try (FileWriter writer = new FileWriter(file, true)) {

            if (needsHeader) {
                writer.write(tableHeader());
            }

            for (Transaction transaction :
                    transactions.subList(savedCount, transactions.size())) {

                writer.write(transaction.toString() + "\n");
            }

            savedCount = transactions.size();

        } catch (IOException e) {

            System.out.println("Error while writing file.");
        }
    }

    public String readFromFile() {

        String result = "";

        try (Scanner sc = new Scanner(new File("transactions.txt"))) {

            while (sc.hasNextLine()) {
                result = result + sc.nextLine() + "\n";
            }

        } catch (FileNotFoundException e) {

            result = "Transaction file not found.";
        }

        return result;
    }
}


// ==========================================================
// MEMBER 3 — HASHMAP, HASHSET, TREEMAP, SEARCH, UPDATE AND DELETE
// ==========================================================

class BankManager {

    private HashMap<Integer, Account> accounts;
    private HashSet<Integer> accountNumbers;
    private TreeMap<Integer, Account> sortedAccounts;
    private AccountArray accountArray;

    public BankManager() {

        accounts = new HashMap<>();
        accountNumbers = new HashSet<>();
        sortedAccounts = new TreeMap<>();
        accountArray = new AccountArray(100);
    }

    public boolean addAccount(Account account) {

        int number = account.getAccountNumber();

        if (accountNumbers.contains(number)) {
            return false;
        }

        // Array filled first: if it is full nothing else is touched,
        // so all four structures stay in agreement.
        if (!accountArray.add(account)) {
            return false;
        }

        accountNumbers.add(number);
        accounts.put(number, account);
        sortedAccounts.put(number, account);

        return true;
    }

    public boolean isFull() {
        return accountArray.isFull();
    }

    public Account searchAccount(int accountNumber) {

        return accounts.get(accountNumber);
    }

    public boolean updateAccount(int accountNumber,
                                 String name,
                                 String phone,
                                 String type) {

        Account account = accounts.get(accountNumber);

        if (account == null) {
            return false;
        }

        account.getCustomer().setName(name);
        account.getCustomer().setPhone(phone);
        account.setAccountType(type);

        return true;
    }

    public boolean deleteAccount(int accountNumber) {

        if (!accounts.containsKey(accountNumber)) {
            return false;
        }

        accounts.remove(accountNumber);
        accountNumbers.remove(accountNumber);
        sortedAccounts.remove(accountNumber);
        accountArray.remove(accountNumber);

        return true;
    }

    public void saveToFile() {

        // Accounts are current state, not a history, so the file is
        // rewritten with the full list every time. Appending here would
        // stack up a stale copy of an account on every balance change.
        try (FileWriter writer = new FileWriter("accounts.txt")) {

            writer.write(getAllAccounts());

        } catch (IOException e) {

            System.out.println("Error while writing accounts file.");
        }
    }

    public String readFromFile() {

        String result = "";

        try (Scanner sc = new Scanner(new File("accounts.txt"))) {

            while (sc.hasNextLine()) {
                result = result + sc.nextLine() + "\n";
            }

        } catch (FileNotFoundException e) {

            result = "Accounts file not found.";
        }

        return result;
    }

    public String getAllAccounts() {

        if (sortedAccounts.isEmpty()) {
            return "No accounts available.";
        }

        // Each %-10s reserves 10 spaces and pushes the text to the left,
        // so every row lines up into columns. %12.2f right-aligns the
        // balance in 12 spaces with 2 decimal places.
        String result = String.format(
                "%-10s %-20s %-15s %-10s %12s\n",
                "ACC NO", "CUSTOMER", "PHONE", "TYPE", "BALANCE");

        result = result + "-".repeat(71) + "\n";

        for (Account account : sortedAccounts.values()) {

            result = result + String.format(
                    "%-10d %-20s %-15s %-10s %12.2f\n",
                    account.getAccountNumber(),
                    account.getCustomer().getName(),
                    account.getCustomer().getPhone(),
                    account.getAccountType(),
                    account.getBalance());
        }

        return result;
    }
}


// ==========================================================
// MEMBER 4 — SWING GUI AND EVENT HANDLING
// ==========================================================

public class BankAccountManagementSystem extends JFrame
        implements ActionListener {

    JLabel accountLabel;
    JLabel nameLabel;
    JLabel phoneLabel;
    JLabel typeLabel;
    JLabel amountLabel;

    JTextField accountField;
    JTextField nameField;
    JTextField phoneField;
    JTextField amountField;

    JComboBox<String> accountType;

    JLabel outputLabel;
    JTextArea outputArea;
    JScrollPane outputScroll;

    JButton createButton;
    JButton searchButton;
    JButton depositButton;
    JButton withdrawButton;
    JButton updateButton;
    JButton deleteButton;
    JButton transactionButton;
    JButton saveButton;
    JButton readButton;
    JButton allAccountsButton;
    JButton readAccountsButton;

    BankManager bank;
    TransactionManager transactionManager;

    public BankAccountManagementSystem() {

        bank = new BankManager();
        transactionManager = new TransactionManager();

        setTitle("Bank Account Management System");
        setSize(750, 650);
        setLayout(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        accountLabel = new JLabel("Account Number:");
        nameLabel = new JLabel("Customer Name:");
        phoneLabel = new JLabel("Phone:");
        typeLabel = new JLabel("Account Type:");
        amountLabel = new JLabel("Amount:");

        accountField = new JTextField();
        nameField = new JTextField();
        phoneField = new JTextField();
        amountField = new JTextField();

        accountType = new JComboBox<>(
                new String[]{"Savings", "Current"}
        );

        outputLabel = new JLabel("Output:");

        outputArea = new JTextArea();

        // A monospaced font gives every character the same width,
        // which is what makes the columns line up.
        outputArea.setFont(new Font("Monospaced", Font.PLAIN, 13));
        outputArea.setEditable(false);

        // The scroll pane wraps the text area so long lists can scroll.
        outputScroll = new JScrollPane(outputArea);

        createButton = new JButton("Create Account");
        searchButton = new JButton("Search");
        depositButton = new JButton("Deposit");
        withdrawButton = new JButton("Withdraw");
        updateButton = new JButton("Update");
        deleteButton = new JButton("Delete");
        transactionButton = new JButton("Transactions");
        saveButton = new JButton("Save File");
        readButton = new JButton("Read Transactions");
        allAccountsButton = new JButton("All Accounts");
        readAccountsButton = new JButton("Read Accounts");

        accountLabel.setBounds(50, 40, 120, 30);
        accountField.setBounds(180, 40, 200, 30);

        nameLabel.setBounds(50, 80, 120, 30);
        nameField.setBounds(180, 80, 200, 30);

        phoneLabel.setBounds(50, 120, 120, 30);
        phoneField.setBounds(180, 120, 200, 30);

        typeLabel.setBounds(50, 160, 120, 30);
        accountType.setBounds(180, 160, 200, 30);

        amountLabel.setBounds(50, 200, 120, 30);
        amountField.setBounds(180, 200, 200, 30);

        createButton.setBounds(420, 40, 150, 30);
        searchButton.setBounds(420, 80, 150, 30);
        depositButton.setBounds(420, 120, 150, 30);
        withdrawButton.setBounds(420, 160, 150, 30);

        updateButton.setBounds(50, 250, 100, 30);
        deleteButton.setBounds(170, 250, 100, 30);
        transactionButton.setBounds(290, 250, 120, 30);
        saveButton.setBounds(430, 250, 100, 30);
        readButton.setBounds(550, 250, 100, 30);

        allAccountsButton.setBounds(290, 300, 120, 30);
        readAccountsButton.setBounds(430, 300, 140, 30);

        outputLabel.setBounds(50, 340, 120, 30);
        outputScroll.setBounds(50, 370, 640, 220);

        add(accountLabel);
        add(accountField);

        add(nameLabel);
        add(nameField);

        add(phoneLabel);
        add(phoneField);

        add(typeLabel);
        add(accountType);

        add(amountLabel);
        add(amountField);

        add(createButton);
        add(searchButton);
        add(depositButton);
        add(withdrawButton);
        add(updateButton);
        add(deleteButton);
        add(transactionButton);
        add(saveButton);
        add(readButton);
        add(allAccountsButton);
        add(readAccountsButton);

        add(outputLabel);
        add(outputScroll);

        createButton.addActionListener(this);
        searchButton.addActionListener(this);
        depositButton.addActionListener(this);
        withdrawButton.addActionListener(this);
        updateButton.addActionListener(this);
        deleteButton.addActionListener(this);
        transactionButton.addActionListener(this);
        saveButton.addActionListener(this);
        readButton.addActionListener(this);
        allAccountsButton.addActionListener(this);
        readAccountsButton.addActionListener(this);

        // Shown only after every component is added, else frame opens blank.
        setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {

        if (e.getSource() == createButton) {

            try {

                int accountNumber =
                        Integer.parseInt(accountField.getText());

                String name = nameField.getText();
                String phone = phoneField.getText();

                String type =
                        accountType.getSelectedItem().toString();

                if (name.isEmpty() || phone.isEmpty()) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Please enter all customer details."
                    );

                    return;
                }

                if (bank.isFull()) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Bank is full. Maximum 100 accounts."
                    );

                    return;
                }

                Customer customer =
                        new Customer(name, phone);

                Account account =
                        new Account(
                                accountNumber,
                                type,
                                0,
                                customer
                        );

                if (bank.addAccount(account)) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account created successfully."
                    );

                } else {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account number already exists."
                    );
                }

            } catch (NumberFormatException ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Enter a valid account number."
                );

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Invalid input."
                );
            }
        }


        else if (e.getSource() == searchButton) {

            try {

                int accountNumber =
                        Integer.parseInt(accountField.getText());

                Account account =
                        bank.searchAccount(accountNumber);

                if (account != null) {

                    JOptionPane.showMessageDialog(
                            this,
                            account.getAccountDetails()
                    );

                } else {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account not found."
                    );
                }

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Enter a valid account number."
                );
            }
        }


        else if (e.getSource() == depositButton) {

            try {

                int accountNumber =
                        Integer.parseInt(accountField.getText());

                double amount =
                        Double.parseDouble(amountField.getText());

                if (amount <= 0) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Amount must be greater than zero."
                    );

                    return;
                }

                Account account =
                        bank.searchAccount(accountNumber);

                if (account == null) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account not found."
                    );

                    return;
                }

                account.deposit(amount);

                transactionManager.addTransaction(
                        "Deposit",
                        amount
                );

                JOptionPane.showMessageDialog(
                        this,
                        "Deposit successful.\n" +
                        "New Balance: Rs. " +
                        account.getBalance()
                );

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Enter valid information."
                );
            }
        }


        else if (e.getSource() == withdrawButton) {

            try {

                int accountNumber =
                        Integer.parseInt(accountField.getText());

                double amount =
                        Double.parseDouble(amountField.getText());

                if (amount <= 0) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Amount must be greater than zero."
                    );

                    return;
                }

                Account account =
                        bank.searchAccount(accountNumber);

                if (account == null) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account not found."
                    );

                    return;
                }

                if (account.withdraw(amount)) {

                    transactionManager.addTransaction(
                            "Withdrawal",
                            amount
                    );

                    JOptionPane.showMessageDialog(
                            this,
                            "Withdrawal successful.\n" +
                            "Remaining Balance: Rs. " +
                            account.getBalance()
                    );

                } else {

                    JOptionPane.showMessageDialog(
                            this,
                            "Insufficient balance."
                    );
                }

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Enter valid information."
                );
            }
        }


        else if (e.getSource() == updateButton) {

            try {

                int accountNumber =
                        Integer.parseInt(accountField.getText());

                String name = nameField.getText();
                String phone = phoneField.getText();

                String type =
                        accountType.getSelectedItem().toString();

                if (bank.updateAccount(
                        accountNumber,
                        name,
                        phone,
                        type)) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account updated successfully."
                    );

                } else {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account not found."
                    );
                }

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Enter valid information."
                );
            }
        }


        else if (e.getSource() == deleteButton) {

            try {

                int accountNumber =
                        Integer.parseInt(accountField.getText());

                if (bank.deleteAccount(accountNumber)) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account deleted successfully."
                    );

                } else {

                    JOptionPane.showMessageDialog(
                            this,
                            "Account not found."
                    );
                }

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Enter a valid account number."
                );
            }
        }


        else if (e.getSource() == transactionButton) {

            outputArea.setText(transactionManager.getTransactions());
        }


        else if (e.getSource() == saveButton) {

            transactionManager.saveToFile();
            bank.saveToFile();

            JOptionPane.showMessageDialog(
                    this,
                    "New transactions appended to transactions.txt\n" +
                    "Accounts saved to accounts.txt"
            );
        }


        else if (e.getSource() == readButton) {

            String fileData =
                    transactionManager.readFromFile();

            outputArea.setText(fileData);
        }


        else if (e.getSource() == allAccountsButton) {

            outputArea.setText(bank.getAllAccounts());
        }


        else if (e.getSource() == readAccountsButton) {

            outputArea.setText(bank.readFromFile());
        }
    }


    public static void main(String[] args) {

        SwingUtilities.invokeLater(
                () -> new BankAccountManagementSystem()
        );
    }
}
