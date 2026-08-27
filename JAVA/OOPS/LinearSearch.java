import javax.swing.*;

public class LinearSearch {
  public static void main(String[] args) {
    JFrame frame = new JFrame("Array Search Checker");

    JLabel arrayLabel = new JLabel("Array: ");
    JLabel targetLabel = new JLabel("Target: ");

    JTextField arrayTextField = new JTextField();
    JTextField targetTextField = new JTextField();

    JButton searchButton = new JButton("Search");
    JButton clearButton = new JButton("Clear");

    JTextArea outputArea = new JTextArea();
    outputArea.setEditable(false);

    arrayLabel.setBounds(40, 30, 80, 30);
    arrayTextField.setBounds(120, 30, 240, 30);

    targetLabel.setBounds(40, 80, 80, 30);
    targetTextField.setBounds(120, 80, 240, 30);

    searchButton.setBounds(80, 130, 110, 30);
    clearButton.setBounds(210, 130, 110, 30);

    outputArea.setBounds(40, 180, 320, 70);

    frame.add(arrayLabel);
    frame.add(arrayTextField);
    frame.add(targetLabel);
    frame.add(targetTextField);
    frame.add(searchButton);
    frame.add(clearButton);
    frame.add(outputArea);

    searchButton.addActionListener(e -> {
      String arrayInput = arrayTextField.getText().trim();
      String targetInput = targetTextField.getText().trim();

      if (arrayInput.isEmpty() || targetInput.isEmpty()) {
        outputArea.setText("Please enter both array elements and target.");
        return;
      }

      String[] elements = arrayInput.split("\\s+");
      int foundIndex = -1;

      for (int i = 0; i < elements.length; i++) {
        if (elements[i].equals(targetInput)) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex != -1) {
        outputArea.setText("Target found at Index: " + foundIndex + ", Position: " + (foundIndex + 1));
      } else {
        outputArea.setText("Target not found in the array.");
      }
    });

    clearButton.addActionListener(e -> {
      arrayTextField.setText("");
      targetTextField.setText("");
      outputArea.setText("");
    });

    frame.setSize(420, 310);
    frame.setLayout(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
