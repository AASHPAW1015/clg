import java.awt.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;

class TutorBookingGUI extends JFrame {

    private BookingService service;

    private CardLayout cards = new CardLayout();
    private JPanel cardPanel = new JPanel(cards);

    // tutors page
    private DefaultTableModel tutorsModel;
    private JTable tutorsTable;
    private JTextField tfId, tfName, tfRating, tfFee, tfGroup, tfSubjects;
    private JComboBox<String> tfType;
    private JTextField searchField;
    private JComboBox<Subject> searchSubjectCombo;
    private JComboBox<String> sortCombo;

    // students page
    private DefaultTableModel studentsModel;
    private JTextField sfId, sfName, sfEmail;

    // publish page
    private JComboBox<Tutor> pubTutorCombo;
    private JComboBox<Subject> pubSubjectCombo;
    private JTextField pubDate, startH, startM, endH, endM;
    private JComboBox<String> startAmPm, endAmPm;
    private JComboBox<Integer> slotLenCombo;

    // book page
    private DefaultTableModel slotsModel;
    private JTable slotsTable;
    private JComboBox<Student> bookStudentCombo;
    private JComboBox<Subject> bookSubjectFilter;
    private JComboBox<Tutor> bookTutorFilter;

    // sessions page
    private DefaultTableModel sessionsModel;
    private JTable sessionsTable;
    private JComboBox<Student> fbStudentCombo;
    private JComboBox<Integer> fbRatingCombo;
    private JTextField fbComment;

    // reports page
    private JTextArea reportArea;

    public TutorBookingGUI(BookingService service) {

        this.service = service;

        setTitle("Online Tutor Booking & Scheduling System");
        setSize(1120, 720);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        add(buildNav(), BorderLayout.NORTH);

        cardPanel.add(buildTutorsPage(), "tutors");
        cardPanel.add(buildStudentsPage(), "students");
        cardPanel.add(buildPublishPage(), "publish");
        cardPanel.add(buildBookPage(), "book");
        cardPanel.add(buildSessionsPage(), "sessions");
        cardPanel.add(buildReportsPage(), "reports");
        add(cardPanel, BorderLayout.CENTER);

        refreshCombos();
        refreshTutorsTable(service.getAllTutors());
        refreshStudentsTable();
        refreshSlotsTable(service.availableSlots());
        refreshSessionsTable();

        setVisible(true);
    }

    // ---------- navigation ----------

    private JPanel buildNav() {

        JPanel nav = new JPanel(new FlowLayout(FlowLayout.LEFT));

        String[][] pages = {
                {"Tutors", "tutors"}, {"Students", "students"},
                {"Publish Slots", "publish"}, {"Book", "book"},
                {"Sessions", "sessions"}, {"Reports", "reports"}
        };

        for (String[] p : pages) {
            JButton b = new JButton(p[0]);
            String key = p[1];
            b.addActionListener(e -> {
                refreshAll();
                cards.show(cardPanel, key);
            });
            nav.add(b);
        }

        return nav;
    }

    private JPanel page() {
        JPanel p = new JPanel(null);
        return p;
    }

    // ---------- tutors page ----------

