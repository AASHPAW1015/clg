#include <iostream>
using namespace std;

void incr(int &n) {
  n+=1;
}

int main() {
  int a = 5;
  incr(a);
  cout << "increment is: " << a << endl;
  return 0;
}
