#include <iostream>
#include <vector>
using namespace std;

int linearSearch(vector<int>& arr, int srch) {
    for(int i=0; i<arr.size(); i++)
    {
        if(arr[i]==srch)
        {
            return i;
        }
    }
    return -1;
}

vector<int> bubbleSort(vector<int> arr, int len) {
  vector<int> changed = arr;
  for (int i = 1; i <= len; i++) {
    for (int j = 0; j < len-1; j++) {
      if (changed[j] > changed[j+1]) {
        swap(changed[j], changed[j+1]);
      }
    }
  }
  
  cout << "The sorted array via BUBBLE SORT is : ";
  cout << "[";
  for (int n : changed) {
      cout << n << ",";
  }
  cout << "]" << endl;
  return changed;
}

//binary search 
int binarySearch(vector<int>& arr, int len, int key)
{
    int left = 0, right = len - 1;
    while (left <= right)
    {
        int mid = left + (right - left) / 2;
        if (arr[mid] == key)
            return mid;
        else if (arr[mid] < key)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}

//recursive
int binarySearchR(vector<int> &arr, int low, int len, int key)
{
    int high = len - 1;
    if(high >= low)
    {
        int mid = low + (high - low) / 2;
        if(arr[mid] == key){
            return mid;
        }
        if(arr[mid] > key)
        {
            return binarySearchR(arr, low, mid-1, key);
        }
        return binarySearchR(arr, mid+1, high, key);
    }
    return -1;
}

int main() {
  vector<int> arr = {23,4,5,1,22,8};
  int len = arr.size();
   // Output the original array
  cout << "Original array: [";
  for (int i = 0; i < len; i++) {
    cout << arr[i];
    if (i < len - 1) cout << ",";
  }
  cout << "]" << endl << endl; 

  
  //linear search
  int searchLinear = 23;
  int res = linearSearch(arr, searchLinear);
  if (res == -1){
    cout << "The number was not found!" << endl;
  } else {
    cout << "The number " << searchLinear << " was found at index " << res << " !" << endl;
  }
  
  //bubble sort
  vector<int> sorted = bubbleSort(arr, len);
  
  //binary search (on sorted array)
  int searchBinary = 4;
  int resBinary = binarySearch(sorted, len, searchBinary);
  if (resBinary == -1){
    cout << "The number was not found!" << endl;
  } else {
    cout << "The number " << searchBinary << " was found at index " << resBinary << " !" << endl;
  }
  
  //binary search recursive (on sorted array)
  int searchBinaryR = 5;
  int resBinaryR = binarySearchR(sorted, 0, len, searchBinaryR);
  if (resBinaryR == -1){
    cout << "The number was not found!" << endl;
  } else {
    cout << "The number " << searchBinaryR << " was found at index " << resBinaryR << " !" << endl;
  }
  
  return 0;
}