    private JPanel buildTutorsPage() {

        JPanel p = page();

        UI.header(p, "Tutors", 20, 15);

        UI.label(p, "Tutor ID", 20, 50, 110);
        tfId = UI.field(p, 130, 50, 180);
        UI.label(p, "Name", 20, 80, 110);
        tfName = UI.field(p, 130, 80, 180);
        UI.label(p, "Rating (0-5)", 20, 110, 110);
        tfRating = UI.field(p, 130, 110, 180);
        UI.label(p, "Fee / hr", 20, 140, 110);
        tfFee = UI.field(p, 130, 140, 180);
        UI.label(p, "Type", 20, 170, 110);
        tfType = UI.combo(p, new String[]{"Individual", "Group"}, 130, 170, 180);
        UI.label(p, "Group Size", 20, 200, 110);
        tfGroup = UI.field(p, 130, 200, 180);
        tfGroup.setText("5");
        UI.label(p, "Subjects (eg MTH PHY)", 20, 230, 180);
        tfSubjects = UI.field(p, 200, 230, 110);

        UI.button(p, "Register", 20, 265, 90, e -> registerTutor());
        UI.button(p, "Update", 120, 265, 90, e -> updateTutor());
        UI.button(p, "Delete", 220, 265, 90, e -> deleteTutor());

        UI.label(p, "Name", 20, 310, 50);
        searchField = UI.field(p, 70, 310, 120);
        UI.button(p, "Search Name", 200, 309, 110, e ->
                refreshTutorsTable(service.searchByName(searchField.getText().trim())));

        searchSubjectCombo = UI.comboEmpty(p, 20, 345, 170);
        UI.button(p, "Search Subject", 200, 344, 110, e -> {
            Subject s = (Subject) searchSubjectCombo.getSelectedItem();
            if (s != null) {
                refreshTutorsTable(service.searchBySubject(s));
            }
        });

        sortCombo = UI.combo(p, new String[]{"Rating", "Price", "Availability"}, 20, 380, 170);
        UI.button(p, "Sort", 200, 379, 90, e -> sortTutors());
        UI.button(p, "Show All", 20, 415, 170, e -> refreshTutorsTable(service.getAllTutors()));

        tutorsModel = UI.model(new String[]{"ID", "Name", "Type", "Rating", "Fee", "Subjects"});
        tutorsTable = UI.table(p, tutorsModel, 340, 50, 740, 600);

        // click a row to load it into the form
        tutorsTable.getSelectionModel().addListSelectionListener(e -> {
            int row = tutorsTable.getSelectedRow();
            if (row >= 0) {
                tfId.setText(val(tutorsModel, row, 0));
                tfName.setText(val(tutorsModel, row, 1));
                tfRating.setText(val(tutorsModel, row, 3));
                tfFee.setText(val(tutorsModel, row, 4));
            }
        });

        return p;
    }

    // ---------- students page ----------

    private JPanel buildStudentsPage() {

        JPanel p = page();

        UI.header(p, "Students", 20, 15);

        UI.label(p, "Student ID", 20, 50, 110);
        sfId = UI.field(p, 130, 50, 180);
        UI.label(p, "Name", 20, 80, 110);
        sfName = UI.field(p, 130, 80, 180);
        UI.label(p, "Email", 20, 110, 110);
        sfEmail = UI.field(p, 130, 110, 180);

        UI.button(p, "Register Student", 20, 145, 180, e -> registerStudent());

        studentsModel = UI.model(new String[]{"ID", "Name", "Email"});
        UI.table(p, studentsModel, 340, 50, 740, 600);

        return p;
    }

    // ---------- publish page ----------

    private JPanel buildPublishPage() {

        JPanel p = page();

        UI.header(p, "Publish Availability  (splits the window into bookable slots)", 20, 15);

        UI.label(p, "Tutor", 20, 55, 110);
        pubTutorCombo = UI.comboEmpty(p, 130, 55, 240);
        UI.label(p, "Subject", 20, 90, 110);
        pubSubjectCombo = UI.comboEmpty(p, 130, 90, 240);

        UI.label(p, "Date (yyyy-MM-dd)", 20, 125, 140);
        pubDate = UI.field(p, 170, 125, 200);

        UI.label(p, "Start time", 20, 160, 110);
        startH = UI.field(p, 130, 160, 45);
        UI.label(p, ":", 180, 160, 10);
        startM = UI.field(p, 195, 160, 45);
        startAmPm = UI.combo(p, new String[]{"AM", "PM"}, 250, 160, 70);

        UI.label(p, "End time", 20, 195, 110);
        endH = UI.field(p, 130, 195, 45);
        UI.label(p, ":", 180, 195, 10);
        endM = UI.field(p, 195, 195, 45);
        endAmPm = UI.combo(p, new String[]{"AM", "PM"}, 250, 195, 70);

        UI.label(p, "Slot length (min)", 20, 230, 140);
        slotLenCombo = UI.combo(p, new Integer[]{30, 45, 60, 90}, 170, 230, 90);
        slotLenCombo.setSelectedItem(60);

        UI.button(p, "Publish Slots", 20, 270, 180, e -> publishSlots());

        // sensible defaults
        pubDate.setText(LocalDate.now().plusDays(1).toString());
        startH.setText("12"); startM.setText("00");
        endH.setText("4"); endM.setText("00"); endAmPm.setSelectedItem("PM");

        UI.label(p, "Tip: eg 12:00 PM to 4:00 PM with 60-min slots makes four 1-hour slots.",
                20, 320, 700);

        return p;
    }

