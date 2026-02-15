#include <iostream>   // for cout, cin, endl, flush
#include <iomanip>    // for setw() and setfill() to format time as 04:59
#include <unistd.h>   // for sleep() to pause 1 second between ticks
#include <cstdlib>    // for system() to run the sound command

using namespace std;

// Parent Class - Timer Engine
class Timer {
public:
    int remainingSeconds;
    bool completed;

    // Constructor - sets default values when a Timer object is created
    Timer() {
        remainingSeconds = 0;
        completed = false;
    }

    // Starts the timer with minutes only (function overloading - version 1)
    // Converts minutes to seconds and begins the countdown
    void startTimer(int minutes) {
        remainingSeconds = minutes * 60;
        completed = false;
        countdown();
    }

    // Starts the timer with minutes and seconds (function overloading - version 2)
    // Combines both into total seconds and begins the countdown
    void startTimer(int minutes, int seconds) {
        remainingSeconds = (minutes * 60) + seconds;
        completed = false;
        countdown();
    }

    // Main countdown loop - ticks once per second
    // Uses \r to overwrite the time on the same line
    // Uses \033[3A to move cursor up 3 lines so the display updates in place
    void countdown() {
        int totalSeconds = remainingSeconds;

        cout << endl;

        while (remainingSeconds > 0) {
            int mins = remainingSeconds / 60;
            int secs = remainingSeconds % 60;
            // \r whenever read, prints on the same line rewriting the strings, flush makes the program print immediately. 
            cout << "\r  Time Remaining: "
                 << setfill('0') << setw(2) << mins
                 << ":"
                 << setfill('0') << setw(2) << secs
                 << "   ";

            cout << endl;
            displayProgress(totalSeconds, remainingSeconds);
            cout << "\033[3A" << flush; // moves cursor up 3 lines of the output(time remaining, minutes&seconds from displayProgress) so the display updates in place, because if we dont do this, the display will keep on printing to the next line.

            sleep(1);
            remainingSeconds--;
        }

        cout << "\r  Time Remaining: 00:00   " << flush; //since our loop doesnt go to 0, we print it here.
        cout << endl;
        displayProgress(totalSeconds, 0);

        completed = true;
        cout << endl;

        // The completed flag triggers the alert
        if (completed) {
            playAlert();
        }
    }

    // Displays two lines of progress blocks:
    // Line 1 (Minutes): solid blocks that disappear as each minute passes
    // Line 2 (Seconds): empty blocks that disappear every 10 seconds
    // Uses (value + 9) / 10 to round up integer division
    void displayProgress(int totalSeconds, int remaining) {
        int totalMinutes = totalSeconds / 60;
        int remainingMinutes = remaining / 60;
        int remainingSecsOnly = remaining % 60;

        // Line 1: one solid block per minute remaining, blocks disappear as minutes pass
        cout << "  Minutes: ";
        if (totalMinutes > 0) {
            for (int i = 0; i < totalMinutes; i++) {
                if (i < remainingMinutes)
                    cout << "\u25AE";
                else
                    cout << " ";
            }
        } else {
            cout << "--";
        }
        cout << "         " << endl; // extra spaces to make the display update in place, and not leave any empty boxes as an overlay (makes sure EVERYTHING is updated)

        // Line 2: one empty block per 10-second chunk, blocks disappear as seconds tick
        int totalSecBlocks;
        int filledSecBlocks;

        if (totalMinutes > 0) {
            totalSecBlocks = 6;
            filledSecBlocks = (remainingSecsOnly + 9) / 10;
        } else {
            totalSecBlocks = (totalSeconds + 9) / 10;
            filledSecBlocks = (remaining + 9) / 10;
        }

        cout << "  Seconds: ";
        for (int i = 0; i < totalSecBlocks; i++) {
            if (i < filledSecBlocks)
                cout << "\u25AF";
            else
                cout << " ";
        }
        cout << "         " << endl;
    }

    // Called when timer reaches zero
    // Prints the completion message and plays the alert sound file
    // system() runs a terminal command, afplay is the macOS audio player
    void playAlert() {
        cout << "\n  *** TIMES UP ***\n" << endl;
        system("afplay alert.wav &");
    }
};

// Child Class - Timer Modes (inherits from Timer)
class TimerModes : public Timer {
public:
    // Displays the main menu with all timer options
    void showMenu() {
        cout << "\n  ================================" << endl;
        cout << "       PRODUCTIVITY TIMER        " << endl;
        cout << "  ================================" << endl;
        cout << "  1. Sprint      (40 minutes)" << endl;
        cout << "  2. Break       (5 minutes)" << endl;
        cout << "  3. Custom Timer" << endl;
        cout << "  4. Pomodoro    (25 + 5 cycle)" << endl;
        cout << "  5. Exit" << endl;
        cout << "  ================================" << endl;
        cout << "  Choose an option: ";
    }

    // Main loop - shows the menu, reads user choice, and calls the right mode
    // Keeps looping until the user picks Exit (option 5)
    void run() {
        int choice;

        do {
            showMenu();
            cin >> choice;

            switch (choice) {
                case 1:
                    sprintMode();
                    break;
                case 2:
                    breakMode();
                    break;
                case 3:
                    customTimer();
                    break;
                case 4:
                    pomodoroMode();
                    break;
                case 5:
                    cout << "\n  Goodbye!\n" << endl;
                    break;
                default:
                    cout << "\n  Invalid option. Try again." << endl;
            }
        } while (choice != 5);
    }

    // Sprint Mode - a 40-minute focused work session
    // Calls the parent class startTimer with 40 minutes
    void sprintMode() {
        cout << "\n  Starting Sprint Mode (40 minutes)..." << endl;
        startTimer(40);
    }

    // Break Mode - a 5-minute rest period
    // Calls the parent class startTimer with 5 minutes
    void breakMode() {
        cout << "\n  Starting Break Mode (5 minutes)..." << endl;
        startTimer(5);
    }

    // Custom Timer - lets the user enter any duration
    // Demonstrates function overloading: calls startTimer(min) or startTimer(min, sec)
    void customTimer() {
        int minutes, seconds;
        char addSeconds;

        cout << "\n  Enter minutes: ";
        cin >> minutes;

        cout << "  Add seconds too? (y/n): ";
        cin >> addSeconds;

        if (addSeconds == 'y' || addSeconds == 'Y') {
            cout << "  Enter seconds: ";
            cin >> seconds;
            cout << "\n  Starting Custom Timer (" << minutes << "m " << seconds << "s)..." << endl;
            startTimer(minutes, seconds);
        } else {
            cout << "\n  Starting Custom Timer (" << minutes << " minutes)..." << endl;
            startTimer(minutes);
        }
    }

    // Pomodoro Mode - repeats a cycle of 25 min work + 5 min break
    // Uses a for loop to repeat cycles, calling the inherited startTimer each time
    void pomodoroMode() {
        int cycles;

        cout << "\n  How many Pomodoro cycles? ";
        cin >> cycles;

        for (int i = 1; i <= cycles; i++) {
            cout << "\n  --- Pomodoro Cycle " << i << " of " << cycles << " ---" << endl;

            cout << "\n  WORK phase (25 minutes)..." << endl;
            startTimer(25);

            if (i < cycles) {
                cout << "\n  BREAK phase (5 minutes)..." << endl;
                startTimer(5);
            }
        }

        cout << "\n  All Pomodoro cycles complete!\n" << endl;
    }
};

// Entry point - creates a TimerModes object and starts the menu
int main() {
    TimerModes app;
    app.run();
    return 0;
}
