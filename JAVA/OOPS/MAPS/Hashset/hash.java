import java.util.Arrays;
import java.util.HashSet;

public class hash {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
            set.add("Apple");
            set.add("Apple");  // ignored (duplicate)
            set.add("Banana");

        System.out.println("Set: " + set);
        System.out.println("Contains Apple? " + set.contains("Apple")); // true

            set.remove("Banana");
        System.out.println("After removing Banana: " + set);

            set.retainAll(Arrays.asList("Apple", "Orange")); // keeps only "Apple"
        System.out.println("After retainAll: " + set);

        String[] arr = set.toArray(new String[0]);
        System.out.println("As array: " + Arrays.toString(arr));
    }
}