    // ---------- book page ----------

    private JPanel buildBookPage() {

        JPanel p = page();

        UI.header(p, "Book an Open Slot", 20, 15);

        UI.label(p, "Student", 20, 50, 70);
        bookStudentCombo = UI.comboEmpty(p, 90, 50, 220);
        UI.button(p, "Book Selected Slot", 330, 49, 170, e -> bookSlot());

        UI.label(p, "Filter:", 20, 90, 50);
        bookSubjectFilter = UI.comboEmpty(p, 70, 90, 150);
        UI.button(p, "By Subject", 230, 89, 110, e -> {
            Subject s = (Subject) bookSubjectFilter.getSelectedItem();
            if (s != null) {
                refreshSlotsTable(service.availableSlotsBySubject(s));
            }
        });
        bookTutorFilter = UI.comboEmpty(p, 350, 90, 150);
        UI.button(p, "By Tutor", 510, 89, 110, e -> {
            Tutor t = (Tutor) bookTutorFilter.getSelectedItem();
            if (t != null) {
                refreshSlotsTable(service.availableSlotsByTutor(t.getId()));
            }
        });
        UI.button(p, "Show All Open", 630, 89, 130, e ->
                refreshSlotsTable(service.availableSlots()));

        slotsModel = UI.model(new String[]{"Slot ID", "Tutor", "Subject", "Start", "Min", "Seats Left", "Capacity"});
        slotsTable = UI.table(p, slotsModel, 20, 130, 1060, 520);

        return p;
    }

    // ---------- sessions page ----------

    private JPanel buildSessionsPage() {

        JPanel p = page();

        UI.header(p, "All Slots / Sessions", 20, 15);

        UI.button(p, "Complete", 20, 50, 110, e -> completeSession());
        UI.button(p, "Cancel", 140, 50, 110, e -> cancelSession());

        UI.label(p, "Feedback by", 280, 52, 90);
        fbStudentCombo = UI.comboEmpty(p, 370, 50, 160);
        UI.label(p, "Rating", 545, 52, 50);
        fbRatingCombo = UI.combo(p, new Integer[]{1, 2, 3, 4, 5}, 595, 50, 60);
        fbRatingCombo.setSelectedItem(5);
        UI.label(p, "Comment", 665, 52, 70);
        fbComment = UI.field(p, 735, 50, 180);
        UI.button(p, "Add Feedback", 925, 49, 140, e -> addFeedback());

        sessionsModel = UI.model(new String[]{"Slot ID", "Tutor", "Subject", "Start", "Min", "Status", "Seats", "Avg"});
        sessionsTable = UI.table(p, sessionsModel, 20, 90, 1060, 560);

        return p;
    }

    // ---------- reports page ----------

