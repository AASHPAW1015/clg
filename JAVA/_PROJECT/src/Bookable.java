import java.time.LocalDateTime;

// the booking contract every kind of tutor must fulfil
interface Bookable {

    // seats per slot: 1 for a 1-on-1 tutor, N for a group tutor
    int capacity();

    // free to hold a slot over this window (no clash with existing slots)
    boolean isAvailableAt(LocalDateTime start, int durationMinutes);
}
