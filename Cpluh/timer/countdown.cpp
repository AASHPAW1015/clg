#include <iostream>
#include <iomanip>
#include <unistd.h>
#include <cstdlib>

using namespace std;

// Parent Class - Timer Engine
class Timer {
public:
    int remainingSeconds;
    bool completed;

    Timer() {
        remainingSeconds = 0;
        completed = false;
    }

    void startTimer(int minutes) {
        remainingSeconds = minutes * 60;
        completed = false;
        countdown();
    }

    void startTimer(int minutes, int seconds) {
        remainingSeconds = (minutes * 60) + seconds;
        completed = false;
        countdown();
    }

    void countdown() {
        int totalSeconds = remainingSeconds;

        cout << endl;

        while (remainingSeconds > 0) {
            int mins = remainingSeconds / 60;
            int secs = remainingSeconds % 60;

            cout << "\r  Time Remaining: "
                 << setfill('0') << setw(2) << mins
                 << ":"
                 << setfill('0') << setw(2) << secs
                 << "   " << flush;

            cout << endl;
            displayProgress(totalSeconds, remainingSeconds);
            cout << "\033[3A" << flush;

            sleep(1);
            remainingSeconds--;
        }

        cout << "\r  Time Remaining: 00:00   " << flush;
        cout << endl;
        displayProgress(totalSeconds, 0);

        completed = true;
        cout << endl;
        playAlert();
    }

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
        cout << "         " << endl;

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

    void playAlert() {
        cout << "\n  *** TIMES UP ***\n" << endl;
        system("afplay alert.wav &");
    }
};

// Child Class - Timer Modes (inherits from Timer)
class TimerModes : public Timer {
public:
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

    void sprintMode() {
        cout << "\n  Starting Sprint Mode (40 minutes)..." << endl;
        startTimer(40);
    }

    void breakMode() {
        cout << "\n  Starting Break Mode (5 minutes)..." << endl;
        startTimer(5);
    }

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

int main() {
    TimerModes app;
    app.run();
    return 0;
}
