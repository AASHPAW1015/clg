#include <iostream>
using namespace std;

// Helper function to print the array with boxes and highlights
void printArray(int arr[], int low, int high, int pivot_index, int i, int j, string step) {
    cout << step << endl;
    cout << "Pivot = " << arr[pivot_index] << " | i = " << i << " | j = " << j << endl;
    
    // Print top border
    for (int k = low; k <= high; k++) {
        cout << "+---";
    }
    cout << "+" << endl;
    
    // Print array values with highlights
    for (int k = low; k <= high; k++) {
        cout << "| ";
        if (k == pivot_index) {
            cout << "P"; // P for pivot
        } else if (k == i) {
            cout << "i";
        } else if (k == j) {
            cout << "j";
        } else {
            cout << " ";
        }
        cout << " ";
    }
    cout << "|" << endl;
    
    // Print array values
    for (int k = low; k <= high; k++) {
        if (arr[k] < 10) {
            cout << "| " << arr[k] << " ";
        } else {
            cout << "|" << arr[k] << " ";
        }
    }
    cout << "|" << endl;
    
    // Print bottom border
    for (int k = low; k <= high; k++) {
        cout << "+---";
    }
    cout << "+" << endl << endl;
}

// Quick Sort function with visualization
void quickSort(int arr[], int low, int high) {
    // Base case: if the array has 1 or no element, stop recursion
    if (low >= high) return;
    
    cout << "\n========== SORTING RANGE [" << low << " to " << high << "] ==========" << endl;
    
    // Step 1: Choose pivot (last element)
    int pivot = arr[high];
    cout << "Pivot selected: " << pivot << " (at index " << high << ")" << endl << endl;
    
    // Step 2: 'i' will track the correct position for smaller elements
    int i = low;
    
    printArray(arr, low, high, high, i, low, "Initial state:");
    
    // Step 3: Traverse the array
    for (int j = low; j < high; j++) {
        cout << "Comparing arr[" << j << "] = " << arr[j] << " with pivot " << pivot << endl;
        
        // If current element is smaller than pivot
        if (arr[j] < pivot) {
            cout << "  -> " << arr[j] << " < " << pivot << ", so SWAP arr[" << i << "] and arr[" << j << "]" << endl;
            
            // Swap arr[i] and arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            
            printArray(arr, low, high, high, i, j, "  After swap:");
            
            // Move i forward
            i++;
            cout << "  i incremented to " << i << endl << endl;
        } else {
            cout << "  -> " << arr[j] << " >= " << pivot << ", no swap needed" << endl << endl;
        }
    }
    
    // Step 4: Place pivot at its correct sorted position
    cout << "Placing pivot at correct position:" << endl;
    cout << "  SWAP arr[" << i << "] = " << arr[i] << " and arr[" << high << "] = " << arr[high] << endl;
    
    int temp = arr[i];
    arr[i] = arr[high];
    arr[high] = temp;
    
    printArray(arr, low, high, i, i, high, "  After placing pivot:");
    
    cout << "Pivot " << arr[i] << " is now at its correct position (index " << i << ")" << endl;
    
    // Step 5: Recursively sort left part (elements smaller than pivot)
    if (i - 1 > low) {
        cout << "\nRecursing LEFT: elements from index " << low << " to " << i - 1 << endl;
        quickSort(arr, low, i - 1);
    }
    
    // Step 6: Recursively sort right part (elements greater than pivot)
    if (i + 1 < high) {
        cout << "\nRecursing RIGHT: elements from index " << i + 1 << " to " << high << endl;
        quickSort(arr, i + 1, high);
    }
}

int main() {
    // Initial array
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = 6;
    
    cout << "===============================================" << endl;
    cout << "        QUICK SORT VISUALIZATION" << endl;
    cout << "===============================================" << endl;
    
    // Print initial array
    cout << "\nOriginal array:" << endl;
    for (int k = 0; k < n; k++) {
        cout << "+---";
    }
    cout << "+" << endl;
    for (int k = 0; k < n; k++) {
        if (arr[k] < 10) {
            cout << "| " << arr[k] << " ";
        } else {
            cout << "|" << arr[k] << " ";
        }
    }
    cout << "|" << endl;
    for (int k = 0; k < n; k++) {
        cout << "+---";
    }
    cout << "+" << endl;
    
    // Call Quick Sort
    quickSort(arr, 0, n - 1);
    
    // Print final sorted array
    cout << "\n===============================================" << endl;
    cout << "Final Sorted array:" << endl;
    for (int k = 0; k < n; k++) {
        cout << "+---";
    }
    cout << "+" << endl;
    for (int k = 0; k < n; k++) {
        if (arr[k] < 10) {
            cout << "| " << arr[k] << " ";
        } else {
            cout << "|" << arr[k] << " ";
        }
    }
    cout << "|" << endl;
    for (int k = 0; k < n; k++) {
        cout << "+---";
    }
    cout << "+" << endl;
    cout << "===============================================" << endl;
}
