#include <iostream>
using namespace std;

class smth{
public:
  string continent;
  string country;

  void display() {
    cout << "The country in the continent " << continent << " is " << country << "." << endl;
  }
};

int main () {
  smth s;
  s.continent = "Asia";
  s.country = "India";
  
  s.display();
  return 0;
}
