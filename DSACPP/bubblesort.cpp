#include <iostream>
using namespace std;

int main() {
  int array[6] = {3,41,6,4,2,8};
  int l = 6;

  for (int i = 1; i <= l; i++) {
    for (int j = 0; j <= l-1 ; j++) {
      if (array[j] > array[j+1]) {swap(array[j],array[j+1]);}
      else {continue;}
    }
  };
  
  cout << "[";
  for (int n : array) {
      cout << n << ",";
    };
  cout << "]" << endl;

  return 0;

}










