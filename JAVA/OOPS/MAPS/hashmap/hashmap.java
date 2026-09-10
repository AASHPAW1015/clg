import java.util.HashMap;

public class hashmap {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Apple", 10);
        map.putIfAbsent("Apple", 20); // won't change (10 remains)
        map.putIfAbsent("Banana", 15); // inserts new

        System.out.println(map.getOrDefault("Orange", 0)); // 0

        map.compute("Apple", (k, v) -> v + 5); // becomes 15
        map.merge("Banana", 10, (old, incoming) -> old + incoming); // becomes 25
 
        map.forEach((k, v) -> System.out.println(k + ":" + v)); 
    }
}
