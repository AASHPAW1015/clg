#include <iostream>
using namespace std;

int findMax(int a, int b, int c) {
    if (a >= b && a >= c) return a;
    if (b >= a && b >= c) return b;
    return c;
}

int main() {
    int n1, n2, n3;
    cout << "Enter three numbers: ";
    cin >> n1 >> n2 >> n3;
    cout << "Largest number: " << findMax(n1, n2, n3) << endl;
    return 0;
}
