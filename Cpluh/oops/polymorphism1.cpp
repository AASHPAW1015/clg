//function overloading
#include<iostream>
using namespace std;
class poly{
    public:
    void func(int x)
    {
        cout<<"the value of x is: "<<x<<endl;
    }
    void func(double x)
    {
        cout<<"the value of x is: "<<x<<endl;
    }
    void func(int x, int y)
    {
        cout<<"value of x and y is: "<<x<<","<<y<<endl;
    }
    void func(float y)
    {
        cout<<"value of y is: "<<y<<endl;
    }
};
int main(){
    poly obj1;
    obj1.func(1);
    obj1.func(5.122);
    obj1.func(85,64);
    obj1.func(5.1);
    return 0;
}
