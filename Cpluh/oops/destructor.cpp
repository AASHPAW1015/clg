#include <iostream>
using namespace std;

class Employee {
  public:
    Employee(){
      cout << "constuctor invoked" << endl;
    }
    ~Employee() {
      cout << "destructor invoked" << endl;
    }
};

int main() {
  Employee e1;
  Employee e2;
  return 0;
}
