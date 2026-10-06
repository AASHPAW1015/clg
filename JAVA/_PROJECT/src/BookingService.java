import java.io.File;
import java.io.FileWriter;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

// the manager: owns the data and exposes every operation the GUI calls
class BookingService {

    // ArrayList: the primary stores
    private ArrayList<Tutor> tutors = new ArrayList<>();
    private ArrayList<Student> students = new ArrayList<>();
    private ArrayList<Subject> subjects = new ArrayList<>();
    private ArrayList<Session> allSessions = new ArrayList<>();   // published slots

    // HashMap: jump straight to a tutor by id
    private HashMap<String, Tutor> tutorIndex = new HashMap<>();

    // ============================================================
    // SUBJECTS
    // ============================================================

    public void addSubject(Subject subject) {

        if (findSubject(subject.getCode()) == null) {
            subjects.add(subject);
        }
    }

    public Subject findSubject(String code) {

        for (Subject s : subjects) {
            if (s.getCode().equalsIgnoreCase(code)) {
                return s;
            }
        }

        return null;
    }

    public ArrayList<Subject> getAllSubjects() {
        return subjects;
    }

    // ============================================================
    // STUDENTS
    // ============================================================

    public boolean registerStudent(Student student) {

        if (findStudent(student.getId()) != null) {
            return false;
        }

        students.add(student);
        return true;
    }

    public Student findStudent(String id) {

        for (Student s : students) {
            if (s.getId().equals(id)) {
                return s;
            }
        }

        return null;
    }

    public ArrayList<Student> getAllStudents() {
        return students;
    }

    // ============================================================
    // TUTORS - CRUD
    // ============================================================

    public boolean registerTutor(Tutor tutor) {

        if (tutorIndex.containsKey(tutor.getId())) {
            return false;
        }

        tutors.add(tutor);
        tutorIndex.put(tutor.getId(), tutor);
        return true;
    }

    public Tutor getTutor(String id) {
        return tutorIndex.get(id);
    }

    public ArrayList<Tutor> getAllTutors() {
        return tutors;
    }

    public boolean updateTutor(String id, String newName, double newRate) {

        Tutor tutor = getTutor(id);

        if (tutor == null) {
            return false;
        }

        if (newName != null && !newName.isEmpty()) {
            tutor.setName(newName);
        }

        tutor.setHourlyRate(newRate);
        return true;
    }

    public boolean removeTutor(String id) {

        Tutor tutor = tutorIndex.remove(id);

        if (tutor == null) {
            return false;
        }

        tutors.remove(tutor);

        // drop that tutor's slots too, so nothing dangles
        allSessions.removeIf(s -> s.getTutor().getId().equals(id));
        return true;
    }

    // ============================================================
    // PUBLISH AVAILABILITY  (tutor side)
    // ============================================================
    // Split the window [windowStart, windowEnd) into back-to-back slots of
    // slotMinutes. Each slot's capacity comes from the tutor type. A slot that
    // would clash with one already published is skipped, so re-publishing just
    // fills the gaps.

    public int publishAvailability(String tutorId, Subject subject,
                                   LocalDateTime windowStart, LocalDateTime windowEnd,
                                   int slotMinutes)
            throws InvalidSessionException, DoubleBookingException {

        Tutor tutor = getTutor(tutorId);

        if (tutor == null) {
            throw new InvalidSessionException("Unknown tutor id: " + tutorId);
        }

        if (subject == null) {
            throw new InvalidSessionException("Subject is required.");
        }

        if (!windowStart.isBefore(windowEnd)) {
            throw new InvalidSessionException("Start time must be before end time.");
        }

        if (slotMinutes <= 0) {
            throw new InvalidSessionException("Slot length must be positive.");
        }

        int created = 0;
        LocalDateTime cursor = windowStart;

        while (!cursor.plusMinutes(slotMinutes).isAfter(windowEnd)) {

            if (tutor.isAvailableAt(cursor, slotMinutes)) {
                Session slot = tutor.publishSlot(subject, cursor, slotMinutes);
                allSessions.add(slot);
                created = created + 1;
            }

            cursor = cursor.plusMinutes(slotMinutes);
        }

        return created;
    }

    // ============================================================
    // BOOK INTO A SLOT  (student side)
    // ============================================================

