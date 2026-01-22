#include <iostream>
using namespace std;

void eodd(int x) {
  if (x % 2 == 0) {
    cout << "EVEN" << endl;
  }
  else {
    cout << "ODD" << endl;
  }
}

int main() {
  int num;
  cout << "enter a num: ";
  cin >> num;

  eodd(num);
  return 0;
}

