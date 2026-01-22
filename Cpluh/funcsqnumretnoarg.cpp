#include <iostream>
using namespace std;

int sq() {
  int num;
  cout << "Enter a num to be sq: ";
  cin >> num;

  return num * num;
}

int main() {
  int numb = sq();
  cout << "The square of the entered number is: " << numb << endl;
  return 0;
  
}
