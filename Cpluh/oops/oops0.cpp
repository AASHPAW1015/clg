#include <iostream>
using namespace std;

class PRINT {
  public:
    string str;
    void print() {
      cout << str << endl;
    }
};

int main() {
  PRINT prt;
  prt.str = "HELLO WORLD";
  prt.print();
  return 0;
}
