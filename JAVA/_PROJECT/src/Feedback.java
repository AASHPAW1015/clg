class Feedback {

    private String studentId;
    private int rating;
    private String comment;

    public Feedback(String studentId, int rating, String comment) {
        this.studentId = studentId;
        this.rating = rating;
        this.comment = comment;
    }

    public String getStudentId() {
        return studentId;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    @Override
    public String toString() {
        return rating + "/5 - " + comment + " (by " + studentId + ")";
    }
}
