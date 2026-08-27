import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

// ENCAPSULATION: fields are private, outside code touches them only through methods
class BankAccount {
    private String accountHolder;
    private double balance;

    BankAccount(String accountHolder, double balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    // base version, subclasses override this
    public double calculateInterest() {
        return 0;
    }

    public String getType() {
        return "Bank Account";
    }
}

// INHERITANCE: SavingsAccount gets all BankAccount members
class SavingsAccount extends BankAccount {

    SavingsAccount(String accountHolder, double balance) {
        super(accountHolder, balance); 
    }

    // POLYMORPHISM: same method name, different behaviour
    @Override
    public double calculateInterest() {
        return getBalance() * 0.05;
    }

    @Override
    public String getType() {
        return "Savings Account";
    }
}

class CurrentAccount extends BankAccount {

    CurrentAccount(String accountHolder, double balance) {
        super(accountHolder, balance);
    }

    @Override
    public double calculateInterest() {
        return getBalance() * 0.02;
    }

    @Override
    public String getType() {
        return "Current Account";
    }
}

// INHERITANCE from JFrame + IMPLEMENTS the ActionListener interface
class atmFrame extends JFrame implements ActionListener {
    JLabel nameLabel;
    JLabel balanceLabel;
    JLabel amountLabel;

    JTextField nameField;
    JTextField balanceField;
    JTextField amountField;

    JButton depositButton;
    JButton withdrawButton;
    JButton interestButton;

    JTextArea outputArea;
    JScrollPane outputScroll;

    // parent type holding a child object = runtime polymorphism
    BankAccount account;

    atmFrame() {
        setTitle("Bank Account Management");

        nameLabel = new JLabel("Account Holder: ");
        balanceLabel = new JLabel("Initial Balance: ");
        amountLabel = new JLabel("Amount: ");

        nameField = new JTextField();
        balanceField = new JTextField();
        amountField = new JTextField();

        depositButton = new JButton("Deposit");
        withdrawButton = new JButton("Withdraw");
        interestButton = new JButton("Calculate Interest");

        outputArea = new JTextArea();
        outputArea.setEditable(false);
        outputArea.setLineWrap(true);
        outputArea.setWrapStyleWord(true);
        outputScroll = new JScrollPane(outputArea);

        // (x,y,width,height)
        nameLabel.setBounds(30, 30, 120, 30);
        nameField.setBounds(150, 30, 200, 30);

        balanceLabel.setBounds(30, 80, 120, 30);
        balanceField.setBounds(150, 80, 200, 30);

        amountLabel.setBounds(30, 130, 120, 30);
        amountField.setBounds(150, 130, 200, 30);

        depositButton.setBounds(30, 190, 150, 30);
        withdrawButton.setBounds(200, 190, 150, 30);
        interestButton.setBounds(30, 240, 150, 30);

        outputScroll.setBounds(380, 30, 260, 240);

        add(nameLabel);
        add(nameField);
        add(balanceLabel);
        add(balanceField);
        add(amountLabel);
        add(amountField);
        add(depositButton);
        add(withdrawButton);
        add(interestButton);
        add(outputScroll);

        // "this" is the listener because the class implements ActionListener
        depositButton.addActionListener(this);
        withdrawButton.addActionListener(this);
        interestButton.addActionListener(this);

        setSize(670, 330);
        setLayout(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
    }

    // builds the account object from the text fields
    boolean createAccount() {
        try {
            String name = nameField.getText();
            double balance = Double.parseDouble(balanceField.getText());

            // parent reference, child object
            account = new SavingsAccount(name, balance);
            return true;
        } catch (NumberFormatException e) {
            outputArea.append("Enter a valid initial balance\n");
            return false;
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (account == null) {
            if (!createAccount()) {
                return;
            }
        }

        if (e.getSource() == interestButton) {
            // calls the SavingsAccount version, not the BankAccount one
            double interest = account.calculateInterest();
            outputArea.append(account.getType() + " interest: " + interest + "\n\n");
            return;
        }

        double amount;
        try {
            amount = Double.parseDouble(amountField.getText());
        } catch (NumberFormatException ex) {
            outputArea.append("Enter a valid amount\n");
            return;
        }

        if (e.getSource() == depositButton) {
            account.deposit(amount);
            outputArea.append(account.getAccountHolder() + " deposited " + amount + "\n");
            outputArea.append("Balance: " + account.getBalance() + "\n\n");
        } else if (e.getSource() == withdrawButton) {
            if (account.withdraw(amount)) {
                outputArea.append(account.getAccountHolder() + " withdrew " + amount + "\n");
                outputArea.append("Balance: " + account.getBalance() + "\n\n");
            } else {
                outputArea.append("Insufficient balance. Available: " + account.getBalance() + "\n\n");
            }
        }

        balanceField.setText(String.valueOf(account.getBalance()));
    }
}

public class ATMOOPS {
    public static void main(String[] args) {
        new atmFrame();
    }
}
