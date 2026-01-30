#include <iostream>
using namespace std;
int main() {
    int a = 10, b = 20;
    int *p1 = &a, *p2 = &b;
    cout << *p1 + *p2 << endl;
    return 0;
}
