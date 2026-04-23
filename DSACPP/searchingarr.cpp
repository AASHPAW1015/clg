
#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& x, int y) {
  for (int i = 0; i < x.size(); i++) { 
    if (x[i] == y) {
      return i;
    } 
  }
  return -1;
}

int main() {
  vector<int> a = {1, 2, 3, 10, 50, 40};
  int num = 10;
  int res = search(a, num);

  if (res == -1) {
    cout << "Element is not present in the array";
  } else {
    cout << "Element is present at index " << res;
  }

  return 0;
}

