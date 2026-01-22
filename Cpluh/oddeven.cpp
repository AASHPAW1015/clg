#include <iostream>
using namespace std;

int main() {
  int num;
  cout << "ENTER A NUMBER:" << endl;
  cin >> num;

  if (num % 2 == 0) {
    cout << "THE NUMBER IS EVEN";
  }
  else {
    cout << "THE NUMBER IS ODD";
  }

  return 0;
}

