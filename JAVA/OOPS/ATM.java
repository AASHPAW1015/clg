import javax.swing.*;

public class ATM {
  public static void main(String[] args) {
    JFrame frame = new JFrame("ATM");

    JLabel accLabel = new JLabel("Account Holder: ");
    JLabel balLabel = new JLabel("Initial Balance: ");
    JLabel amountLabel = new JLabel("Amount: ");

    JTextField accField = new JTextField();
    JTextField balField = new JTextField();
    JTextField amountField = new JTextField();

    JButton depositButton = new JButton("Deposit");
    JButton withdrawButton = new JButton("Withdraw");
    JButton interestButton = new JButton("Calculate Interest");

    JTextArea outputArea = new JTextArea();
    outputArea.setEditable(false);
    outputArea.setLineWrap(true);
    outputArea.setWrapStyleWord(true);
    JScrollPane outputScroll = new JScrollPane(outputArea);

    // (x,y,width,height)
    accLabel.setBounds(30,30,120,30);
    accField.setBounds(150,30,200,30);

    balLabel.setBounds(30,80,120,30);
    balField.setBounds(150,80,200,30);

    amountLabel.setBounds(30,130,120,30);
    amountField.setBounds(150,130,200,30);

    depositButton.setBounds(30,190,150,30);
    withdrawButton.setBounds(200,190,150,30);
    interestButton.setBounds(115,240,150,30);

    outputScroll.setBounds(380,30,260,240);

    frame.add(accLabel);
    frame.add(accField);
    frame.add(balLabel);
    frame.add(balField);
    frame.add(amountLabel);
    frame.add(amountField);
    frame.add(depositButton);
    frame.add(withdrawButton);
    frame.add(interestButton);
    frame.add(outputScroll);

    frame.setSize(670,330);
    frame.setLayout(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  }
}
