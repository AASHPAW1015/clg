import java.util.Scanner;

public class inputAddTwo {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    System.out.print("Enter the first number: ");
    int num1 = sc.nextInt();
    System.out.print("Enter the second number: ");
    int num2 = sc.nextInt();

    System.out.print("The addition of the two numbers is: "+ (num1+num2));

    sc.close();
  }
}
