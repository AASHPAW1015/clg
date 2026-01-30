#include <iostream>
using namespace std;
int main() {
    int a = 10, b = 20;
    int *p1 = &a, *p2 = &b;
    int temp = *p1;
    *p1 = *p2;
    *p2 = temp;
    cout << a << " " << b << endl;
    return 0;
}
