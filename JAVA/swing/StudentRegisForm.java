import javax.swing.*;

public class StudentRegisForm {
  public static void main(String[] args) {
    JFrame frame = new JFrame("Student Registration Form");

    JLabel nameLabel = new JLabel("Name: ");
    JLabel rollLabel = new JLabel("Roll Number: ");
    JLabel emailLabel = new JLabel("Email: ");
    JLabel genderLabel = new JLabel("Gender: ");
    JLabel courseLabel = new JLabel("Course: ");
    JLabel hobbiesLabel = new JLabel("Hobbies: ");

    JTextField nameTextField = new JTextField();
    JTextField rollTextField = new JTextField();
    JTextField emailTextField = new JTextField();

    JRadioButton maleButton = new JRadioButton("Male");
    JRadioButton femaleButton = new JRadioButton("Female");

    ButtonGroup genderGroup = new ButtonGroup();
    genderGroup.add(maleButton);
    genderGroup.add(femaleButton);

    String[] courses = {"B.Tech", "BBA", "BSc", "BCom", "BA"};
    JComboBox<String> courseBox = new JComboBox<>(courses);

    JCheckBox readingBox = new JCheckBox("Reading");
    JCheckBox sportsBox = new JCheckBox("Sports");
    JCheckBox musicBox = new JCheckBox("Music");
    JCheckBox codingBox = new JCheckBox("Coding");

    JButton submitButton = new JButton("Submit");
    JButton clearButton = new JButton("Clear");

    // (x,y,width,height)
    nameLabel.setBounds(50,30,120,30);
    nameTextField.setBounds(200,30,220,30);

    rollLabel.setBounds(50,70,120,30);
    rollTextField.setBounds(200,70,220,30);

    emailLabel.setBounds(50,110,120,30);
    emailTextField.setBounds(200,110,220,30);

    genderLabel.setBounds(50,150,120,30);
    maleButton.setBounds(200,150,80,30);
    femaleButton.setBounds(290,150,90,30);

    courseLabel.setBounds(50,190,120,30);
    courseBox.setBounds(200,190,220,30);

    hobbiesLabel.setBounds(50,230,120,30);
    readingBox.setBounds(200,230,100,30);
    sportsBox.setBounds(310,230,100,30);
    musicBox.setBounds(200,265,100,30);
    codingBox.setBounds(310,265,100,30);

    submitButton.setBounds(150,320,100,30);
    clearButton.setBounds(270,320,100,30);

    frame.add(nameLabel);
    frame.add(nameTextField);
    frame.add(rollLabel);
    frame.add(rollTextField);
    frame.add(emailLabel);
    frame.add(emailTextField);
    frame.add(genderLabel);
    frame.add(maleButton);
    frame.add(femaleButton);
    frame.add(courseLabel);
    frame.add(courseBox);
    frame.add(hobbiesLabel);
    frame.add(readingBox);
    frame.add(sportsBox);
    frame.add(musicBox);
    frame.add(codingBox);
    frame.add(submitButton);
    frame.add(clearButton);

    submitButton.addActionListener(e->{
      String name = nameTextField.getText();
      String roll = rollTextField.getText();
      String email = emailTextField.getText();

      // roll number must be digits only
      try {
        Integer.parseInt(roll);
      } catch (NumberFormatException ex) {
        JOptionPane.showMessageDialog(
          frame,
          "Roll number must be a number!",
          "Invalid Roll Number",
          JOptionPane.ERROR_MESSAGE
        );
        return;
      }

      // email must have @ and .com
      if (!email.contains("@") || !email.contains(".com")) {
        JOptionPane.showMessageDialog(
          frame,
          "Email must contain @ and .com !",
          "Invalid Email",
          JOptionPane.ERROR_MESSAGE
        );
        return;
      }

      String gender = "Not selected";
      if (maleButton.isSelected()) {
        gender = "Male";
      } else if (femaleButton.isSelected()) {
        gender = "Female";
      }

      String course = (String) courseBox.getSelectedItem();

      String hobbies = "";
      if (readingBox.isSelected()) hobbies = hobbies + "Reading ";
      if (sportsBox.isSelected()) hobbies = hobbies + "Sports ";
      if (musicBox.isSelected()) hobbies = hobbies + "Music ";
      if (codingBox.isSelected()) hobbies = hobbies + "Coding ";
      if (hobbies.equals("")) hobbies = "None";

      JOptionPane.showMessageDialog(
        frame,
        "Name: " + name + "\n" +
        "Roll Number: " + roll + "\n" +
        "Email: " + email + "\n" +
        "Gender: " + gender + "\n" +
        "Course: " + course + "\n" +
        "Hobbies: " + hobbies,
        "Registration Details",
        JOptionPane.INFORMATION_MESSAGE
      );
    });

    clearButton.addActionListener(e->{
      nameTextField.setText("");
      rollTextField.setText("");
      emailTextField.setText("");
      genderGroup.clearSelection();
      courseBox.setSelectedIndex(0);
      readingBox.setSelected(false);
      sportsBox.setSelected(false);
      musicBox.setSelected(false);
      codingBox.setSelected(false);
    });

    frame.setSize(500,420);
    frame.setLayout(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
