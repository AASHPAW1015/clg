import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.HashMap;
import java.util.Map;

/**
 * Shopping stock + cart system.
 *
 * Stock : LinkedList of HashMaps. One HashMap = one product.
 * Cart  : HashMap of productId -> quantity chosen.
 */
public class ShoppingAssignment {

    public static void main(String[] args) {
        Stock stock = new Stock();
        stock.addProduct(101, "Laptop", 55000.0, 5);
        stock.addProduct(102, "Phone", 20000.0, 10);
        stock.addProduct(103, "Bottle", 250.0, 10);
        stock.addProduct(104, "Book", 400.0, 10);
        stock.addProduct(105, "Pen", 20.0, 10);

        Cart cart = new Cart(stock);

        // Swing wants its windows built on the event dispatch thread.
        SwingUtilities.invokeLater(() -> new ShopUI(stock, cart).setVisible(true));
    }
}

/**
 * Holds every product. Each product is a HashMap with the keys
 * "id", "name", "price", "qty", and all of them live in one LinkedList.
 */
class Stock {

    private LinkedList<HashMap<String, Object>> products = new LinkedList<>();

    public void addProduct(int id, String name, double price, int qty) {
        HashMap<String, Object> product = new HashMap<>();
        product.put("id", id);
        product.put("name", name);
        product.put("price", price);
        product.put("qty", qty);
        products.add(product);
    }

    public LinkedList<HashMap<String, Object>> getAll() {
        return products;
    }

    /** Returns the product map with this id, or null if there is none. */
    public HashMap<String, Object> findById(int id) {
        for (HashMap<String, Object> product : products) {
            if (getId(product) == id) {
                return product;
            }
        }
        return null;
    }

    /** Adds delta to the stored quantity. Pass -1 to sell one, +1 to put one back. */
    public void changeQty(int id, int delta) {
        HashMap<String, Object> product = findById(id);
        if (product != null) {
            product.put("qty", getQty(product) + delta);
        }
    }

    // The map values are Objects, so every read needs a cast. These helpers keep
    // the casts in one place instead of scattering them through the whole program.
    public static int getId(HashMap<String, Object> product) {
        return (int) product.get("id");
    }

    public static String getName(HashMap<String, Object> product) {
        return (String) product.get("name");
    }

    public static double getPrice(HashMap<String, Object> product) {
        return (double) product.get("price");
    }

    public static int getQty(HashMap<String, Object> product) {
        return (int) product.get("qty");
    }
}

/**
 * The chosen items. Stores only id -> quantity; the name and price are always
 * read back from Stock, so there is exactly one copy of a product's price.
 *
 * LinkedHashMap is a HashMap that also remembers insertion order, which keeps
 * the cart table rows from jumping around after every click.
 */
class Cart {

    private LinkedHashMap<Integer, Integer> items = new LinkedHashMap<>();
    private Stock stock;

    public Cart(Stock stock) {
        this.stock = stock;
    }

    /**
     * Moves one unit from stock into the cart.
     * Returns false when the product is sold out, so nothing changes.
     */
    public boolean add(int id) {
        HashMap<String, Object> product = stock.findById(id);
        if (product == null || Stock.getQty(product) <= 0) {
            return false;
        }
        stock.changeQty(id, -1);
        items.put(id, getQty(id) + 1);
        return true;
    }

    /**
     * Moves one unit back from the cart into stock.
     * Returns false when the product is not in the cart.
     */
    public boolean remove(int id) {
        if (!items.containsKey(id)) {
            return false;
        }
        stock.changeQty(id, +1);

        int left = items.get(id) - 1;
        if (left == 0) {
            items.remove(id);       // last one taken out, drop the row completely
        } else {
            items.put(id, left);
        }
        return true;
    }

    public LinkedHashMap<Integer, Integer> getItems() {
        return items;
    }

    public int getQty(int id) {
        if (items.containsKey(id)) {
            return items.get(id);
        }
        return 0;
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    public double getTotal() {
        double total = 0;
        for (Map.Entry<Integer, Integer> entry : items.entrySet()) {
            HashMap<String, Object> product = stock.findById(entry.getKey());
            total = total + Stock.getPrice(product) * entry.getValue();
        }
        return total;
    }

    public String buildBill() {
        StringBuilder bill = new StringBuilder();
        bill.append("--------------- BILL ---------------\n");
        bill.append(String.format("%-12s %5s %10s %12s%n", "ITEM", "QTY", "PRICE", "AMOUNT"));

        for (Map.Entry<Integer, Integer> entry : items.entrySet()) {
            HashMap<String, Object> product = stock.findById(entry.getKey());
            int qty = entry.getValue();
            double price = Stock.getPrice(product);

            bill.append(String.format("%-12s %5d %10.2f %12.2f%n",
                    Stock.getName(product), qty, price, price * qty));
        }

        bill.append("------------------------------------\n");
        bill.append(String.format("%-12s %28.2f%n", "TOTAL", getTotal()));
        return bill.toString();
    }

    public void clear() {
        items.clear();
    }
}

/**
 * The window. It only reads from Stock and calls methods on Cart -
 * none of the add/remove rules live in here.
 */
class ShopUI extends JFrame {

