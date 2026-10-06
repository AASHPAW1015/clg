class IndividualTutor extends Tutor {

    public IndividualTutor(String id, String name, double rating, double hourlyRate) {
        super(id, name, rating, hourlyRate);
    }

    @Override
    public int capacity() {
        return 1;   // 1-on-1: one seat per slot
    }

    @Override
    public String getType() {
        return "Individual";
    }
}
