import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

// ENCAPSULATION: username and password are private, reachable only through methods
class User {
    private String username;
    private String password;

    User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    // protected, so only subclasses can read it, not outside code
    protected String getPassword() {
        return password;
    }

    public String getRole() {
        return "User";
    }

    // minimum length every account has to satisfy, subclasses raise it
    public int getMinLength() {
        return 6;
    }

    // returns an error message, or null when the password is fine
    public String validatePassword() {
        if (password.length() < getMinLength()) {
            return "Password must be at least " + getMinLength() + " characters";
        }

        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;

        for (int i = 0; i < password.length(); i++) {
            char c = password.charAt(i);

            if (Character.isUpperCase(c)) {
                hasUpper = true;
            } else if (Character.isLowerCase(c)) {
                hasLower = true;
            } else if (Character.isDigit(c)) {
                hasDigit = true;
            } else {
                hasSpecial = true;
            }
        }

        if (!hasUpper) {
            return "Password needs at least one uppercase letter";
        }
        if (!hasLower) {
            return "Password needs at least one lowercase letter";
        }
        if (!hasDigit) {
            return "Password needs at least one digit";
        }
        if (!hasSpecial) {
            return "Password needs at least one special character";
        }
        if (password.contains(username)) {
            return "Password must not contain the username";
        }

        return null;
    }
}

// INHERITANCE: AdminUser gets every User member, then tightens the rules
class AdminUser extends User {

    AdminUser(String username, String password) {
        super(username, password);
    }

    // POLYMORPHISM: same method name, stricter answer
    @Override
    public int getMinLength() {
        return 10;
    }

    @Override
    public String getRole() {
        return "Admin";
    }

    @Override
    public String validatePassword() {
        // reuse the parent checks first
        String error = super.validatePassword();
        if (error != null) {
            return error;
        }

        if (getPassword().toLowerCase().contains("admin")) {
            return "Admin password must not contain the word admin";
        }
        return null;
    }
}

class GuestUser extends User {

    GuestUser(String username, String password) {
        super(username, password);
    }

    @Override
    public int getMinLength() {
        return 4;
    }

    @Override
    public String getRole() {
        return "Guest";
    }
}

// INHERITANCE from JFrame + IMPLEMENTS the ActionListener interface
class loginFrame extends JFrame implements ActionListener {
    JLabel userLabel;
    JLabel passLabel;
    JLabel roleLabel;

    JTextField userField;
    JPasswordField passField;
    JComboBox<String> roleBox;

    JButton loginButton;
    JButton clearButton;

    JTextArea outputArea;
    JScrollPane outputScroll;

    // parent type holding a child object = runtime polymorphism
    User user;

    loginFrame() {
        setTitle("Login Form");

        userLabel = new JLabel("Username: ");
        passLabel = new JLabel("Password: ");
        roleLabel = new JLabel("Role: ");

        userField = new JTextField();
        passField = new JPasswordField();

        String[] roles = {"User", "Admin", "Guest"};
        roleBox = new JComboBox<>(roles);

        loginButton = new JButton("Login");
        clearButton = new JButton("Clear");

        outputArea = new JTextArea();
        outputArea.setEditable(false);
        outputArea.setLineWrap(true);
        outputArea.setWrapStyleWord(true);
        outputScroll = new JScrollPane(outputArea);

        // (x,y,width,height)
        userLabel.setBounds(30, 30, 120, 30);
        userField.setBounds(150, 30, 200, 30);

        passLabel.setBounds(30, 80, 120, 30);
        passField.setBounds(150, 80, 200, 30);

        roleLabel.setBounds(30, 130, 120, 30);
        roleBox.setBounds(150, 130, 200, 30);

        loginButton.setBounds(30, 190, 150, 30);
        clearButton.setBounds(200, 190, 150, 30);

        outputScroll.setBounds(380, 30, 262, 240);

        add(userLabel);
        add(userField);
        add(passLabel);
        add(passField);
        add(roleLabel);
        add(roleBox);
        add(loginButton);
        add(clearButton);
        add(outputScroll);

        // "this" is the listener because the class implements ActionListener
        loginButton.addActionListener(this);
        clearButton.addActionListener(this);

        setSize(670, 330);
        setLayout(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
    }

    // builds the right child object for the selected role
    User createUser(String username, String password) {
        String role = (String) roleBox.getSelectedItem();

        if (role.equals("Admin")) {
            return new AdminUser(username, password);
        } else if (role.equals("Guest")) {
            return new GuestUser(username, password);
        }
        return new User(username, password);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == clearButton) {
            userField.setText("");
            passField.setText("");
            roleBox.setSelectedIndex(0);
            outputArea.setText("");
            return;
        }

        String username = userField.getText();
        // JPasswordField hands back a char array, not a String
        String password = new String(passField.getPassword());

        if (username.isEmpty()) {
            outputArea.append("Enter a username\n\n");
            return;
        }
        if (password.isEmpty()) {
            outputArea.append("Enter a password\n\n");
            return;
        }

        // parent reference, child object
        user = createUser(username, password);

        // calls the AdminUser/GuestUser version when that is the real object
        String error = user.validatePassword();

        outputArea.append("----------Login Attempt----------" + "\n" + "\n");
        outputArea.append("Username: " + user.getUsername() + "\n");
        outputArea.append("Role: " + user.getRole() + "\n");
        outputArea.append("Rule: min " + user.getMinLength() + " characters\n");

        if (error != null) {
            outputArea.append("Invalid: " + error + "\n\n");
            return;
        }

        outputArea.append("Login successful, welcome " + user.getUsername() + "\n\n");
        passField.setText("");
    }
}

public class LoginForm {
    public static void main(String[] args) {
        new loginFrame();
    }
}
