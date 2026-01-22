#include <iostream>
using namespace std;

int main() {
  int n;

  for (n=0; n<11; n++) {
    cout<<n<<endl;
    if (n==10){
      break;
    }
  }
  return 0;
}