    private JPanel buildReportsPage() {

        JPanel p = page();

        UI.header(p, "Reports / Files", 20, 15);

        UI.button(p, "Generate Report", 20, 50, 160, e -> {
            reportArea.setText(service.bookingReport());
        });
        UI.button(p, "Save File", 190, 50, 120, e -> {
            service.saveToFile();
            JOptionPane.showMessageDialog(this, "Saved to csv files in the project folder.");
        });
        UI.button(p, "Load File", 320, 50, 120, e -> {
            service.loadFromFile();
            refreshAll();
            JOptionPane.showMessageDialog(this, "Loaded from csv files.");
        });

        reportArea = new JTextArea();
        reportArea.setFont(new Font("Monospaced", Font.PLAIN, 13));
        reportArea.setEditable(false);
        JScrollPane sp = new JScrollPane(reportArea);
        sp.setBounds(20, 90, 1060, 560);
        p.add(sp);

        return p;
    }

    // ---------- refresh ----------

    private void refreshAll() {
        refreshCombos();
        refreshTutorsTable(service.getAllTutors());
        refreshStudentsTable();
        refreshSlotsTable(service.availableSlots());
        refreshSessionsTable();
    }

    private void refreshCombos() {

        fill(pubTutorCombo, service.getAllTutors().toArray(new Tutor[0]));
        fill(bookTutorFilter, service.getAllTutors().toArray(new Tutor[0]));
        fill(pubSubjectCombo, service.getAllSubjects().toArray(new Subject[0]));
        fill(searchSubjectCombo, service.getAllSubjects().toArray(new Subject[0]));
        fill(bookSubjectFilter, service.getAllSubjects().toArray(new Subject[0]));
        fill(bookStudentCombo, service.getAllStudents().toArray(new Student[0]));
        fill(fbStudentCombo, service.getAllStudents().toArray(new Student[0]));
    }

    private <T> void fill(JComboBox<T> combo, T[] items) {
        if (combo == null) {
            return;
        }
        combo.removeAllItems();
        for (T item : items) {
            combo.addItem(item);
        }
    }

    private void refreshTutorsTable(java.util.List<Tutor> list) {

        if (tutorsModel == null) {
            return;
        }

        tutorsModel.setRowCount(0);

        for (Tutor t : list) {

            String subs = "";
            for (Subject s : t.getExpertise()) {
                if (!subs.isEmpty()) {
                    subs = subs + ", ";
                }
                subs = subs + s.getCode();
            }

            tutorsModel.addRow(new Object[]{
                    t.getId(), t.getName(), t.getType(),
                    String.format("%.1f", t.getRating()),
                    String.format("%.0f", t.getHourlyRate()), subs
            });
        }
    }

    private void refreshStudentsTable() {

        if (studentsModel == null) {
            return;
        }

        studentsModel.setRowCount(0);

        for (Student s : service.getAllStudents()) {
            studentsModel.addRow(new Object[]{s.getId(), s.getName(), s.getEmail()});
        }
    }

    private void refreshSlotsTable(java.util.List<Session> list) {

        if (slotsModel == null) {
            return;
        }

        slotsModel.setRowCount(0);

        for (Session s : list) {
            slotsModel.addRow(new Object[]{
                    s.getSessionId(), s.getTutor().getName(), s.getSubject().getName(),
                    s.getStartText(), s.getDurationMinutes(),
                    s.seatsLeft(), s.getTutor().capacity()
            });
        }
    }

    private void refreshSessionsTable() {

        if (sessionsModel == null) {
            return;
        }

        sessionsModel.setRowCount(0);

        for (Session s : service.getAllSessions()) {
            sessionsModel.addRow(new Object[]{
                    s.getSessionId(), s.getTutor().getName(), s.getSubject().getName(),
                    s.getStartText(), s.getDurationMinutes(), s.getStatus(),
                    s.getParticipants().size() + "/" + s.getTutor().capacity(),
                    String.format("%.1f", s.averageRating())
            });
        }
    }

    // ---------- handlers ----------

