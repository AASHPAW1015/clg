import javax.swing.*;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class BusBooking {

  static final int MAX_PASSENGERS = 5;
  static final int FARE_PER_JUMP = 100;
  static final String[] PLACES = {"Airoli", "Kharghar", "Mahalaxmi", "Prabhadevi", "Mulund"};

  public static void main(String[] args) {
    JFrame frame = new JFrame("Bus Reservation Booking");

    JLabel countLabel = new JLabel("Num of Passengers (max 5): ");
    JTextField countTextField = new JTextField();

    // one label + one text field per passenger, all made up front in a loop
    JLabel[] nameLabels = new JLabel[MAX_PASSENGERS];
    JTextField[] nameTextFields = new JTextField[MAX_PASSENGERS];

    for (int i = 0; i < MAX_PASSENGERS; i++) {
      nameLabels[i] = new JLabel("Name of Pass " + (i + 1) + ": ");
      nameTextFields[i] = new JTextField();

      nameLabels[i].setBounds(50, 90 + (i * 35), 160, 30);
      nameTextFields[i].setBounds(220, 90 + (i * 35), 220, 30);

      // hidden until the user types a passenger count
      nameLabels[i].setVisible(false);
      nameTextFields[i].setVisible(false);

      frame.add(nameLabels[i]);
      frame.add(nameTextFields[i]);
    }

    JLabel sourceLabel = new JLabel("Source: ");
    JComboBox<String> sourceComboBox = new JComboBox<>(PLACES);

    JLabel destLabel = new JLabel("Destination: ");
    JComboBox<String> destComboBox = new JComboBox<>(PLACES);

    JLabel fareLabel = new JLabel("Fare: ");
    JTextField fareTextField = new JTextField();
    fareTextField.setEditable(false);
    fareTextField.setToolTipText("Click to see the fare breakdown");
    fareTextField.setCursor(new Cursor(Cursor.HAND_CURSOR));

    JButton submitButton = new JButton("Submit");
    JButton resetButton = new JButton("Reset");

    // (x,y,width,height)
    countLabel.setBounds(50, 30, 200, 30);
    countTextField.setBounds(250, 30, 60, 30);

    sourceLabel.setBounds(50, 290, 160, 30);
    sourceComboBox.setBounds(220, 290, 220, 30);
    destLabel.setBounds(50, 330, 160, 30);
    destComboBox.setBounds(220, 330, 220, 30);
    fareLabel.setBounds(50, 370, 160, 30);
    fareTextField.setBounds(220, 370, 220, 30);

    submitButton.setBounds(220, 420, 100, 30);
    resetButton.setBounds(340, 420, 100, 30);

    frame.add(countLabel);
    frame.add(countTextField);
    frame.add(sourceLabel);
    frame.add(sourceComboBox);
    frame.add(destLabel);
    frame.add(destComboBox);
    frame.add(fareLabel);
    frame.add(fareTextField);
    frame.add(submitButton);
    frame.add(resetButton);

    // KeyListener: every keystroke in the count field redraws the name fields
    countTextField.addKeyListener(new KeyAdapter() {
      public void keyReleased(KeyEvent e) {
        int count = readCount(countTextField.getText());

        for (int i = 0; i < MAX_PASSENGERS; i++) {
          boolean show = i < count;
          nameLabels[i].setVisible(show);
          nameTextFields[i].setVisible(show);
          if (!show) {
            nameTextFields[i].setText("");
          }
        }

        fareTextField.setText(String.valueOf(calcFare(sourceComboBox, destComboBox, count)));
        frame.repaint();
      }
    });

    // ActionListener on both dropdowns: fare updates when route changes
    sourceComboBox.addActionListener(e -> {
      int count = readCount(countTextField.getText());
      fareTextField.setText(String.valueOf(calcFare(sourceComboBox, destComboBox, count)));
    });

    destComboBox.addActionListener(e -> {
      int count = readCount(countTextField.getText());
      fareTextField.setText(String.valueOf(calcFare(sourceComboBox, destComboBox, count)));
    });

    // MouseListener: click the fare box to see how the fare was worked out
    fareTextField.addMouseListener(new MouseAdapter() {
      public void mousePressed(MouseEvent e) {
        int count = readCount(countTextField.getText());
        int jumps = Math.abs(sourceComboBox.getSelectedIndex() - destComboBox.getSelectedIndex());

        JOptionPane.showMessageDialog(
          frame,
          "Jumps: " + jumps + "\n" +
          "Per passenger: " + jumps + " x " + FARE_PER_JUMP + " = " + (jumps * FARE_PER_JUMP) + "\n" +
          "Passengers: " + count + "\n" +
          "Total: " + calcFare(sourceComboBox, destComboBox, count),
          "Fare Breakdown",
          JOptionPane.INFORMATION_MESSAGE
        );
      }

      // hover highlight, proves the mouse listener is alive
      public void mouseEntered(MouseEvent e) {
        fareTextField.setBackground(new Color(220, 235, 255));
      }

      public void mouseExited(MouseEvent e) {
        fareTextField.setBackground(Color.WHITE);
      }
    });

    submitButton.addActionListener(e -> {
      int count = readCount(countTextField.getText());

      if (count == 0) {
        JOptionPane.showMessageDialog(
          frame,
          "Enter number of passengers (1 to " + MAX_PASSENGERS + ")!",
          "Error",
          JOptionPane.ERROR_MESSAGE
        );
        return;
      }

      if (sourceComboBox.getSelectedIndex() == destComboBox.getSelectedIndex()) {
        JOptionPane.showMessageDialog(
          frame,
          "Source and Destination cannot be the same!",
          "Error",
          JOptionPane.ERROR_MESSAGE
        );
        return;
      }

      // build the summary and check for blank names in the same loop
      String summary = "";
      for (int i = 0; i < count; i++) {
        String name = nameTextFields[i].getText().trim();

        if (name.equals("")) {
          JOptionPane.showMessageDialog(
            frame,
            "Name of Passenger " + (i + 1) + " is empty!",
            "Error",
            JOptionPane.ERROR_MESSAGE
          );
          return;
        }

        summary = summary + "Passenger " + (i + 1) + ": " + name + "\n";
      }

      summary = summary + "\n"
        + "Source: " + sourceComboBox.getSelectedItem() + "\n"
        + "Destination: " + destComboBox.getSelectedItem() + "\n"
        + "Total Fare: " + calcFare(sourceComboBox, destComboBox, count);

      JOptionPane.showMessageDialog(frame, summary, "Booking Confirmed", JOptionPane.INFORMATION_MESSAGE);

      // reset everything after a successful booking
      clearForm(countTextField, nameLabels, nameTextFields, sourceComboBox, destComboBox, fareTextField);
      frame.repaint();
    });

    resetButton.addActionListener(e -> {
      clearForm(countTextField, nameLabels, nameTextFields, sourceComboBox, destComboBox, fareTextField);
      frame.repaint();
    });

    frame.setSize(520, 520);
    frame.setLayout(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }

  // turns whatever is typed into a usable count, 0 if junk, capped at MAX_PASSENGERS
  static int readCount(String text) {
    int count;

    try {
      count = Integer.parseInt(text.trim());
    } catch (NumberFormatException ex) {
      return 0;
    }

    if (count < 0) {
      return 0;
    }
    if (count > MAX_PASSENGERS) {
      return MAX_PASSENGERS;
    }
    return count;
  }

  // index distance between the two places x 100 x number of passengers
  static int calcFare(JComboBox<String> source, JComboBox<String> dest, int count) {
    int jumps = Math.abs(source.getSelectedIndex() - dest.getSelectedIndex());
    return jumps * FARE_PER_JUMP * count;
  }

  static void clearForm(JTextField countTextField, JLabel[] nameLabels, JTextField[] nameTextFields,
                        JComboBox<String> source, JComboBox<String> dest, JTextField fareTextField) {
    countTextField.setText("");

    for (int i = 0; i < MAX_PASSENGERS; i++) {
      nameTextFields[i].setText("");
      nameLabels[i].setVisible(false);
      nameTextFields[i].setVisible(false);
    }

    source.setSelectedIndex(0);
    dest.setSelectedIndex(0);
    fareTextField.setText("");
  }
}
