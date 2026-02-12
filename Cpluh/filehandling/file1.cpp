#include <iostream>
#include <fstream>
using namespace std;

int main() {
  ofstream my_file("abc.txt");
  if (!my_file) {
    cout << "Error opening the file" << endl;
    return 1;
  }
  my_file.close();
  return 0;

}

