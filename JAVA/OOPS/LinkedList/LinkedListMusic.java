import java.util.LinkedList;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> playlist = new LinkedList<>();

        playlist.add("Instant Crush");
        playlist.add("Mind Games");
        playlist.add("Les");

        System.out.println("Playlist: " + playlist);

        playlist.addFirst("In the Night");

        //Display last song
        System.out.println("Last song: " + playlist.getLast());

        //Search song
        if(playlist.contains("Les")) {
            System.out.println("Song found in the playlist.");
        } 

        //Remove song
        playlist.remove("Mind Games");
        System.out.println("Updated Playlist: " + playlist);

        //Total Songs
        System.out.println("Total Songs: " + playlist.size());
    }
}
