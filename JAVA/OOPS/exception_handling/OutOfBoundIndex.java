import java.util.Scanner;

public class OutOfBoundIndex {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int[] marks = {10,20,30,40,50,60};

    try {
      System.out.println("Enter student index: ");
      int index = sc.nextInt();

      System.out.println("Marks = " + marks[index]);
    } catch (ArrayIndexOutOfBoundsException e) {
      System.out.println("Invalid student index entered!!!!");
    }
    
    sc.close();
  }
}
