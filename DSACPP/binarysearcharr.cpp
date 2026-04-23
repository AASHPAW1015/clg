#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int key)
{
    int left = 0, right = n - 1;

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

int main()
{
    int arr[5] = {10,20,30,40,50};

    int result = binarySearch(arr, 5, 20);

    cout << "Index in arr: " << result << endl;

    return 0;
}
