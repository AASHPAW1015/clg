//selection sort
#include <iostream>
using namespace std;

int main() {
   int arr[] = {5, 2, 9, 1, 5};
   int n = 5;

   for(int i = 0; i < n-1; i++) {
       int minIndex = i;
       for(int j = i+1; j < n; j++) {
           if(arr[j] < arr[minIndex]) {
               minIndex = j;
           }
       }
       swap(arr[i], arr[minIndex]);
   }

   for(int i = 0; i < n; i++){
    if (i == n-1){
      cout << arr[i] << endl;
      return 0;
    }
    cout << arr[i] << " ";

  }

}

