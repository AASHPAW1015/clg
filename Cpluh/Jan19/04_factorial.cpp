#include <iostream>

using namespace std;

int main() {
    int num;
    long long factorial = 1;

    cout << "Enter a positive integer: ";
    cin >> num;

    if (num < 0) {
        cout << "Error! Factorial of a negative number doesn't exist." << endl;
    } else {
        for (int i = 1; i <= num; ++i) {
            factorial *= i;
        }
        cout << "Factorial of " << num << " = " << factorial << endl;
    }

    return 0;
}
