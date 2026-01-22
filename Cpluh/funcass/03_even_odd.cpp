#include <iostream>
using namespace std;

string checkEvenOdd(int n) {
    if (n % 2 == 0)
        return "Even";
    else
        return "Odd";
}

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;
    cout << "The number is " << checkEvenOdd(num) << endl;
    return 0;
}