    public Session bookIntoSlot(String sessionId, Student student)
            throws InvalidSessionException, DoubleBookingException {

        Session slot = getSession(sessionId);

        if (slot == null) {
            throw new InvalidSessionException("No such slot: " + sessionId);
        }

        if (student == null) {
            throw new InvalidSessionException("Student is required.");
        }

        if (slot.getStatus() != Session.Status.BOOKED) {
            throw new InvalidSessionException("That slot is not open for booking.");
        }

        if (slot.getParticipants().contains(student)) {
            throw new InvalidSessionException(student.getName() + " is already in that slot.");
        }

        if (slot.isFull()) {
            throw new DoubleBookingException(
                    "That slot is full (" + slot.getTutor().capacity() + " seats).");
        }

        slot.addParticipant(student);
        student.addToHistory(slot);
        return slot;
    }

    // open slots (bookable, has a seat), for the booking page
    public ArrayList<Session> availableSlots() {

        ArrayList<Session> result = new ArrayList<>();

        for (Session s : allSessions) {
            if (s.isAvailable()) {
                result.add(s);
            }
        }

        return result;
    }

    public ArrayList<Session> availableSlotsBySubject(Subject subject) {

        ArrayList<Session> result = new ArrayList<>();

        for (Session s : allSessions) {
            if (s.isAvailable() && s.getSubject().getCode().equals(subject.getCode())) {
                result.add(s);
            }
        }

        return result;
    }

    public ArrayList<Session> availableSlotsByTutor(String tutorId) {

        ArrayList<Session> result = new ArrayList<>();

        for (Session s : allSessions) {
            if (s.isAvailable() && s.getTutor().getId().equals(tutorId)) {
                result.add(s);
            }
        }

        return result;
    }

    // ============================================================
    // SESSION LIFECYCLE + FEEDBACK
    // ============================================================

    public Session getSession(String sessionId) {

        for (Session s : allSessions) {
            if (s.getSessionId().equals(sessionId)) {
                return s;
            }
        }

        return null;
    }

    public void completeSession(String sessionId) throws InvalidSessionException {

        Session session = getSession(sessionId);

        if (session == null) {
            throw new InvalidSessionException("No session " + sessionId);
        }

        if (session.getStatus() != Session.Status.BOOKED) {
            throw new InvalidSessionException("Only a booked slot can be completed.");
        }

        if (session.getParticipants().isEmpty()) {
            throw new InvalidSessionException("Nobody booked this slot.");
        }

        session.setStatus(Session.Status.COMPLETED);
    }

    public void cancelSession(String sessionId) throws InvalidSessionException {

        Session session = getSession(sessionId);

        if (session == null) {
            throw new InvalidSessionException("No session " + sessionId);
        }

        session.setStatus(Session.Status.CANCELLED);
    }

    public void recordFeedback(String sessionId, String studentId,
                               int rating, String comment)
            throws InvalidSessionException {

        Session session = getSession(sessionId);

        if (session == null) {
            throw new InvalidSessionException("No session " + sessionId);
        }

        if (session.getStatus() != Session.Status.COMPLETED) {
            throw new InvalidSessionException("Feedback only after the session is completed.");
        }

        session.addFeedback(new Feedback(studentId, rating, comment));
        refreshTutorRating(session.getTutor());
    }

    private void refreshTutorRating(Tutor tutor) {

        int total = 0;
        int count = 0;

        for (Session s : tutor.getHistory()) {
            for (Feedback f : s.getFeedback()) {
                total = total + f.getRating();
                count = count + 1;
            }
        }

        if (count > 0) {
            tutor.setRating((double) total / count);
        }
    }

    // ============================================================
    // SEARCHING (linear scan)
    // ============================================================

    public ArrayList<Tutor> searchByName(String query) {

        ArrayList<Tutor> result = new ArrayList<>();
        String q = query.toLowerCase();

        for (Tutor t : tutors) {
            if (t.getName().toLowerCase().contains(q)) {
                result.add(t);
            }
        }

        return result;
    }

    public ArrayList<Tutor> searchBySubject(Subject subject) {

        ArrayList<Tutor> result = new ArrayList<>();

        for (Tutor t : tutors) {
            if (t.teaches(subject)) {
                result.add(t);
            }
        }

        return result;
    }

    public ArrayList<Session> sessionsOf(String tutorId) {

        ArrayList<Session> result = new ArrayList<>();

        for (Session s : allSessions) {
            if (s.getTutor().getId().equals(tutorId)) {
                result.add(s);
            }
        }

        return result;
    }

    // ============================================================
    // SORTING (Comparator)
    // ============================================================

    public ArrayList<Tutor> sortByRating() {

        ArrayList<Tutor> list = new ArrayList<>(tutors);
        list.sort((a, b) -> Double.compare(b.getRating(), a.getRating()));
        return list;
    }

