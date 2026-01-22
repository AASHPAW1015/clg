#include <iostream>
using namespace std;

void swapNumbers(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    cout << "After swap: " << a << " " << b << endl;
}

int main() {
    int num1, num2;
    cout << "Enter two numbers: ";
    cin >> num1 >> num2;
    cout << "Before swap: " << num1 << " " << num2 << endl;
    swapNumbers(num1, num2);
    return 0;
}
