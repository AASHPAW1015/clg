#include <iostream>
using namespace std;

int main() {
  int num;
  cout << "ENTER A NUMBER:" << endl;
  cin >> num;

  if (num % 5 == 0) {
    cout << "THE NUMBER IS DIVISIBLE BY 5" << endl;
  }
  else {
    cout << "THE NUMBER IS NOT DIVISIBLE BY 5" << endl;
  }

  return 0;
}


