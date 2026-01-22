#include <iostream>
using namespace std;

int main() {
  char vov;
  cout << "enter a letter" << endl;
  cin >> vov;

  switch (vov) {
    case 'a': case 'A': case 'e' : case 'E': case 'i': case 'I': case 'o': case 'O': case 'u': case 'U': 
      cout << "yep" << endl;
      break;
    default:
      cout << "nope" << endl;
  }
  return 0;
}

