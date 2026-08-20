import javax.swing.*;

public class LoginForm {
  public static void main(String[] args) {
    JFrame frame = new JFrame("Login Form");

    JLabel userLabel = new JLabel("Enter user id: ");
    JLabel passLabel = new JLabel("Enter password: ");

    JTextField userTextField = new JTextField();
    JPasswordField passField = new JPasswordField();

    JButton button = new JButton("Login");

    // (x,y,width,height)
    userLabel.setBounds(50,50,120,30);
    userTextField.setBounds(180,50,200,30);
    passLabel.setBounds(50,100,120,30);
    passField.setBounds(180,100,200,30);
    button.setBounds(180,150,100,30);

    frame.add(userLabel);
    frame.add(userTextField);
    frame.add(passLabel);
    frame.add(passField);
    frame.add(button);

    button.addActionListener(e->{
      String userId = userTextField.getText();
      String password = new String(passField.getPassword());

      if (userId.equals("admin") && password.equals("1234")) {
        JOptionPane.showMessageDialog(
          frame,
          "Login successful! Welcome " + userId + "!",
          "Success",
          JOptionPane.INFORMATION_MESSAGE
        );
      } else {
        JOptionPane.showMessageDialog(
          frame, 
          "Incorrect user id or password!",
          "Login Failed",
          JOptionPane.ERROR_MESSAGE
        );
      }
    });

    frame.setSize(450,250);
    frame.setLayout(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
