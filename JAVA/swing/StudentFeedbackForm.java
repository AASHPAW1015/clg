import java.awt.event.*;
import javax.swing.*;

public class StudentFeedbackForm {
  public static void main(String[] args) {
    JFrame frame = new JFrame("Student Feedback Form");

    JLabel nameLabel = new JLabel("Student Name: ");
    JLabel feedbackLabel = new JLabel("Feedback: ");
    JLabel statusLabel = new JLabel("Status: ");

    JTextField nameTextField = new JTextField();

    JTextArea feedbackArea = new JTextArea();
    feedbackArea.setLineWrap(true);
    feedbackArea.setWrapStyleWord(true);
    JScrollPane feedbackScroll = new JScrollPane(feedbackArea);

    JButton submitButton = new JButton("Submit");
    JButton clearButton = new JButton("Clear");

    // (x,y,width,height)
    nameLabel.setBounds(30,30,120,30);
    nameTextField.setBounds(150,30,250,30);

    feedbackLabel.setBounds(30,80,120,30);
    feedbackScroll.setBounds(150,80,250,120);

    submitButton.setBounds(150,220,100,30);
    clearButton.setBounds(270,220,100,30);

    statusLabel.setBounds(30,270,400,30);

    frame.add(nameLabel);
    frame.add(nameTextField);
    frame.add(feedbackLabel);
    frame.add(feedbackScroll);
    frame.add(submitButton);
    frame.add(clearButton);
    frame.add(statusLabel);

    // keyboard listener on the name field
    nameTextField.addKeyListener(new java.awt.event.KeyListener() {
      public void keyTyped(KeyEvent e){
        statusLabel.setText("Status: Student is typing");
      }
      public void keyPressed(KeyEvent e){
        statusLabel.setText("Status: Student is typing");
      }
      public void keyReleased(KeyEvent e){
        statusLabel.setText("Status: Student is typing");
      }
    });

    // mouse listener on the feedback area
    feedbackArea.addMouseListener(new MouseListener() {
      public void mouseEntered(MouseEvent e){
        statusLabel.setText("Status: Mouse inside feedback area");
      }
      public void mouseExited(MouseEvent e){
        statusLabel.setText("Status: Mouse outside feedback area");
      }
      public void mousePressed(MouseEvent e){
        statusLabel.setText("Status: Mouse Pressed in feedback area");
      }
      public void mouseReleased(MouseEvent e){
        statusLabel.setText("Status: Mouse Released in feedback area");
      }
      public void mouseClicked(MouseEvent e){
      }
    });

    submitButton.addActionListener(e->{
      String name = nameTextField.getText();

      JOptionPane.showMessageDialog(
        frame,
        name + ", your feedback has been submitted"
      );
    });

    clearButton.addActionListener(e->{
      nameTextField.setText("");
      feedbackArea.setText("");
      statusLabel.setText("Status: Cleared");
    });

    frame.setSize(470,360);
    frame.setLayout(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
