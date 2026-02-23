# OOP-Based Menu Driven Countdown Timer

A console-based productivity timer built in C++ using Object-Oriented Programming principles. The project demonstrates core OOP concepts like inheritance, encapsulation, and method overloading in a simple, beginner-friendly way.

## Features

- **Menu-Driven Interface**: Easy-to-use numbered menu inside the terminal.
- **Predefined Modes**:
  - **Sprint**: 40-minute deep work session.
  - **Break**: 5-minute rest period.
  - **Pomodoro**: Customizable cycles of 25-minute work and 5-minute break.
- **Custom Timer**: Allows the user to enter specific minutes (and optionally seconds) demonstrating method overloading.
- **Live Console Updates**: Uses ANSI escape codes (`\033[3A`) and carriage returns (`\r`) to overwrite the console output in-place, giving a smooth "live timer" feel without terminal clutter.
- **Visual Progress Bar**: 
  - Line 1 shows solid blocks (`▮`) for each minute that disappear as minutes pass.
  - Line 2 shows empty blocks (`▯`) representing 10-second chunks that disappear as seconds tick within the current minute.
- **Audio Alert**: Triggers a locally generated `alert.wav` file using macOS's native `afplay` command when the timer completes. The program waits for the 3-second alert to finish before returning to the menu.

## Class Architecture & Logic

The project separates the underlying timer mechanism from the user interface using inheritance.

### `Timer` (Parent Class)
Acts as the core engine. It handles all the complex logic of calculating time, updating the display, and triggering the alert. 

### `TimerModes` (Child Class)
Inherits from `Timer` and acts as the user interface. It handles displaying the menu, taking user input, and calling the inherited parent functions with the correct durations.

### Function Tree

```text
Timer (Parent Class)
├── remainingSeconds      (int) - State variable tracking time
├── completed             (bool) - Flag indicating timer completion
├── Timer()               - Constructor, sets default values
├── startTimer(min)       - Overload 1, starts timer with minutes
├── startTimer(min, sec)  - Overload 2, starts timer with minutes & seconds
├── countdown()           - Main engine loop: calculates time, sleeps, updates display
├── displayProgress()     - Calculates and draws the two-line block progress bar
└── playAlert()           - Prints "TIMES UP" and plays alert.wav
        │
        │ inherits
        ▼
TimerModes (Child Class)
├── showMenu()            - Prints the numbered menu options
├── run()                 - Main loop: reads choice and dispatches to modes
├── sprintMode()          - Calls inherited startTimer(40)
├── breakMode()           - Calls inherited startTimer(5)
├── customTimer()         - Prompts duration, calls startTimer(min) or startTimer(min, sec)
└── pomodoroMode()        - Loops defined cycles of 25 min work -> 5 min break
        │
        │ instantiates
        ▼
main()
└── Creates TimerModes app object and calls app.run()
```

## How to Build & Run

### Prerequisites
- macOS (due to `afplay` command for sound)
- `g++` or `clang++` compiler supporting C++17

### Compilation

Navigate to the project directory and compile everything into a single executable:

```bash
clang++ countdown.cpp -o countdown
```

### Execution

Run the compiled executable:

```bash
./countdown
```
