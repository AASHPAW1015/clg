#include <iostream>
#include <vector>

using namespace std;

int binarySearch(const vector<int>& arr, int key)
{
    int left = 0;
    int right = arr.size() - 1;

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
    vector<int> arr = {10, 20, 30, 40, 50};

    int result = binarySearch(arr, 200);

    if (result == -1)
    {
        cout << "the value was not found in the array" << endl;
    }
    else
    {
        cout << "the index is " << result << endl;
    }

    return 0;
}

