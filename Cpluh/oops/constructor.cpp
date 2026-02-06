#include <iostream>
using namespace std;

class student {
  public:
    int rno;
    char name(50);
    double fee;

    student() {
      cout << "Enter roll num: ";
      cin >> rno;
      cout << "Enter name: ";
      cin >> name;
      cout << "Enter fee: ";
      cin >> fee;
    }
    void display() {
      cout << endl << rno << "\t" << name << "\t" << fee;
    }
};

int main() {
  student s;
  s.display();
  return 0;
}

