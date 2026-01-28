// Even or odd 

#include <iostream>
using namespace std;

class check {
  private:
    int num;
  public:
    void setnum(int n) {
      num = n;
    }

    string even_odd() {
      if (num % 2 == 0) {
        return "Even";
      } else {
        return "Odd";
      }
    }
};

int main() {
  int n;
  cout << "Enter a damn number: ";
  cin >> n;

  check c;
  c.setnum(n);
  cout << "This number is " << c.even_odd() << endl;
  return 0;
}
