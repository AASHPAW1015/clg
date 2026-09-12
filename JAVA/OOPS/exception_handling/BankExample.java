import java.util.Scanner;

public class BankExample {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    double balance = 5000;
    try{
      System.out.print("Enter amount to withdraw: ");
      double amount = sc.nextDouble();

      if(amount > balance){
        throw new Exception("Insufficient funds for withdrawal.");
      }

      balance -= amount;
      System.out.println("Withdrawal successful.");
      System.out.println("Remaining balance: ₹" + balance);

    } catch (Exception e){
      System.out.println("Transaction failed: "+e.getMessage());
    }

    sc.close();
  }
}
