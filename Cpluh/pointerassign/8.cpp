#include <iostream>
using namespace std;
int main() {
    int a = 10, b = 20;
    int *p1 = &a, *p2 = &b;
    if (*p1 < *p2) cout << *p1 << endl;
    else cout << *p2 << endl;
    return 0;
}