    private Stock stock;
    private Cart cart;

    private DefaultTableModel stockModel;
    private DefaultTableModel cartModel;
    private JTable stockTable;
    private JTable cartTable;
    private JLabel totalLabel;

    public ShopUI(Stock stock, Cart cart) {
        this.stock = stock;
        this.cart = cart;

        setTitle("Shopping System");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(760, 400);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout(8, 8));

        stockModel = buildModel(new String[]{"ID", "Name", "Price", "Qty"});
        cartModel = buildModel(new String[]{"ID", "Name", "Price", "Qty", "Amount"});

        stockTable = new JTable(stockModel);
        cartTable = new JTable(cartModel);
        stockTable.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        cartTable.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        JPanel tables = new JPanel(new GridLayout(1, 2, 8, 8));
        tables.add(titled(stockTable, "Stock"));
        tables.add(titled(cartTable, "Cart"));
        add(tables, BorderLayout.CENTER);

        JButton addButton = new JButton("Add to Cart");
        JButton removeButton = new JButton("Remove from Cart");
        JButton billButton = new JButton("Generate Bill");
        totalLabel = new JLabel("Total: 0.00");

        addButton.addActionListener(e -> onAdd());
        removeButton.addActionListener(e -> onRemove());
        billButton.addActionListener(e -> onBill());

        JPanel bottom = new JPanel(new FlowLayout(FlowLayout.LEFT, 10, 8));
        bottom.add(addButton);
        bottom.add(removeButton);
        bottom.add(billButton);
        bottom.add(totalLabel);
        add(bottom, BorderLayout.SOUTH);

        refresh();
    }

    /** A table model whose cells cannot be typed into. */
    private DefaultTableModel buildModel(String[] columns) {
        return new DefaultTableModel(columns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
    }

    private JScrollPane titled(JTable table, String title) {
        JScrollPane pane = new JScrollPane(table);
        pane.setBorder(BorderFactory.createTitledBorder(title));
        return pane;
    }

    private void onAdd() {
        int row = stockTable.getSelectedRow();
        if (row == -1) {
            JOptionPane.showMessageDialog(this, "Select a product from the stock table first.");
            return;
        }

        int id = (int) stockModel.getValueAt(row, 0);
        if (!cart.add(id)) {
            JOptionPane.showMessageDialog(this, "That product is out of stock.");
            return;
        }
        refresh();
        stockTable.setRowSelectionInterval(row, row);   // keep the same row highlighted
    }

    private void onRemove() {
        int row = cartTable.getSelectedRow();
        if (row == -1) {
            JOptionPane.showMessageDialog(this, "Select a product from the cart first.");
            return;
        }

        int id = (int) cartModel.getValueAt(row, 0);
        cart.remove(id);
        refresh();
    }

    private void onBill() {
        if (cart.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Cart is empty.");
            return;
        }

        JTextArea area = new JTextArea(cart.buildBill());
        area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 13));
        area.setEditable(false);

        JOptionPane.showMessageDialog(this, new JScrollPane(area), "Bill",
                JOptionPane.PLAIN_MESSAGE);

        cart.clear();   // items are sold, stock stays reduced
        refresh();
    }

    /** Throws away every row and rebuilds both tables from the current data. */
    private void refresh() {
        stockModel.setRowCount(0);
        for (HashMap<String, Object> product : stock.getAll()) {
            stockModel.addRow(new Object[]{
                    Stock.getId(product),
                    Stock.getName(product),
                    String.format("%.2f", Stock.getPrice(product)),
                    Stock.getQty(product)
            });
        }

        cartModel.setRowCount(0);
        for (Map.Entry<Integer, Integer> entry : cart.getItems().entrySet()) {
            HashMap<String, Object> product = stock.findById(entry.getKey());
            int qty = entry.getValue();
            double price = Stock.getPrice(product);

            cartModel.addRow(new Object[]{
                    Stock.getId(product),
                    Stock.getName(product),
                    String.format("%.2f", price),
                    qty,
                    String.format("%.2f", price * qty)
            });
        }

        totalLabel.setText(String.format("Total: %.2f", cart.getTotal()));
    }
}
