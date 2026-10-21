#include <iostream>
#include <vector>
using namespace std;

int sizeVect(vector<int> arr) { return arr.size(); }
void display(vector<int> arr) {

  int size = sizeVect(arr);
  cout << "Student Marks: [";
  for (int i = 0; i < size; i++) {
    cout << arr[i] << ", ";
  }
  cout << "]." << endl;
}

void maximum(vector<int> arr) {
  int size = sizeVect(arr);
  cout << "The maximum number is ";
  int marks = arr[0];
  for (int i = 0; i < size; i++) {
    if (arr[i] > marks) {
      marks = arr[i];
    }
  }
  cout << marks << "." << endl;
}

void minimum(vector<int> arr) {
  int size = sizeVect(arr);
  cout << "The minimum number is ";
  int marks = arr[0];
  for (int i = 0; i < size; i++) {
    if (arr[i] < marks) {
      marks = arr[i];
    }
  }
  cout << marks << "." << endl;
}

int average(vector<int> arr) {
  int size = sizeVect(arr);
  int marks = 0;
  for (int i = 0; i < size; i++) {
    marks += arr[i];
  }
  int avg = marks / size;
  cout << "The avg marks are " << avg << endl;
  return avg;
}

int searching(vector<int> arr) {
  int size = sizeVect(arr);
  int num;
  cout << "Please enter a number to find in the array: ";
  cin >> num;
  cout << endl;
  int index;

  bool found = false;
  for (int i = 0; i < size; i++) {
    if (num == arr[i]) {
      found = true;
      index = i;
    }
  }
  if (found == true) {
    cout << "The number was found at index " << index << endl;
  } else {
    cout << "The number wasn't found!" << endl;
  }
  return index;
}

int searching(vector<int> arr, int num) {
  int size = sizeVect(arr);
  int index;
  bool found = false;
  for (int i = 0; i < size; i++) {
    if (num == arr[i]) {
      found = true;
      index = i;
    }
  }
  return index;
}

void insert(
    vector<int> &arr) { // holy moly..insert inserting to a copy of the data,
                        // needs a data pointer to make a proper edit.

  int size = sizeVect(arr);
  int index;
  int num;
  cout << "Please input the number to insert: ";
  cin >> num;
  cout << endl;
  cout << "Please input the place where the number should be inserted: ";
  cin >> index;
  cout << endl;

  arr.insert(arr.begin() + (index - 1), num);
  cout << "check the array now : ";
  display(arr);
}

void deleting(vector<int> &arr) {
  int size = sizeVect(arr);
  int num;
  cout << "Please input the number to delete: ";
  cin >> num;

  int index = searching(arr, num);
  if (index != -1) {
    arr.erase(arr.begin() + index);
    cout << "The post deletion array is: ";
    display(arr);
    cout << endl;
  } else {
    cout << "The number does not exist!";
  }
}

void sort(vector<int> arr) {
  int size = sizeVect(arr);
  for (int i = 1; i <= size; i++) {
    for (int j = 0; j <= size - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
      } else {
        continue;
      }
    }
  };
  cout << "The sorted array is: ";
  display(arr);
  cout << endl;
}

void countAftAvg(vector<int> arr) {
  int size = sizeVect(arr);
  int count = 0;
  int avg = average(arr);

  for (int i = 0; i < size; i++) {
    if (arr[i] >= avg) {
      ++count;
    }
  }
  cout
      << "the number of students who achieved more than the class average are: "
      << count << endl;
}

int main() {
  vector<int> arr = {10, 55, 64, 100, 60, 75, 99, 98, 77, 90};

  int choice;
  do {

    cout << "        MAIN MENU        " << endl;
    cout << "1. Display " << endl;
    cout << "2. Maximum" << endl;
    cout << "3. Minimum" << endl;
    cout << "4. Avergae" << endl;
    cout << "5. Searching" << endl;
    cout << "6. Inserting" << endl;
    cout << "7. Delete" << endl;
    cout << "8. Sort" << endl;
    cout << "9. Count above avg" << endl;
    cout << "10. Exit" << endl;

    cout << "Enter your choice (1-10): ";
    cin >> choice;
    cout << endl;

    switch (choice) {
    case 1:
      display(arr);
      cout << endl;
      break;

    case 2:
      maximum(arr);
      cout << endl;
      break;

    case 3:
      minimum(arr);
      cout << endl;
      break;

    case 4:
      average(arr);
      cout << endl;
      break;

    case 5:
      searching(arr);
      cout << endl;
      break;

    case 6:
      insert(arr);
      cout << endl;
      break;

    case 7:
      deleting(arr);
      cout << endl;
      break;

    case 8:
      sort(arr);
      cout << endl;
      break;

    case 9:
      countAftAvg(arr);
      cout << endl;
      break;

    case 10:
      cout << "byee!" << endl;
      break;

    default:
      cout << "Invalid choice! Please enter a number between 1 and 10." << endl;
      break;
    }

  } while (choice != 10);
  return 0;
}
