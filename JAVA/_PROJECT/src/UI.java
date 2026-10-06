import java.awt.Font;
import java.awt.event.ActionListener;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;

// small factory so the pages read as "make this, put it here" instead of
// four lines of boilerplate per component. every helper builds, positions,
// adds to the given panel, and returns the component.
class UI {

    static JLabel label(JComponent parent, String text, int x, int y, int w) {
        JLabel l = new JLabel(text);
        l.setBounds(x, y, w, 25);
        parent.add(l);
        return l;
    }

    static JLabel header(JComponent parent, String text, int x, int y) {
        JLabel l = new JLabel(text);
        l.setFont(new Font("SansSerif", Font.BOLD, 15));
        l.setBounds(x, y, 400, 25);
        parent.add(l);
        return l;
    }

    static JTextField field(JComponent parent, int x, int y, int w) {
        JTextField f = new JTextField();
        f.setBounds(x, y, w, 25);
        parent.add(f);
        return f;
    }

    static <T> JComboBox<T> combo(JComponent parent, T[] items, int x, int y, int w) {
        JComboBox<T> c = new JComboBox<>(items);
        c.setBounds(x, y, w, 25);
        parent.add(c);
        return c;
    }

    static <T> JComboBox<T> comboEmpty(JComponent parent, int x, int y, int w) {
        JComboBox<T> c = new JComboBox<>();
        c.setBounds(x, y, w, 25);
        parent.add(c);
        return c;
    }

    static JButton button(JComponent parent, String text, int x, int y, int w, ActionListener al) {
        JButton b = new JButton(text);
        b.setBounds(x, y, w, 28);
        if (al != null) {
            b.addActionListener(al);
        }
        parent.add(b);
        return b;
    }

    static DefaultTableModel model(String[] columns) {
        return new DefaultTableModel(columns, 0) {
            @Override
            public boolean isCellEditable(int row, int col) {
                return false;   // tables are read-only; actions use buttons
            }
        };
    }

    static JTable table(JComponent parent, DefaultTableModel model, int x, int y, int w, int h) {
        JTable t = new JTable(model);
        t.setRowHeight(22);
        JScrollPane sp = new JScrollPane(t);
        sp.setBounds(x, y, w, h);
        parent.add(sp);
        return t;
    }
}
