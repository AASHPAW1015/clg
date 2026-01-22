#include <iostream>
using namespace std;

int main() {
  int var = 5;
  int* point_var = &var;

  // value of var
  cout << "var: " << var << endl;
  
  //Address of var
  cout << "Address: (&var) " << &var << endl;

  //point_var Address
  cout << "point_var: " << point_var << endl;

  // point_var value
  cout << "point_var val (*point_var): " << *point_var << endl;

  return 0;

}
