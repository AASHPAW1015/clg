import java.util.*;

public class StudentManagement {
  public static void main(String[] args) {
    //1. HashSet
    //stores unique student names, no duplicates, no order
    HashSet<String> students = new HashSet<>();

    students.add("Rahul");
    students.add("Priya");
    students.add("Amit");
    students.add("Rahul");   // duplicate, HashSet ignores it

    System.out.println("=====STUDENT MANAGEMENT=====");
    System.out.println("All students: " + students);
    System.out.println("Total students: " + students.size());

    // search for a student
    String searchName = "Priya";

    System.out.println("\nSearching for student: " + searchName);

    if (students.contains(searchName)) {
      System.out.println("Student found!!");
    } else {
      System.out.println("Student not found: " + searchName + " !!!!");
    }

    // remove a student
    String removeName = "Amit";

    System.out.println("\nRemoving student: " + removeName);

    if (students.remove(removeName)) {
      System.out.println("Student removed successfully!!");
    } else {
      System.out.println("Student not found: " + removeName + " !!!!");
    }

    System.out.println("\nStudents after removal:");

    for (String name : students) {
      System.out.println("- " + name);
    }

    //2. LinkedList
    //stores subjects in insertion order, duplicates allowed
    LinkedList<String> subject = new LinkedList<>();
    subject.add("Java");
    subject.add("Science");
    subject.add("English");

    System.out.println("\nAll subjects: " + subject);
    System.out.println("Total subjects: " + subject.size());

    // add at both ends
    subject.addFirst("Maths");
    subject.addLast("History");

    System.out.println("\nSubjects after adding at both ends: " + subject);

    System.out.println("First subject: " + subject.getFirst());
    System.out.println("Last subject: " + subject.getLast());

    // search by index
    String searchSubject = "English";

    System.out.println("\nSearching for subject: " + searchSubject);

    if (subject.contains(searchSubject)) {
      System.out.println("Subject found at index: " + subject.indexOf(searchSubject));
    } else {
      System.out.println("Subject not found: " + searchSubject + " !!!!");
    }

    // remove from front and back
    System.out.println("\nRemoved first subject: " + subject.removeFirst());
    System.out.println("Removed last subject: " + subject.removeLast());

    System.out.println("\nSubjects after removal:");

    for (int i = 0; i < subject.size(); i++) {
      System.out.println(i + " -> " + subject.get(i));
    }
  }
}
