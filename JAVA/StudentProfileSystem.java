import java.util.Scanner;

public class StudentProfileSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int subjects = 5;
        double[] marks = new double[subjects];
        double total = 0;

        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.println();

        for (int i = 0; i < subjects; i++) {
            System.out.print("Enter marks for subject " + (i + 1) + " (0-100): ");

            if (!sc.hasNextDouble()) {
                System.out.println("Invalid input. Please enter a number.");
                sc.close();
                return;
            }

            marks[i] = sc.nextDouble();

            if (marks[i] < 0 || marks[i] > 100) {
                System.out.println("Marks must be between 0 and 100.");
                sc.close();
                return;
            }

            total += marks[i];
        }

        System.out.println();

        double percentage = (total / (subjects * 100)) * 100;
        String grade;
        String result;

        if (percentage >= 90) {
            grade = "A";
        } else if (percentage >= 75) {
            grade = "B";
        } else if (percentage >= 60) {
            grade = "C";
        } else if (percentage >= 40) {
            grade = "D";
        } else {
            grade = "F";
        }

        if (percentage >= 40) {
            result = "Pass";
        } else {
            result = "Fail";
        }

        int highest = 0;
        int lowest = 0;
        int weakCount = 0;

        for (int i = 1; i < subjects; i++) {
            if (marks[i] > marks[highest]) {
                highest = i;
            }
            if (marks[i] < marks[lowest]) {
                lowest = i;
            }
        }

        System.out.println("===== Report Card =====");
        System.out.println("Name: " + name);

        for (int i = 0; i < subjects; i++) {
            if (marks[i] < 40) {
                System.out.println("Subject " + (i + 1) + ": " + marks[i] + "  (weak)");
                weakCount++;
            } else {
                System.out.println("Subject " + (i + 1) + ": " + marks[i]);
            }
        }

        System.out.println("Total Marks: " + total + " / " + (subjects * 100));
        System.out.printf("Average: %.2f\n", total / subjects);
        System.out.println("Best Subject: Subject " + (highest + 1) + " (" + marks[highest] + ")");
        System.out.println("Weakest Subject: Subject " + (lowest + 1) + " (" + marks[lowest] + ")");
        System.out.println("Subjects below 40: " + weakCount);
        System.out.printf("Percentage: %.2f%%\n", percentage);
        System.out.println("Grade: " + grade);
        System.out.println("Result: " + result);
        System.out.println();

        sc.close();
    }
}
