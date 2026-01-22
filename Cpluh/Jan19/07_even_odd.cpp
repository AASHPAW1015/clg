#include <iostream>

using namespace std;

int main() {
    int num;

    cout << "Enter an integer: ";
    cin >> num;

    switch(num % 2) {
        case 0:
            cout << num << " is even.";
            break;
        case 1:
        case -1: // Handle negative odd numbers
            cout << num << " is odd.";
            break;
    }

    return 0;
}
