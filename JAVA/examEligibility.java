import java.util.Scanner;


public class examEligibility {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    System.out.print("Enter Attendace percentage: ");
    double attendance = sc.nextDouble();

    System.out.print("Enter internal marks: ");
    int marks = sc.nextInt();

    System.out.print("Assignment Submitted? (true/false): ");
    boolean assignment = sc.nextBoolean();

    if (attendance >= 75.00 && marks >= 40 && assignment) {
      System.out.print("ELIGIBLEEEEE!!!!");
    } else {
      System.out.print("NOT ELIGIBLE");
    }

    sc.close();
  }
}
