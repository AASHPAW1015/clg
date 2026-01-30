//reverse array

#include <iostream>
using namespace std;

int main() {
  int array[4] = {1,2,3,4};
  cout << "the reverse array is: [";
  for (int i = 4; i>=0 ; i--) {
    cout << array[i] << ",";
  }
  cout << "]";
  cout << endl;
  return 0;
}
