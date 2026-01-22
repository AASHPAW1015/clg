#include <iostream>
using namespace std;

int main() {
  int age;
  
  cout << "Input your age to check eligibility for voting: " << endl;

  cin >> age;
  if (age>=18) {
    cout << "YOU ARE ELIGIBLE!!";
  }
  else {
    cout << "YOU ARE NOT ELIGIBLE!!";
  }
  return 0;

}