    private void registerTutor() {

        try {

            String id = tfId.getText().trim();
            String name = tfName.getText().trim();

            if (id.isEmpty() || name.isEmpty()) {
                message("Tutor id and name are required.");
                return;
            }

            if (name.contains(",") || name.contains(";")) {
                message("Name cannot contain a comma or semicolon.");
                return;
            }

            double rating = Double.parseDouble(tfRating.getText().trim());
            double fee = Double.parseDouble(tfFee.getText().trim());

            if (fee < 0) {
                message("Fee cannot be negative.");
                return;
            }

            Tutor tutor;

            if (tfType.getSelectedItem().equals("Group")) {
                int gs = Integer.parseInt(tfGroup.getText().trim());
                if (gs < 2) {
                    message("Group size must be at least 2.");
                    return;
                }
                tutor = new GroupTutor(id, name, rating, fee, gs);
            } else {
                tutor = new IndividualTutor(id, name, rating, fee);
            }

            String subjectsText = tfSubjects.getText().trim();
            if (!subjectsText.isEmpty()) {
                for (String code : subjectsText.split("[ ,;]+")) {
                    Subject subject = service.findSubject(code);
                    if (subject == null) {
                        // unknown code -> create it so it isn't silently dropped
                        subject = new Subject(code.toUpperCase(), code.toUpperCase());
                        service.addSubject(subject);
                    }
                    tutor.addSubject(subject);
                }
            }

            if (service.registerTutor(tutor)) {
                refreshAll();
                message("Tutor " + id + " registered.");
            } else {
                message("Tutor id already exists.");
            }

        } catch (NumberFormatException ex) {
            message("Rating, fee and group size must be numbers.");
        }
    }

    private void updateTutor() {

        try {
            String id = tfId.getText().trim();
            String name = tfName.getText().trim();
            double fee = Double.parseDouble(tfFee.getText().trim());

            if (service.updateTutor(id, name, fee)) {
                refreshAll();
                message("Tutor " + id + " updated.");
            } else {
                message("No tutor with that id.");
            }
        } catch (NumberFormatException ex) {
            message("Fee must be a number.");
        }
    }

    private void deleteTutor() {

        String id = tfId.getText().trim();

        if (service.removeTutor(id)) {
            refreshAll();
            message("Tutor " + id + " deleted.");
        } else {
            message("No tutor with that id.");
        }
    }

    private void registerStudent() {

        String id = sfId.getText().trim();
        String name = sfName.getText().trim();
        String email = sfEmail.getText().trim();

        if (id.isEmpty() || name.isEmpty()) {
            message("Student id and name are required.");
            return;
        }

        if (name.contains(",") || email.contains(",")) {
            message("Name and email cannot contain commas.");
            return;
        }

        if (service.registerStudent(new Student(id, name, email))) {
            refreshAll();
            message("Student " + id + " registered.");
        } else {
            message("Student id already exists.");
        }
    }

    private void publishSlots() {

        Tutor tutor = (Tutor) pubTutorCombo.getSelectedItem();
        Subject subject = (Subject) pubSubjectCombo.getSelectedItem();

        if (tutor == null || subject == null) {
            message("Pick a tutor and subject.");
            return;
        }

        try {

            LocalDate date = LocalDate.parse(pubDate.getText().trim());
            LocalTime start = parse12h(startH, startM, startAmPm);
            LocalTime end = parse12h(endH, endM, endAmPm);

            LocalDateTime windowStart = LocalDateTime.of(date, start);
            LocalDateTime windowEnd = LocalDateTime.of(date, end);
            int slotLen = (Integer) slotLenCombo.getSelectedItem();

            int created = service.publishAvailability(tutor.getId(), subject,
                    windowStart, windowEnd, slotLen);

            refreshAll();
            message(created + " slot(s) published for " + tutor.getName() + ".");

        } catch (DateTimeParseException ex) {
            message("Date must be yyyy-MM-dd.");
        } catch (NumberFormatException ex) {
            message("Enter hour (1-12) and minute (0-59) as numbers.");
        } catch (DoubleBookingException ex) {
            message(ex.getMessage());
        } catch (InvalidSessionException ex) {
            message(ex.getMessage());
        }
    }

