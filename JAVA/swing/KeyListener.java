import java.awt.event.*;
import javax.swing.*;

public class KeyListener {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Key Example");

        JTextField field = new JTextField();

        field.setBounds(100,100,150,30);

        frame.add(field);

        field.addKeyListener(new java.awt.event.KeyListener() {
            public void keyTyped(KeyEvent e){
                System.out.println("Key Typed: " + e.getKeyChar());
            }
            public void keyPressed(KeyEvent e){
                System.out.println("Key Pressed: " + KeyEvent.getKeyText(e.getKeyCode()));
            }
            public void keyReleased(KeyEvent e){
                System.out.println("Key Released: " + KeyEvent.getKeyText(e.getKeyCode()));
            }
        });

        frame.setSize(400,300);
        frame.setLayout(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
