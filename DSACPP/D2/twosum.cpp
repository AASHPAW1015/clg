// 22 oct 2026

// conventional O(n^2)

#include <iostream>
#include <vector>
using namespace std;

int len(vector<int> arr) { return arr.size(); }

void conventional(vector<int> arr, int target) {
  bool found = false;
  int size = len(arr);
  for (int i = 0; i < size; i++) {
    for (int j = 0; j < size; j++) {
      if (arr[i] == arr[j]) {
        continue;
      }
      if (arr[i] + arr[j] == target) {
        cout << "the numbers are" << arr[i] << ", " << arr[j] << endl;
        found = true;
        break;
      }
    }
    if (found == true) {
      break;
    }
  }
}

// optimised O(n)
vector<int> optimised(vector<int> arr, int target) {
  int size = len(arr);
  int left = 0;
  int right = size - 1;

  while (left < right) {
    int currentSum = arr[left] + arr[right];

    if (currentSum == target) {
      return {arr[left], arr[right]};
    } else if (currentSum < target) {
      left++;
    } else {
      right--;
    }
  }
  return {};
}

int main() {
  vector<int> arr = {1, 2, 3, 5, 7, 10, 11, 15};
  int target = 15;
  conventional(arr, target);
  vector<int> indexes = optimised(arr, target);
  cout << "the numbers are: " << indexes[0] << ", " << indexes[1] << endl;
  return 0;
}
