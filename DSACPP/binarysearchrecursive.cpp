#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int> &arr, int low, int high, int key)
{
    if(high>=low)
    {
        int mid= low + (high-low)/2;
        if(arr[mid]==key){
            return mid;
        }
        if(arr[mid]>key)
        {
            return binarySearch(arr, low, mid-1,key);
        }
        return binarySearch(arr, mid+1,high,key);
    }
    return -1;
}

int main()
{
    vector<int> arr={1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};

    int key=3;
    int n= arr.size();
    int result= binarySearch(arr,0,n-1,key);

    if(result==-1) cout<< "Element is not present in array" << endl;

    else cout << "Element is present at index " << result << endl;

    return 0;
}








