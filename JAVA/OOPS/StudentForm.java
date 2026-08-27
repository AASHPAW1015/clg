import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

class Student {
  private String name;
  private int age;
  private String course;

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setAge(int age) {
    if (age > 0) {
      this.age = age;
    } else {
      this.age = 0;
    }
  }

  public int getAge() {
    return age;
  }

  public void setCourse(String course) {
    this.course = course;
  }

  public String getCourse() {
    return course;
  }
}

class studentFrame extends JFrame implements ActionListener {
  JLabel nameLabel;
  JLabel ageLabel;
  JLabel courseLabel;

  JTextField nameField;
  JTextField ageField;
  JComboBox<String> courseBox;

  JButton submitButton;
  JButton clearButton;

  JTextArea outputArea;
  JScrollPane outputScroll;

  Student student;

  studentFrame() {
    setTitle("Student Registration Form");

    nameLabel = new JLabel("Student Name: ");
    ageLabel = new JLabel("Age: ");
    courseLabel = new JLabel("Course: ");

    nameField = new JTextField();
    ageField = new JTextField();

    String[] courses = {"Engineering", "Medical", "Arts"};
    courseBox = new JComboBox<>(courses);

    submitButton = new JButton("Submit");
    clearButton = new JButton("Clear");

    outputArea = new JTextArea();
    outputArea.setEditable(false);
    outputArea.setLineWrap(true);
    outputArea.setWrapStyleWord(true);
    outputScroll = new JScrollPane(outputArea);

    nameLabel.setBounds(30, 30, 120, 30);
    nameField.setBounds(150, 30, 200, 30);

    ageLabel.setBounds(30, 80, 120, 30);
    ageField.setBounds(150, 80, 200, 30);

    courseLabel.setBounds(30, 130, 120, 30);
    courseBox.setBounds(150, 130, 200, 30);

    submitButton.setBounds(30, 190, 150, 30);
    clearButton.setBounds(200, 190, 150, 30);

    outputScroll.setBounds(380, 30, 262, 240);

    add(nameLabel);
    add(nameField);
    add(ageLabel);
    add(ageField);
    add(courseLabel);
    add(courseBox);
    add(submitButton);
    add(clearButton);
    add(outputScroll);

    submitButton.addActionListener(this);
    clearButton.addActionListener(this);

    setSize(670, 330);
    setLayout(null);
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setVisible(true);
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    if (e.getSource() == clearButton) {
      nameField.setText("");
      ageField.setText("");
      courseBox.setSelectedIndex(0);
      outputArea.setText("");
      return;
    }

    String name = nameField.getText();
    if (name.isEmpty()) {
      outputArea.append("Enter a student name\n\n");
      return;
    }

    int age;
    try {
      age = Integer.parseInt(ageField.getText());
    } catch (NumberFormatException ex) {
      outputArea.append("Enter a valid age\n\n");
      return;
    }

    String course = (String) courseBox.getSelectedItem();

    student = new Student();
    student.setName(name);
    student.setAge(age);
    student.setCourse(course);

    outputArea.append("----------Student Details----------"+"\n"+"\n");
    outputArea.append("Name: " + student.getName() + "\n");
    outputArea.append("Age: " + student.getAge() + "\n");
    outputArea.append("Course: " + student.getCourse() + "\n\n");
  }
}

public class StudentForm {
  public static void main(String[] args) {
    new studentFrame();
  }
}
