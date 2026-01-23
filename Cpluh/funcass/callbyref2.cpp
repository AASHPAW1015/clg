#include <iostream>
using namespace std;

void sq(int &n) {
  n=n*n;
}

int main() {
  int a = 5;
  sq(a);
  cout << "square is: " << a << endl;
  return 0;
}
