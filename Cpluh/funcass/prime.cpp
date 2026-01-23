#include <iostream>
using namespace std;
int main() {
  int i, num;
  cout << "Enter the number: ";
  cin >> num;
  for (i=2; i <= num / 2; i++) {
    if (num%i==0) {
      cout << "\n Not a prime number!";
      return 0;
    }
  }
  cout << "\nIt is a prime number!";
  return 0;
}