    public ArrayList<Tutor> sortByPrice() {

        ArrayList<Tutor> list = new ArrayList<>(tutors);
        list.sort((a, b) -> Double.compare(a.getHourlyRate(), b.getHourlyRate()));
        return list;
    }

    public ArrayList<Tutor> sortByAvailability() {

        ArrayList<Tutor> list = new ArrayList<>(tutors);
        list.sort((a, b) -> Integer.compare(openSlots(b), openSlots(a)));  // most open first
        return list;
    }

    private int openSlots(Tutor tutor) {

        int count = 0;

        for (Session s : tutor.getSchedule().values()) {
            if (s.isAvailable()) {
                count = count + 1;
            }
        }

        return count;
    }

    // ============================================================
    // DISPLAY TABLES + REPORT
    // ============================================================

    public ArrayList<Session> getAllSessions() {
        return allSessions;
    }

    public String bookingReport() {

        String result = "=============== BOOKING REPORT ===============\n";
        result = result + "Tutors: " + tutors.size()
                + " | Students: " + students.size()
                + " | Slots: " + allSessions.size() + "\n\n";

        double totalRevenue = 0;

        for (Tutor t : tutors) {

            ArrayList<Session> ss = sessionsOf(t.getId());
            int completed = 0;
            int seatsBooked = 0;
            double revenue = 0;

            for (Session s : ss) {

                seatsBooked = seatsBooked + s.getParticipants().size();

                if (s.getStatus() == Session.Status.COMPLETED) {
                    completed = completed + 1;
                    double hours = s.getDurationMinutes() / 60.0;
                    revenue = revenue + t.getHourlyRate() * hours * s.getParticipants().size();
                }
            }

            totalRevenue = totalRevenue + revenue;

            result = result + String.format(
                    "%-16s (%-10s) rating %.1f | slots: %d  completed: %d  seats booked: %d  revenue: Rs.%.0f\n",
                    t.getName(), t.getType(), t.getRating(),
                    ss.size(), completed, seatsBooked, revenue);
        }

        result = result + "-".repeat(70) + "\n";
        result = result + String.format("TOTAL REVENUE (completed): Rs.%.0f\n", totalRevenue);

        return result;
    }

    // ============================================================
    // FILE HANDLING  (CSV, one file per entity)
    // ============================================================

    public void saveToFile() {

        writeSubjects();
        writeStudents();
        writeTutors();
        writeSessions();
        writeFeedback();
    }

    public void loadFromFile() {

        readSubjects();
        readStudents();
        readTutors();
        readSessions();
        readFeedback();
    }

    private void writeSubjects() {

        try (FileWriter writer = new FileWriter("subjects.csv")) {
            for (Subject s : subjects) {
                writer.write(s.getCode() + "," + s.getName() + "\n");
            }
        } catch (IOException e) {
            System.out.println("Error writing subjects file.");
        }
    }

    private void readSubjects() {

        try (Scanner sc = new Scanner(new File("subjects.csv"))) {
            while (sc.hasNextLine()) {
                String[] parts = sc.nextLine().split(",");
                if (parts.length != 2) {
                    continue;
                }
                addSubject(new Subject(parts[0], parts[1]));
            }
        } catch (FileNotFoundException e) {
            // first run
        }
    }

    private void writeStudents() {

        try (FileWriter writer = new FileWriter("students.csv")) {
            for (Student s : students) {
                writer.write(s.getId() + "," + s.getName() + "," + s.getEmail() + "\n");
            }
        } catch (IOException e) {
            System.out.println("Error writing students file.");
        }
    }

    private void readStudents() {

        try (Scanner sc = new Scanner(new File("students.csv"))) {
            while (sc.hasNextLine()) {
                String[] parts = sc.nextLine().split(",");
                if (parts.length != 3) {
                    continue;
                }
                registerStudent(new Student(parts[0], parts[1], parts[2]));
            }
        } catch (FileNotFoundException e) {
            // first run
        }
    }

    private void writeTutors() {

        try (FileWriter writer = new FileWriter("tutors.csv")) {

            for (Tutor t : tutors) {

                String subs = "";

                for (Subject s : t.getExpertise()) {
                    if (!subs.isEmpty()) {
                        subs = subs + ";";
                    }
                    subs = subs + s.getCode();
                }

                // type,id,name,rating,fee,groupSize,subjectCodes(; separated)
                writer.write(t.getType() + "," + t.getId() + "," + t.getName() + ","
                        + t.getRating() + "," + t.getHourlyRate() + ","
                        + t.capacity() + "," + subs + "\n");
            }

        } catch (IOException e) {
            System.out.println("Error writing tutors file.");
        }
    }

