// add two numbers

#include <iostream>
using namespace std;

class add {
  private:
    int num1;
    int num2;
  public:
    void setnum(int i, int j) {
      num1 = i;
      num2 = j;
    }
    int display() {
      return num1 + num2;
    }
};

int main() {
  add a;
  int i,j;
  cout << "Enter the two numbers :";
  cin >> i >> j;
  a.setnum(i,j);
  cout << "the num is: " << a.display() << endl;
  return 0;
}
