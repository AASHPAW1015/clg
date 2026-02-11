//operator overloading

#include <iostream>
using namespace std;

class Number {
  public:
    int value;
    Number(int x) {   //constructor 
      value = x;
    }
    Number operator+ (Number obj) {
      return value + obj.value;
    }

};

int main() {
  Number n1(30);
  Number n2(20);
  Numbers n3 = n1 + n2;

  cout << "Sum =" << n3.value << endl;
  return 0;
}
