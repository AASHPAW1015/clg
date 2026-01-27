#include <iostream>
using namespace std;

int greatest(int a, int b, int c) {
  if (a>=b) { if (a>=c) { return a; } else { return c;}}
  else { if (b>=c) { return b; } else { return c; }}} 

int main() {
  int a,b,c;
  cout << "Enter three numbers: ";
  cin >> a >> b >> c;

  int d = greatest(a,b,c);
  cout << "the greatest number is: " << d << endl;
}
