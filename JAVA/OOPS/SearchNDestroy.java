import javax.swing.*;
import java.awt.*;

/**
 * Basic array operations through a Swing GUI:
 * insert at a position, delete a position, update a position,
 * linear search, display, and clear.
 */
public class SearchNDestroy {

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new ArrayUI().setVisible(true));
    }
}

/**
 * Holds the array and every operation performed on it.
 *
 * A plain int[] of fixed capacity is used with a separate 'size' counter, so
 * inserting and deleting have to shift elements by hand - which is the whole
 * point of the exercise. Positions beyond 'size' are unused slots, not data.
 */
class ArrayStore {

    private static final int CAPACITY = 100;

    private int[] data = new int[CAPACITY];
    private int size = 0;

    /** Replaces the whole array with the supplied values. */
    public void setAll(int[] values) {
        if (values.length > CAPACITY) {
            throw new IllegalArgumentException("Array cannot hold more than " + CAPACITY + " elements.");
        }
        for (int i = 0; i < values.length; i++) {
            data[i] = values[i];
        }
        size = values.length;
    }

    public int getSize() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Inserts value at the given index, pushing everything from that index
     * onwards one slot to the right. An index equal to size appends at the end.
     */
    public void insert(int index, int value) {
        if (size == CAPACITY) {
            throw new IllegalArgumentException("Array is full.");
        }
        if (index < 0 || index > size) {
            throw new IllegalArgumentException("Index for insert must be between 0 and " + size + ".");
        }

        // Walk backwards from the end, otherwise each copy would overwrite the
        // element that has not been moved yet.
        for (int i = size; i > index; i--) {
            data[i] = data[i - 1];
        }

        data[index] = value;
        size++;
    }

    /**
     * Removes the element at the given index and pulls everything after it
     * one slot to the left. Returns the value that was removed.
     */
    public int delete(int index) {
        checkIndex(index);
        int removed = data[index];

        // Forwards this time, so each slot is filled from the one after it.
        for (int i = index; i < size - 1; i++) {
            data[i] = data[i + 1];
        }

        size--;
        return removed;
    }

    /** Overwrites the element at the given index. Returns the old value. */
    public int update(int index, int value) {
        checkIndex(index);
        int old = data[index];
        data[index] = value;
        return old;
    }

    /**
     * Linear search: checks each element from the start until it matches.
     * Returns the index of the first match, or -1 when the value is absent.
     */
    public int search(int value) {
        for (int i = 0; i < size; i++) {
            if (data[i] == value) {
                return i;
            }
        }
        return -1;
    }

    public void clear() {
        size = 0;
    }

    /** Builds the array as text, e.g. [10, 20, 30] */
    public String display() {
        if (size == 0) {
            return "[ ]  (empty)";
        }

        StringBuilder text = new StringBuilder("[");
        for (int i = 0; i < size; i++) {
            text.append(data[i]);
            if (i < size - 1) {
                text.append(", ");
            }
        }
        text.append("]  (size = ").append(size).append(")");
        return text.toString();
    }

    private void checkIndex(int index) {
        if (isEmpty()) {
            throw new IllegalArgumentException("The array is empty.");
        }
        if (index < 0 || index >= size) {
            throw new IllegalArgumentException("Index must be between 0 and " + (size - 1) + ".");
        }
    }
}

/**
 * The window. It reads the text fields, calls one ArrayStore method,
 * and reports the result - no array logic of its own.
 */
class ArrayUI extends JFrame {

    private ArrayStore store = new ArrayStore();

    private JTextField arrayField = new JTextField();
    private JTextField valueField = new JTextField();
    private JTextField indexField = new JTextField();
    private JTextArea outputArea = new JTextArea();

    public ArrayUI() {
        setTitle("Array Operations");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(700, 430);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout(8, 8));

        add(buildTopPanel(), BorderLayout.NORTH);

