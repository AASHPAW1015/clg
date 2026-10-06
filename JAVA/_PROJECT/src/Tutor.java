import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.UUID;
import java.util.TreeMap;

// abstract base shared by IndividualTutor and GroupTutor
abstract class Tutor implements Bookable {

    private String id;
    private String name;
    private double rating;
    private double hourlyRate;

    private ArrayList<Subject> expertise = new ArrayList<>();

    // TreeMap: this tutor's published slots, sorted by start time
    protected TreeMap<LocalDateTime, Session> schedule = new TreeMap<>();

    // LinkedList: every slot this tutor has ever published, in order
    protected LinkedList<Session> history = new LinkedList<>();

    public Tutor(String id, String name, double rating, double hourlyRate) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.hourlyRate = hourlyRate;
    }

    // seats-per-slot and label differ by tutor type -> each subclass fills these
    public abstract int capacity();
    public abstract String getType();

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getRating() {
        return rating;
    }

    public double getHourlyRate() {
        return hourlyRate;
    }

    public ArrayList<Subject> getExpertise() {
        return expertise;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setHourlyRate(double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public void addSubject(Subject subject) {

        if (!teaches(subject)) {
            expertise.add(subject);
        }
    }

    public boolean teaches(Subject subject) {

        for (Subject s : expertise) {
            if (s.getCode().equals(subject.getCode())) {
                return true;
            }
        }

        return false;
    }

    protected boolean overlapsAny(LocalDateTime start, int durationMinutes) {

        for (Session s : schedule.values()) {

            if (s.getStatus() == Session.Status.CANCELLED) {
                continue;
            }

            if (s.overlaps(start, durationMinutes)) {
                return true;
            }
        }

        return false;
    }

    @Override
    public boolean isAvailableAt(LocalDateTime start, int durationMinutes) {
        return !overlapsAny(start, durationMinutes);
    }

    // publish one empty slot. capacity() is polymorphic, so the SAME code
    // makes a 1-seat slot for an individual tutor and an N-seat slot for a group
    public Session publishSlot(Subject subject, LocalDateTime start, int slotMinutes)
            throws InvalidSessionException, DoubleBookingException {

        if (subject == null || start == null) {
            throw new InvalidSessionException("Subject and start time are required.");
        }

        if (!teaches(subject)) {
            throw new InvalidSessionException(name + " does not teach " + subject.getName() + ".");
        }

        if (start.isBefore(LocalDateTime.now())) {
            throw new InvalidSessionException("Cannot publish a slot in the past.");
        }

        if (slotMinutes <= 0 || slotMinutes > 240) {
            throw new InvalidSessionException("Slot length must be between 1 and 240 minutes.");
        }

        if (overlapsAny(start, slotMinutes)) {
            throw new DoubleBookingException(
                    name + " already has a slot overlapping " + start + ".");
        }

        String prefix = getType().equals("Group") ? "G-" : "S-";
        Session slot = new Session(prefix + UUID.randomUUID().toString().substring(0, 8),
                this, subject, start, slotMinutes);

        schedule.put(start, slot);
        history.addLast(slot);
        return slot;
    }

    // used when loading saved slots back from file
    public void restoreSession(Session session) {
        schedule.put(session.getStart(), session);
        history.addLast(session);
    }

    public TreeMap<LocalDateTime, Session> getSchedule() {
        return schedule;
    }

    public LinkedList<Session> getHistory() {
        return history;
    }

    @Override
    public String toString() {
        return name + " [" + id + "] - " + getType()
                + ", " + String.format("%.1f", rating)
                + " star, Rs." + String.format("%.0f", hourlyRate) + "/hr";
    }
}
