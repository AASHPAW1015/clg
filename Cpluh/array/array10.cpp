//search elem in array

#include <iostream>
using namespace std;

int main () {
  int a[5] = {1,2,3,4,5};
  int num;
  cout << "Enter the number you want to find: ";
  cin >> num;
  int flag = 0;
  for (int i = 0; i<5 ; i++) {
    if (a[i] == num) {
      cout << "The number is found!! And it exists!!" << endl;
      flag = 1;
      break;
    } 
  }
  if (flag == 0) {
    cout << "The number was not found!" << endl;
  }
  return 0;
}


