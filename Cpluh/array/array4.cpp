#include <iostream>
using namespace std;

int main() {
  int matrix[2][2] = {{1,2},{10,20}};
  cout << "The 2x2 matrix is: " << endl;
  for (int i = 0; i<2 ; i++) {
    for (int j = 0; j<2; j++) {
      cout << matrix[i][j];
    }
  }
  cout << endl;
}
