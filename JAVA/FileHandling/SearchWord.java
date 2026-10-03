import java.io.File;
import java.util.Scanner;

public class SearchWord {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    System.out.print("enter a word to search: ");
    String search = input.nextLine();

    boolean found = false;
    try {
      File file = new File("data.txt");
      Scanner sc = new Scanner(file);

      while (sc.hasNextLine()) {
        String line = sc.nextLine();

        if (line.toLowerCase().contains(search.toLowerCase())) {
          System.out.println("Found: " + line);
          found = true;
        }
      }
      sc.close();
    } catch (Exception e) {
      System.out.println("File error: data.txt not found!!!");
    }

    if (!found) {
      System.out.println("word not found!!!");
    }

    input.close();
  }
}
