// using func even odd.
#include <iostream>
using namespace std;

void eodd() {
  int num;
  cout << "enter a num: ";
  cin >> num;
  if (num % 2 == 0) {
    cout << "EVEN" << endl;
  }
  else {
    cout << "ODD" << endl;
  }
}

int main() {
  eodd();
  return 0;
}
