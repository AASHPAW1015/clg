//find sum of elems in array

#include <iostream>
using namespace std;

int main() {
  int array[4] = {1,2,3,4};
  int c = 0;
  for (int i = 0; i<4 ; i++) {
    c+=array[i];
  }
  cout << "The sum of the array is: " << c << endl;
  return 0;
}
