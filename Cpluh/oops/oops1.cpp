#include <iostream>
using namespace std;

class Number {
  public:
    int value;
    void show() {
      cout << "Value is: " << value << endl;
    }
};

int main() {
  Number n1;
  n1.value = 25;
  n1.show();
  return 0;
}