    private void readTutors() {

        try (Scanner sc = new Scanner(new File("tutors.csv"))) {

            while (sc.hasNextLine()) {

                String line = sc.nextLine();
                String[] parts = line.split(",");

                if (parts.length < 6) {
                    continue;
                }

                try {

                    String type = parts[0];
                    String id = parts[1];
                    String name = parts[2];
                    double rating = Double.parseDouble(parts[3]);
                    double fee = Double.parseDouble(parts[4]);
                    int groupSize = Integer.parseInt(parts[5]);

                    Tutor tutor;

                    if (type.equals("Group")) {
                        tutor = new GroupTutor(id, name, rating, fee, groupSize);
                    } else {
                        tutor = new IndividualTutor(id, name, rating, fee);
                    }

                    if (parts.length >= 7 && !parts[6].isEmpty()) {
                        for (String code : parts[6].split(";")) {
                            Subject subject = findSubject(code);
                            if (subject != null) {
                                tutor.addSubject(subject);
                            }
                        }
                    }

                    registerTutor(tutor);

                } catch (NumberFormatException e) {
                    System.out.println("Skipped bad tutor line: " + line);
                }
            }

        } catch (FileNotFoundException e) {
            // first run
        }
    }

    private void writeSessions() {

        try (FileWriter writer = new FileWriter("sessions.csv")) {

            for (Session s : allSessions) {

                String ids = "";

                for (Student st : s.getParticipants()) {
                    if (!ids.isEmpty()) {
                        ids = ids + ";";
                    }
                    ids = ids + st.getId();
                }

                // sessionId,tutorId,subjectCode,start,duration,status,studentIds
                writer.write(s.getSessionId() + "," + s.getTutor().getId() + ","
                        + s.getSubject().getCode() + "," + s.getStart() + ","
                        + s.getDurationMinutes() + "," + s.getStatus() + ","
                        + ids + "\n");
            }

        } catch (IOException e) {
            System.out.println("Error writing sessions file.");
        }
    }

    private void readSessions() {

        try (Scanner sc = new Scanner(new File("sessions.csv"))) {

            while (sc.hasNextLine()) {

                String line = sc.nextLine();
                String[] parts = line.split(",");

                if (parts.length < 6) {
                    continue;
                }

                try {

                    String sessionId = parts[0];
                    Tutor tutor = getTutor(parts[1]);
                    Subject subject = findSubject(parts[2]);
                    LocalDateTime start = LocalDateTime.parse(parts[3]);
                    int duration = Integer.parseInt(parts[4]);
                    Session.Status status = Session.Status.valueOf(parts[5]);

                    if (tutor == null || subject == null) {
                        continue;
                    }

                    Session session = new Session(sessionId, tutor, subject, start, duration);
                    session.setStatus(status);

                    if (parts.length >= 7 && !parts[6].isEmpty()) {
                        for (String sid : parts[6].split(";")) {
                            Student student = findStudent(sid);
                            if (student != null) {
                                session.addParticipant(student);
                                student.addToHistory(session);
                            }
                        }
                    }

                    tutor.restoreSession(session);
                    allSessions.add(session);

                } catch (Exception e) {
                    System.out.println("Skipped bad session line: " + line);
                }
            }

        } catch (FileNotFoundException e) {
            // first run
        }
    }

    private void writeFeedback() {

        try (FileWriter writer = new FileWriter("feedback.csv")) {
            for (Session s : allSessions) {
                for (Feedback f : s.getFeedback()) {
                    writer.write(s.getSessionId() + "," + f.getStudentId() + ","
                            + f.getRating() + "," + f.getComment() + "\n");
                }
            }
        } catch (IOException e) {
            System.out.println("Error writing feedback file.");
        }
    }

    private void readFeedback() {

        try (Scanner sc = new Scanner(new File("feedback.csv"))) {

            while (sc.hasNextLine()) {

                String line = sc.nextLine();
                String[] parts = line.split(",", 4);

                if (parts.length < 3) {
                    continue;
                }

                try {

                    Session session = getSession(parts[0]);

                    if (session == null) {
                        continue;
                    }

                    String comment = "";

                    if (parts.length == 4) {
                        comment = parts[3];
                    }

                    session.addFeedback(new Feedback(parts[1],
                            Integer.parseInt(parts[2]), comment));

                    refreshTutorRating(session.getTutor());

                } catch (NumberFormatException e) {
                    System.out.println("Skipped bad feedback line: " + line);
                }
            }

        } catch (FileNotFoundException e) {
            // first run
        }
    }
}
