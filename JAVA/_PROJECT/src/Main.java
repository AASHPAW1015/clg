import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import javax.swing.SwingUtilities;

// Online Tutor Booking & Scheduling System  (Java Case Study 80) - v1
// Ashutosh Pawar | Roll 150096725130 | Cohort Sam Altman
public class Main {

    public static void main(String[] args) {

        BookingService service = new BookingService();

        service.loadFromFile();

        if (service.getAllTutors().isEmpty()) {
            seed(service);
        }

        SwingUtilities.invokeLater(() -> new TutorBookingGUI(service));
    }

    private static void seed(BookingService service) {

        Subject math = new Subject("MTH", "Mathematics");
        Subject phy = new Subject("PHY", "Physics");
        Subject cs = new Subject("CS", "ComputerSci");
        Subject eng = new Subject("ENG", "English");

        service.addSubject(math);
        service.addSubject(phy);
        service.addSubject(cs);
        service.addSubject(eng);

        IndividualTutor t1 = new IndividualTutor("T01", "Dr Rao", 4.6, 800);
        t1.addSubject(math);
        t1.addSubject(phy);

        IndividualTutor t2 = new IndividualTutor("T02", "Meera Nair", 4.2, 600);
        t2.addSubject(cs);
        t2.addSubject(math);

        GroupTutor t3 = new GroupTutor("T03", "Arjun Mehta", 4.8, 400, 5);
        t3.addSubject(phy);
        t3.addSubject(cs);

        GroupTutor t4 = new GroupTutor("T04", "Sana Khan", 4.0, 350, 4);
        t4.addSubject(eng);

        service.registerTutor(t1);
        service.registerTutor(t2);
        service.registerTutor(t3);
        service.registerTutor(t4);

        Student s1 = new Student("ST01", "Ravi", "ravi@uni.edu");
        Student s2 = new Student("ST02", "Ananya", "ananya@uni.edu");
        Student s3 = new Student("ST03", "Kabir", "kabir@uni.edu");

        service.registerStudent(s1);
        service.registerStudent(s2);
        service.registerStudent(s3);

        LocalDate day = LocalDate.now().plusDays(1);

        try {
            // Dr Rao (1-on-1) publishes 12:00-14:00 as 60-min slots -> two 1-seat slots
            service.publishAvailability("T01", math,
                    LocalDateTime.of(day, LocalTime.of(12, 0)),
                    LocalDateTime.of(day, LocalTime.of(14, 0)), 60);

            // Arjun (group, 5 seats) publishes 10:00-12:00 as 60-min slots -> two 5-seat slots
            service.publishAvailability("T03", phy,
                    LocalDateTime.of(day, LocalTime.of(10, 0)),
                    LocalDateTime.of(day, LocalTime.of(12, 0)), 60);

            // a couple of sample bookings into the first open slots
            java.util.ArrayList<Session> rao = service.availableSlotsByTutor("T01");
            java.util.ArrayList<Session> arjun = service.availableSlotsByTutor("T03");

            if (!rao.isEmpty()) {
                service.bookIntoSlot(rao.get(0).getSessionId(), s1);
            }
            if (!arjun.isEmpty()) {
                service.bookIntoSlot(arjun.get(0).getSessionId(), s2);
                service.bookIntoSlot(arjun.get(0).getSessionId(), s3);  // same group slot
            }

        } catch (InvalidSessionException | DoubleBookingException e) {
            System.out.println("Seed skipped: " + e.getMessage());
        }
    }
}
