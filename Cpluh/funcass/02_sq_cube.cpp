#include <iostream>
using namespace std;

int square(int n) {
    return n * n;
}

int cube(int n) {
    return n * n * n;
}

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;
    cout << "Square: " << square(num) << endl;
    cout << "Cube: " << cube(num) << endl;
    return 0;
}
