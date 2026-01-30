#include <iostream>
using namespace std;
void fun(int* p) {
    cout << *p << endl;
}
int main() {
    int var = 10;
    fun(&var);
    return 0;
}
