//largest and smallest elem in array

#include <iostream>
using namespace std;

int main() {
  int array[4] = {1,2,3,4};
  int L = array[0];
  int S = array[0];

  for (int i = 0; i<4 ; i++) {
    if (array[i] >= L) {
      L = array[i];
    }
    if (array[i] <= S) {
      S = array[i];
    }
  }
  cout << "The Largest num is:  " << L << endl;
  cout << "The Smallest num is:  " << S << endl;

  return 0;
}



