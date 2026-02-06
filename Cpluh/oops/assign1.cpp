#include <iostream>
#include <string>
using namespace std;

class Student {
  private: 
    string name;
    int roll_num;
    int Class;
  public:
    void setData(string a, int b, int c) {
      name = a;
      roll_num = b;
      Class = c;
    }
    void printData() {
      cout << "The name is: " << name << endl;
      cout << "The roll_num is: " << roll_num << endl;
      cout << "The class is: " << Class << " Std" << endl;
    }    
};

int main() {
  string a;
  int b,c;


  cout << "Enter the name: ";
  cin >> a;
  cout << "Enter the roll number: ";
  cin >> b;
  cout << "Enter the class: ";
  cin >> c;
  cout << endl;
  
  Student s;
  s.setData(a,b,c);
  s.printData();
  return 0;


}
