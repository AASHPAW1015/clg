#include <iostream>
using namespace std;
int add(int a, int b) {
    return a + b;}
int subtract(int a, int b) {
    return a - b;}


int multiply(int a, int b) 
{
    return a*b;
}


float divide(float a, float b) {
    if  (b!=0)
    {
        return a/b;
    }
    else
    {
        cout << 'ehehe';
        return 0.0f;
    }
}
int main() {
    int a, b;
    cout << "Enter 1st No: ";
    cin >> a;
    cout << "Enter 2nd No: ";
    cin >> b;
    cout << add(a, b) << endl;
    cout << subtract(a, b) << endl;
    cout << multiply(a, b) << endl;
    cout << divide(a, b) << endl;
    return 0;
}
