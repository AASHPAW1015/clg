#include <iostream>
using namespace std;
int main() {
    int y = 2024;
    int* p = &y;
    if ((*p % 4 == 0 && *p % 100 != 0) || (*p % 400 == 0))
        cout << "Leap" << endl;
    else
        cout << "Not Leap" << endl;
    return 0;
}
