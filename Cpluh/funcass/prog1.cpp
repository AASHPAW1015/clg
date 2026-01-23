#include <iostream>
using namespace std;

int main() {
  int a, b;
  int *p1, p2;

  cout<<"Enter two numbers";
  cin>>a>>b;
  p1 = &a;
  p2 = &b;
  if (*p1 > *p2)
    cout<<"Maximum number is"<<*p1;
  else 
    cout<<"Maximum number is"<<*p2;

  return 0;

}
