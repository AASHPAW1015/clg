import java.util.LinkedList;

class Student {

    private String id;
    private String name;
    private String email;

    // LinkedList: the student's session history, in the order they booked
    private LinkedList<Session> history = new LinkedList<>();

    public Student(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void addToHistory(Session session) {
        history.addLast(session);
    }

    public LinkedList<Session> getHistory() {
        return history;
    }

    @Override
    public String toString() {
        return name + " [" + id + "]";
    }
}
