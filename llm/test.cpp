#include <iostream>
using namespace std;

const int MAX_SIZE = 50;
int marksArray[MAX_SIZE];
int currentSize = 0;

// Function to Display Marks
void displayMarks() {
  if (currentSize == 0) {
    cout << "No data to display." << endl;
    return;
  }
  cout << "Marks: ";
  for (int i = 0; i < currentSize; i++) {
    cout << marksArray[i] << " ";
  }
  cout << endl;
}

// Function to Find Max and Min (O(n))
void findMinMax() {
  if (currentSize == 0) {
    cout << "No data." << endl;
    return;
  }
  int max = marksArray[0];
  int min = marksArray[0];

  for (int i = 1; i < currentSize; i++) {
    if (marksArray[i] > max)
      max = marksArray[i];
    if (marksArray[i] < min)
      min = marksArray[i];
  }
  cout << "Maximum: " << max << endl;
  cout << "Minimum: " << min << endl;
}

// Function to Calculate Average
double calculateAverage() {
  if (currentSize == 0)
    return 0.0;
  double sum = 0;
  for (int i = 0; i < currentSize; i++) {
    sum += marksArray[i];
  }
  return sum / currentSize;
}

// Function to Search (Linear Search)
bool searchMarks(int target, int &indexFound) {
  indexFound = -1;
  for (int i = 0; i < currentSize; i++) {
    if (marksArray[i] == target) {
      indexFound = i;
      return true;
    }
  }
  return false;
}

// Function to Insert Mark (Shift Right)
void insertMark() {
  int mark, pos;
  cout << "Enter mark and position: "; // 0 is first position
  cin >> mark >> pos;

  if (currentSize >= MAX_SIZE) {
    cout << "Array full. Cannot insert." << endl;
    return;
  }

  // Adjust position to be within valid index range [0, currentSize]
  if (pos < 0)
    pos = 0;
  if (pos > currentSize)
    pos = currentSize;

  for (int i = currentSize; i > pos; i--) {
    marksArray[i] = marksArray[i - 1]; // Shift right
  }
  marksArray[pos] = mark;
  currentSize++;
}

// Function to Delete Mark (Shift Left)
void deleteMark() {
  int val, indexFound;
  cout << "Enter mark to delete: ";
  cin >> val;

  if (!searchMarks(val, indexFound)) {
    cout << "Value not found." << endl;
    return;
  }

  // Shift elements left starting from the position after deleted element
  for (int i = indexFound; i < currentSize - 1; i++) {
    marksArray[i] = marksArray[i + 1];
  }
  currentSize--;
}

// Function to Sort (Bubble Sort) - O(n^2)
void bubbleSort() {
  int temp;
  for (int i = 0; i < currentSize - 1; i++) {
    for (int j = 0; j < currentSize - i - 1; j++) {
      if (marksArray[j] > marksArray[j + 1]) {
        temp = marksArray[j];
        marksArray[j] = marksArray[j + 1];
        marksArray[j + 1] = temp;
      }
    }
  }
}

// Function to Count Above Average
void countAboveAverage() {
  double avg = calculateAverage();
  int count = 0;
  for (int i = 0; i < currentSize; i++) {
    if (marksArray[i] > avg)
      count++;
  }
  cout << "Average: " << avg << endl;
  cout << "Students above average: " << count << endl;
}

int main() {
  int choice, n, mark, indexFound;
  cout << "=== Student Marks System ===" << endl;

  // Input N and Array elements initially
  cout << "Enter number of students: ";
  cin >> n;

  for (int i = 0; i < n; i++) {
    cout << "Enter mark #" << (i + 1) << ": ";
    cin >> marksArray[i];
  }
  currentSize = n;

  while (true) {
    cout << "\nSelect Operation:";
    cout << "1. Display Marks" << endl;
    cout << "2. Find Max/Min" << endl;
    cout << "3. Calculate Average & Count Above"
         << endl; // Merged for convenience
    cout << "4. Search Mark" << endl;
    cout << "5. Insert Mark" << endl;
    cout << "6. Delete Mark" << endl;
    cout << "7. Sort (Bubble)" << endl;
    cout << "8. Exit" << endl;
    cin >> choice;

    switch (choice) {
    case 1:
      displayMarks();
      break;
    case 2:
      findMinMax();
      break;
    case 3:
      cout << "Average and count above:" << endl;
      countAboveAverage();
      break;
    case 4:
      cout << "Enter mark to search: ";
      cin >> mark;
      if (searchMarks(mark, indexFound))
        cout << "Found at index: " << indexFound << endl;
      else
        cout << "Not Found." << endl;
      break;
    case 5:
      insertMark();
      break;
    case 6:
      deleteMark();
      break;
    case 7:
      bubbleSort();
      displayMarks();
      cout << "Sorted!" << endl;
      break;
    case 8:
      return 0;
    default:
      cout << "Invalid choice." << endl;
    }
  }
}
