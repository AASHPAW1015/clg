import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

// a published slot. starts empty; students book into it up to the tutor's capacity
class Session {

    enum Status { BOOKED, COMPLETED, CANCELLED }

    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private String sessionId;
    private Tutor tutor;
    private Subject subject;
    private LocalDateTime start;
    private int durationMinutes;

    private ArrayList<Student> participants = new ArrayList<>();
    private ArrayList<Feedback> feedbackList = new ArrayList<>();

    private Status status = Status.BOOKED;

    public Session(String sessionId, Tutor tutor, Subject subject,
                   LocalDateTime start, int durationMinutes) {

        this.sessionId = sessionId;
        this.tutor = tutor;
        this.subject = subject;
        this.start = start;
        this.durationMinutes = durationMinutes;
    }

    public String getSessionId() {
        return sessionId;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public Subject getSubject() {
        return subject;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public LocalDateTime getEnd() {
        return start.plusMinutes(durationMinutes);
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public ArrayList<Student> getParticipants() {
        return participants;
    }

    public void addParticipant(Student student) {
        participants.add(student);
    }

    public ArrayList<Feedback> getFeedback() {
        return feedbackList;
    }

    public void addFeedback(Feedback feedback) {
        feedbackList.add(feedback);
    }

    // capacity comes from the tutor: 1 for individual, N for group
    public boolean isFull() {
        return participants.size() >= tutor.capacity();
    }

    public int seatsLeft() {
        return tutor.capacity() - participants.size();
    }

    // an open slot: still bookable and has a free seat
    public boolean isAvailable() {
        return status == Status.BOOKED && !isFull();
    }

    // used to stop a tutor publishing two slots that clash
    public boolean overlaps(LocalDateTime otherStart, int otherDuration) {

        LocalDateTime otherEnd = otherStart.plusMinutes(otherDuration);

        return start.isBefore(otherEnd) && otherStart.isBefore(getEnd());
    }

    public double averageRating() {

        if (feedbackList.isEmpty()) {
            return 0.0;
        }

        int total = 0;

        for (Feedback f : feedbackList) {
            total = total + f.getRating();
        }

        return (double) total / feedbackList.size();
    }

    public String getStartText() {
        return start.format(FMT);
    }

    @Override
    public String toString() {
        return sessionId + " | " + tutor.getName() + " | " + subject.getName()
                + " | " + getStartText() + " | " + durationMinutes + " min | "
                + status + " | " + participants.size() + "/" + tutor.capacity();
    }
}
