import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Studentfile {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        try {
            FileWriter writer = new FileWriter("students.txt", true);

            System.out.print("Enter student name: ");
            String name = sc.nextLine();

            System.out.print("Enter course: ");
            String course = sc.nextLine();

            System.out.print("Enter marks: ");
            int marks = sc.nextInt();

            writer.write("Name: " + name + "\n");
            writer.write("Course: " + course + "\n");
            writer.write("Marks: " + marks + "\n");
            writer.write("----------------------\n");

            writer.close();

            System.out.println("Student record saved.");

        } catch (IOException e) {
            System.out.println("File error occurred.");
        }

        sc.close();
    }
}
