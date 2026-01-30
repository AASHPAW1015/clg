#include <iostream>
using namespace std;
int main() {
    int n = 3;
    int* p = &n;
    cout << (*p) * (*p) * (*p) << endl;
    return 0;
}
