#include <iostream>
using namespace std;

int main() {
  int num;
  
  cout << "Input a number:" << endl;
  cin >> num;

  if (num>0) {
    cout << "THE NUMBER IS POSITIVE";
  }
  else if (num<0) {
    cout << "THE NUMBER IS NEGATIVE";
  }
  else {
   cout << "THE NUMBER IS ZERO";
  }

  return 0;
}
