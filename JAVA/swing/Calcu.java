import javax.swing.*;

public class Calcu {
  public static void main(String[] args) {
    JFrame frame = new JFrame("Calculator");

    JLabel num1Label = new JLabel("Number 1: ");
    JLabel num2Label = new JLabel("Number 2: ");
    JLabel resultLabel = new JLabel("Result: ");

    JTextField num1TextField = new JTextField();
    JTextField num2TextField = new JTextField();
    JTextField resultTextField = new JTextField();
    resultTextField.setEditable(false);

    JButton addButton = new JButton("+");
    JButton subButton = new JButton("-");
    JButton mulButton = new JButton("*");
    JButton divButton = new JButton("/");

    // (x,y,width,height)
    num1Label.setBounds(50,50,120,30);
    num1TextField.setBounds(180,50,200,30);
    num2Label.setBounds(50,100,120,30);
    num2TextField.setBounds(180,100,200,30);
    resultLabel.setBounds(50,150,120,30);
    resultTextField.setBounds(180,150,200,30);

    addButton.setBounds(50,200,70,30);
    subButton.setBounds(130,200,70,30);
    mulButton.setBounds(210,200,70,30);
    divButton.setBounds(290,200,70,30);

    frame.add(num1Label);
    frame.add(num1TextField);
    frame.add(num2Label);
    frame.add(num2TextField);
    frame.add(resultLabel);
    frame.add(resultTextField);
    frame.add(addButton);
    frame.add(subButton);
    frame.add(mulButton);
    frame.add(divButton);

    addButton.addActionListener(e->{
      double num1 = Double.parseDouble(num1TextField.getText());
      double num2 = Double.parseDouble(num2TextField.getText());

      resultTextField.setText(String.valueOf(num1 + num2));
    });

    subButton.addActionListener(e->{
      double num1 = Double.parseDouble(num1TextField.getText());
      double num2 = Double.parseDouble(num2TextField.getText());

      resultTextField.setText(String.valueOf(num1 - num2));
    });

    mulButton.addActionListener(e->{
      double num1 = Double.parseDouble(num1TextField.getText());
      double num2 = Double.parseDouble(num2TextField.getText());

      resultTextField.setText(String.valueOf(num1 * num2));
    });

    divButton.addActionListener(e->{
      double num1 = Double.parseDouble(num1TextField.getText());
      double num2 = Double.parseDouble(num2TextField.getText());

      if (num2 == 0) {
        JOptionPane.showMessageDialog(
          frame,
          "Cannot divide by zero!",
          "Error",
          JOptionPane.ERROR_MESSAGE
        );
      } else {
        resultTextField.setText(String.valueOf(num1 / num2));
      }
    });

    frame.setSize(450,300);
    frame.setLayout(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
