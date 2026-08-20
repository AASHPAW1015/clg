import javax.swing.*;

public class StudentForm {
  public static void main(String[] args) {
    JFrame frame = new JFrame("Student Form");

    JLabel nameLabel = new JLabel("Enter your name: ");

    JTextField nameTextField = new JTextField();

    JButton button = new JButton("Submit");

    // (x,y,width,height)
    nameLabel.setBounds(50,50,120,30);
    nameTextField.setBounds(180,50,200,30);
    button.setBounds(180,100,100,30);

    frame.add(nameLabel);
    frame.add(nameTextField);
    frame.add(button);

    button.addActionListener(e->{
      String name = nameTextField.getText();

      JOptionPane.showMessageDialog(
        frame,
        "Hello " + name + "!"
      );
    });

    frame.setSize(450,200);
    frame.setLayout(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