    private void bookSlot() {

        String slotId = selectedId(slotsTable, slotsModel);
        Student student = (Student) bookStudentCombo.getSelectedItem();

        if (slotId == null) {
            message("Select a slot in the table first.");
            return;
        }

        if (student == null) {
            message("Pick a student.");
            return;
        }

        try {
            Session slot = service.bookIntoSlot(slotId, student);
            refreshAll();
            message("Booked into " + slot.getSessionId()
                    + " (" + slot.getParticipants().size() + "/" + slot.getTutor().capacity() + ").");
        } catch (DoubleBookingException ex) {
            message("Full: " + ex.getMessage());
        } catch (InvalidSessionException ex) {
            message(ex.getMessage());
        }
    }

    private void completeSession() {

        String id = selectedId(sessionsTable, sessionsModel);

        if (id == null) {
            message("Select a session in the table.");
            return;
        }

        try {
            service.completeSession(id);
            refreshAll();
            message("Session completed.");
        } catch (InvalidSessionException ex) {
            message(ex.getMessage());
        }
    }

    private void cancelSession() {

        String id = selectedId(sessionsTable, sessionsModel);

        if (id == null) {
            message("Select a session in the table.");
            return;
        }

        try {
            service.cancelSession(id);
            refreshAll();
            message("Session cancelled.");
        } catch (InvalidSessionException ex) {
            message(ex.getMessage());
        }
    }

    private void addFeedback() {

        String id = selectedId(sessionsTable, sessionsModel);
        Student student = (Student) fbStudentCombo.getSelectedItem();

        if (id == null) {
            message("Select a session in the table.");
            return;
        }

        if (student == null) {
            message("Pick the reviewing student.");
            return;
        }

        String comment = fbComment.getText().trim();

        if (comment.contains(",")) {
            message("Comment cannot contain a comma.");
            return;
        }

        try {
            service.recordFeedback(id, student.getId(),
                    (Integer) fbRatingCombo.getSelectedItem(), comment);
            refreshAll();
            message("Feedback recorded.");
        } catch (InvalidSessionException ex) {
            message(ex.getMessage());
        }
    }

    private void sortTutors() {

        String choice = (String) sortCombo.getSelectedItem();

        if (choice.equals("Rating")) {
            refreshTutorsTable(service.sortByRating());
        } else if (choice.equals("Price")) {
            refreshTutorsTable(service.sortByPrice());
        } else {
            refreshTutorsTable(service.sortByAvailability());
        }
    }

    // ---------- small helpers ----------

    private LocalTime parse12h(JTextField hourF, JTextField minF, JComboBox<String> ampm) {

        int h = Integer.parseInt(hourF.getText().trim());
        int m = Integer.parseInt(minF.getText().trim());

        if (h < 1 || h > 12 || m < 0 || m > 59) {
            throw new NumberFormatException("out of range");
        }

        String ap = (String) ampm.getSelectedItem();

        if (ap.equals("AM")) {
            if (h == 12) {
                h = 0;            // 12 AM = 00:00
            }
        } else {
            if (h != 12) {
                h = h + 12;       // 1 PM = 13:00, but 12 PM stays 12:00
            }
        }

        return LocalTime.of(h, m);
    }

    private String selectedId(JTable table, DefaultTableModel model) {
        int row = table.getSelectedRow();
        if (row < 0) {
            return null;
        }
        return (String) model.getValueAt(row, 0);
    }

    private String val(DefaultTableModel model, int row, int col) {
        Object o = model.getValueAt(row, col);
        return o == null ? "" : o.toString();
    }

    private void message(String text) {
        JOptionPane.showMessageDialog(this, text);
    }
}
