#include <iostream>
using namespace std;

int main() {
  int a[5] = {1,2,3,4,5};
  int b[5];
  for (int i = 0; i<5 ; i++) {
    b[i] = a[i];
  }
  cout << "The copied array is: [";
  for (int j = 0; j<5 ; j++) {
    if (j == 4) {
      cout << b[j] << "]" <<endl;
      break;
    }
    cout << b[j] << ",";
  }
  return 0;
}
