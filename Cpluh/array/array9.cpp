// even elems in an array


#include <iostream>
using namespace std;

int main () {
  int a[5] = {1,2,3,4,5};
  int c = 0;
  for (int i = 0; i<5 ; i++) {
    if (a[i] % 2 == 0) {
      c++;
    } 
  }
  cout << "The number of even nos. are: " << c << endl;
  cout << "The number of odd nos. are: " << 5-c << endl;
  return 0;
}


