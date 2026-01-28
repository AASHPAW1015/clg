//Write a C++ Program using encapsulation using a class Account
//The class should containt public member functions to set and get the balance. Display the balance in main()
//Write a C++ Program to store and display account balance using getter and setter functions

#include <iostream>
using namespace std;

class Account {
  private:
    int balance;

  public:
    void SetBalance(int b){
      balance = b;
    }
    int getBalance() {
      return balance;
    }
};

int main() {
  Account a;
  a.SetBalance(5000);
  cout << a.getBalance() << endl;
  return 0;
}
