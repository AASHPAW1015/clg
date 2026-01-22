#include <iostream>
using namespace std;

void changeName(char a) {
  a='Z';
  cout << a << endl;
  cout << &a << endl;
}

int main() {
  char ch='A';
  changeName(ch);
  cout << ch << endl;
  cout << &ch << endl;
  return 0;
}
