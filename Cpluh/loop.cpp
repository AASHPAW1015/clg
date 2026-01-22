#include <iostream>
using namespace std;
int main () {
  for (int i = 2; i<=2; ++i) {
    cout << "Outer: " << i << "\n";
    for (int j=1; j<=3; ++j) {
      cout << "\t" << "inner: " << j << "\n";
    }
  }
  return 0;
}

