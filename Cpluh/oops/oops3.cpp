// print an integer using a class

#include <iostream>
using namespace std;

class integer {
  private:
    int integer;
  public:
    void setint(int i) {
      integer = i;
    }
    int display() {
      return integer;
    }
};

int main() {
  integer in;
  int i;
  cout << "Enter the num :";
  cin >> i;
  in.setint(i);
  cout << "the num is: " << in.display() << endl;
  return 0;
}
