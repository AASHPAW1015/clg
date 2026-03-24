#include <iostream>
using namespace std;

int main() {
  int a;
  float b;
  double c;
  char d;
  bool e;

  cout << "Size of int : " << sizeof(a) << "bytes" << endl;
  cout << "Size of float : " << sizeof(b) << "bytes" << endl;
  cout << "Size of double : " << sizeof(c) << "bytes" << endl;
  cout << "Size of char : " << sizeof(d) << "bytes" << endl;
  cout << "Size of boolean : " << sizeof(e) << "bytes" << endl;

  return 0;
}

// Size of int : 4bytes
// Size of float : 4bytes
// Size of double : 8bytes
// Size of char : 1bytes
// Size of boolean : 1bytes
