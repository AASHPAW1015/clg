#include <iostream>
using namespace std;

int main() {
  int num;
  cout<<"Enter a number: ";
  cin >> num;

  switch (num) {
    case 1:
      cout << "o"<< endl;
      break;
    case 2:
      cout << "oo" << endl;
      break;
    case 3:
      cout << "ooo"<< endl;
      break;
    default:
      cout << "no outputs for you" << endl;
  }
  return 0;
}
