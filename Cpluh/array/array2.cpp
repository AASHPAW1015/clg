#include<iostream>
using namespace std;
int main(){
    //creating an array with numbers
    int numbers[]={1,2,3,4,5};
    //accesing elements in the array
    cout<<"First elements: "<<numbers[0]<<endl;//output 1
    cout<<"Second elements"<<numbers[1]<<endl;//output 2
    //modifying an element 
    numbers[2] = 10;//changing the third element to 10
    cout<<"modified array:"<<endl;
    //looping through array 
    for (int i = 0 ; i<=5; i++){
        cout<<numbers[i]<<" ";
    }
cout<<endl;
return 0;
}
