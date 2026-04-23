#include <iostream>
using namespace std;

int main() {
  int arr[5] = {10,20,30,40,50};
  int n = 5;
  int pos = 2;

  for (int i = pos; i < n-1; i++) {
    arr[i] = arr[i+1];
  }
  for (int x : arr) {
    std::cout << x << " ";
  }
  
  return 0;
}
