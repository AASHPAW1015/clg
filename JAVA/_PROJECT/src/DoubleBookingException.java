// custom checked exception for a clashing booking
class DoubleBookingException extends Exception {

    public DoubleBookingException(String message) {
        super(message);
    }
}
