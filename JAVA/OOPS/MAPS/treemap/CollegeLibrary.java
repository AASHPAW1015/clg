import java.util.TreeMap;

public class CollegeLibrary {
  public static void main(String[] args) {
    //create TreeMap
    //key = book id 
    //value = book name 
    TreeMap<Integer, String> books = new TreeMap<>();

    // add da books
    books.put(106,"Java Programming");
    books.put(102,"Data Structures");
    books.put(105,"Operating Systems");
    books.put(101,"Computer Networks");
    books.put(104,"Database Management");
    books.put(103,"Software Engineering");

    //display all books in a sorted order
    
    System.out.println("=====COLLEHE LIBRARY=====");
    System.out.println("All books:");

    for (Integer bookID : books.keySet()){
      System.out.println(bookID +" -> "+ books.get(bookID));
    }

    // find first book id
    System.out.println("\nFirst book ID: " + books.firstKey());

    // find last book id 
    System.out.println("\nLast book ID: " + books.lastKey());

    //display books before 105
    System.out.println("\nBooks before ID 105");

    for (Integer bookID : books.headMap(105).keySet()) {
      System.out.println(bookID + " -> " + books.get(bookID));
    }

    // display books from id 103
    System.out.println("\nBooks from ID 103 onwards: ");

    for (Integer bookID : books.tailMap(103).keySet()){
      System.out.println(bookID + " -> " + books.get(bookID));
    }

    // search for a specific boob 
    int searchID = 104;

    System.out.println("\nSearching for Book ID: " + searchID);

    if (books.containsKey(searchID)) {
      System.out.println("Book Found!!");
      System.out.println("Book name: " + books.get(searchID));
    } else {
      System.out.println("Book not found with the id: " + searchID + " !!!!");
    }

    //remove a boob
    int removeID = 102;

    System.out.println("\nRemoving Book ID: " + removeID);

    if (books.containsKey(removeID)) {
      books.remove(removeID);
      System.out.println("Book removed successfully!!");
    } else {
      System.out.println("Book not found with the id: " + removeID + " !!!!");
    }

    System.out.println("\nBooks after removal: ");

    for (Integer bookID : books.keySet()){
      System.out.println(bookID + " -> " + books.get(bookID));
    }
  }
}
