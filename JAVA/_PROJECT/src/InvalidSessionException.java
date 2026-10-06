// custom checked exception for an invalid booking request
class InvalidSessionException extends Exception {

    public InvalidSessionException(String message) {
        super(message);
    }
}
