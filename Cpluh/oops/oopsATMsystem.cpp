// ATM System withdraw, default amt and showBalance


#include <iostream>
using namespace std;

class BANK {
  private:
    int balance = 1000;
  public:
    int showBalance(){
      return balance;
    }
    void withdraw(int amt){
      if (amt <=1000) {
        balance-=amt;
        cout << "You have withdrawed '" << amt << "'.";
        cout << "Remaining Balance: "<< showBalance() << endl;
      } else {
        cout << "YOU DONT HAVE THAT BALANCE!!" << endl;
        cout << "Remaining Balance: " << showBalance() << endl;
      }
    }


};

int main() {
  BANK b;
  int ch;
  cout << "Enter 1 to withdraw, enter 2 to check balance: ";
  cin >> ch;
  if (ch == 1) {
    int amt;
    cout << "Enter the amount to transact: ";
    cin >> amt;
    b.withdraw(amt);
  } 
  else if (ch == 2) {
    cout << "The balance is: " << b.showBalance() << endl;
  }
  return 0;
}

