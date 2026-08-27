# Bus Reservation Booking

Swing form. Passenger name fields appear dynamically based on the number typed.

## Run

```
javac BusBooking.java
java BusBooking
```

## Fare

```
PLACES = {Airoli, Kharghar, Mahalaxmi, Prabhadevi, Mulund}   // index 0..4
fare = abs(sourceIndex - destIndex) * 100 * passengers
```

Airoli -> Mulund, 2 passengers = 4 * 100 * 2 = 800.

## Dynamic fields

All 5 label+field pairs are created up front in a loop and hidden. Typing a count
un-hides the first N. `readCount()` caps input at 5 and returns 0 on junk.

## Listeners

| Listener | On | Does |
|---|---|---|
| KeyListener | count field | show/hide name rows, refresh fare |
| ActionListener | Source / Destination | recalculate fare |
| ActionListener | Submit | validate, summary popup, reset |
| ActionListener | Reset | clear form |
| MouseListener | fare field | hover highlight, press for fare breakdown popup |

## Validation

Blocks empty/zero count, source same as destination, and any blank passenger name.
