import java.util.Scanner;

public class ATM {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double balance = 1000.0;

        System.out.println("===== ATM MENU =====");
        System.out.println("1. Withdraw");
        System.out.println("2. Deposit");
        System.out.println("3. Show Balance");
        System.out.print("Choose an option: ");

        if (!sc.hasNextInt()) {
            System.out.println("Invalid input. Please enter a number.");
            sc.close();
            return;
        }

        int choice = sc.nextInt();

        switch (choice) {
            case 1:
                System.out.print("Enter amount to withdraw: ");

                if (!sc.hasNextDouble()) {
                    System.out.println("Invalid amount. Please enter a number.");
                    break;
                }

                double withdrawAmount = sc.nextDouble();

                if (withdrawAmount <= 0) {
                    System.out.println("Invalid amount.");
                } else if (withdrawAmount > balance) {
                    System.out.println("Insufficient balance. You have: " + balance);
                } else {
                    balance -= withdrawAmount;
                    System.out.println("Withdrew: " + withdrawAmount);
                    System.out.println("Remaining balance: " + balance);
                }
                break;

            case 2:
                System.out.print("Enter amount to deposit: ");

                if (!sc.hasNextDouble()) {
                    System.out.println("Invalid amount. Please enter a number.");
                    break;
                }

                double depositAmount = sc.nextDouble();

                if (depositAmount <= 0) {
                    System.out.println("Invalid amount.");
                } else {
                    balance += depositAmount;
                    System.out.println("Deposited: " + depositAmount);
                    System.out.println("New balance: " + balance);
                }
                break;

            case 3:
                System.out.println("Your current balance is: " + balance);
                break;

            default:
                System.out.println("Invalid option. Please choose 1-3.");
        }

        sc.close();
    }
}
