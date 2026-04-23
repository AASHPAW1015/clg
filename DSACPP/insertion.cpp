#include <iostream>
using namespace std;

int main() {
  int arr[7] = {100, 200, 300, 400, 500};
  int n = 5;

  int pos1 = 5; 
  int val1 = 450;

  for (int i = n; i >= pos1; i--) {
    arr[i] = arr[i - 1];
  }
  arr[pos1 - 1] = val1;
  n++;

  int pos2 = 2;
  int val2 = 150;

  for (int i = n; i >= pos2; i--) {
    arr[i] = arr[i - 1];
  }
  arr[pos2 - 1] = val2;
  n++;

  for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
  }

  return 0;
}





