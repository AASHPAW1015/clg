class GroupTutor extends Tutor {

    private int maxGroupSize;

    public GroupTutor(String id, String name, double rating,
                      double hourlyRate, int maxGroupSize) {

        super(id, name, rating, hourlyRate);
        this.maxGroupSize = maxGroupSize;
    }

    @Override
    public int capacity() {
        return maxGroupSize;   // batch: N seats per slot
    }

    @Override
    public String getType() {
        return "Group";
    }
}
