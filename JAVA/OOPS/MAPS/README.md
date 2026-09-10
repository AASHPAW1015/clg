# Shopping Stock & Cart System

A Java Swing shop application built around the Collections Framework. The stock is a
`LinkedList` of `HashMap`s, where each map is a single product holding its id, name,
price and quantity, while the cart is a separate `HashMap` mapping a product id to the
quantity chosen. Selecting a product and adding it to the cart moves one unit across —
the stock quantity drops by one and the cart quantity rises by one — and removing an
item reverses that exactly, returning the unit to stock. Because the cart stores only
ids and counts, every name and price shown is read back from the stock, so a product's
price is defined in exactly one place. The running total recalculates on each change,
and generating a bill prints the itemised list with the final amount and empties the
cart. The logic is split across a `Stock` class, a `Cart` class, and a `ShopUI` window
class that holds no shopping rules of its own and simply calls into the other two.