        outputArea.setEditable(false);
        outputArea.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 13));
        JScrollPane scroll = new JScrollPane(outputArea);
        scroll.setBorder(BorderFactory.createTitledBorder("Output"));
        add(scroll, BorderLayout.CENTER);

        log("Enter an array like  10, 20, 30  then press Set Array.");
    }

    private JPanel buildTopPanel() {
        JPanel fields = new JPanel(new GridLayout(3, 2, 6, 6));
        fields.add(new JLabel("Array (comma separated):"));
        fields.add(arrayField);
        fields.add(new JLabel("Value:"));
        fields.add(valueField);
        fields.add(new JLabel("Index (0-based):"));
        fields.add(indexField);

        JPanel buttons = new JPanel(new GridLayout(1, 7, 4, 4));
        buttons.add(makeButton("Set Array", e -> onSetArray()));
        buttons.add(makeButton("Insert", e -> onInsert()));
        buttons.add(makeButton("Delete", e -> onDelete()));
        buttons.add(makeButton("Update", e -> onUpdate()));
        buttons.add(makeButton("Search", e -> onSearch()));
        buttons.add(makeButton("Display", e -> onDisplay()));
        buttons.add(makeButton("Clear", e -> onClear()));

        JPanel top = new JPanel(new BorderLayout(6, 6));
        top.setBorder(BorderFactory.createEmptyBorder(8, 8, 0, 8));
        top.add(fields, BorderLayout.CENTER);
        top.add(buttons, BorderLayout.SOUTH);
        return top;
    }

    private JButton makeButton(String text, java.awt.event.ActionListener action) {
        JButton button = new JButton(text);
        button.addActionListener(action);
        return button;
    }

    private void onSetArray() {
        String text = arrayField.getText().trim();
        if (text.isEmpty()) {
            showError("Enter some numbers first.");
            return;
        }

        // Split on commas and/or spaces, so "1,2 3" is accepted too.
        String[] parts = text.split("[,\\s]+");
        int[] values = new int[parts.length];

        try {
            for (int i = 0; i < parts.length; i++) {
                values[i] = Integer.parseInt(parts[i]);
            }
            store.setAll(values);
        } catch (NumberFormatException ex) {
            showError("The array must contain whole numbers only.");
            return;
        } catch (IllegalArgumentException ex) {
            showError(ex.getMessage());
            return;
        }

        log("Array set.");
        logArray();
    }

    private void onInsert() {
        Integer value = readValue();
        Integer index = readIndex();
        if (value == null || index == null) {
            return;
        }

        try {
            store.insert(index, value);
        } catch (IllegalArgumentException ex) {
            showError(ex.getMessage());
            return;
        }

        log("Inserted " + value + " at index " + index + ".");
        logArray();
    }

    private void onDelete() {
        Integer index = readIndex();
        if (index == null) {
            return;
        }

        int removed;
        try {
            removed = store.delete(index);
        } catch (IllegalArgumentException ex) {
            showError(ex.getMessage());
            return;
        }

        log("Deleted " + removed + " from index " + index + ". Remaining elements shifted left.");
        logArray();
    }

    private void onUpdate() {
        Integer index = readIndex();
        Integer value = readValue();
        if (index == null || value == null) {
            return;
        }

        int old;
        try {
            old = store.update(index, value);
        } catch (IllegalArgumentException ex) {
            showError(ex.getMessage());
            return;
        }

        log("Index " + index + " changed from " + old + " to " + value + ".");
        logArray();
    }

    private void onSearch() {
        Integer value = readValue();
        if (value == null) {
            return;
        }
        if (store.isEmpty()) {
            showError("The array is empty.");
            return;
        }

        int index = store.search(value);
        if (index == -1) {
            log("Search: " + value + " was NOT found.");
        } else {
            // Index counts from 0, position counts from 1.
            log("Search: " + value + " was FOUND  ->  index " + index + ", position " + (index + 1) + ".");
        }
    }

    private void onDisplay() {
        logArray();
    }

    private void onClear() {
        store.clear();
        arrayField.setText("");
        valueField.setText("");
        indexField.setText("");
        outputArea.setText("");
        log("Array and all input fields cleared.");
    }

    /** Reads the value field, or shows an error and returns null. */
    private Integer readValue() {
        String text = valueField.getText().trim();
        if (text.isEmpty()) {
            showError("Enter a value.");
            return null;
        }
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException ex) {
            showError("The value must be a whole number.");
            return null;
        }
    }

    /** Reads the index field, or shows an error and returns null. */
    private Integer readIndex() {
        String text = indexField.getText().trim();
        if (text.isEmpty()) {
            showError("Enter an index.");
            return null;
        }
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException ex) {
            showError("The index must be a whole number.");
            return null;
        }
    }

    private void logArray() {
        log("Array: " + store.display());
    }

    private void log(String message) {
        outputArea.append(message + "\n");
        outputArea.setCaretPosition(outputArea.getDocument().getLength());
    }

    private void showError(String message) {
        JOptionPane.showMessageDialog(this, message, "Error", JOptionPane.ERROR_MESSAGE);
    }
}
