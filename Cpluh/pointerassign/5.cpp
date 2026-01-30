#include <iostream>
using namespace std;
int main() {
    int var = 10;
    int* ptr = &var;
    int** pptr = &ptr;
    cout << **pptr << endl;
    return 0;
}
