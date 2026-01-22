#include <iostream> 
using namespace std; 
int main() {
  int num1;
  int num2;

  cout << "ENTER TWO NUMBERS:" << endl;
  cin >> num1 >> num2;

  if (num1 > num2) {
    cout <<  num1 << " IS GREATER THAN " << num2 << endl;
  }
  else if (num1 < num2){
    cout << num2 << "IS GREATER THAN " << num1 << endl;
  }
  else {
    cout << "THE NUMBERS ARE EQUAL" << endl;
  }

  return 0;
}


