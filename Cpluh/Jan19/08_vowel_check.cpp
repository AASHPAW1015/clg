#include <iostream>
using namespace std;

int main() {
    char ch;

    cout << "Enter a character: ";
    cin >> ch;

    // Convert to lowercase for easier checking
    char lowerCh = tolower(ch);

    switch(lowerCh) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
            cout << ch << " is a vowel.";
            break;
        default:
            if ((lowerCh >= 'a' && lowerCh <= 'z')) {
                cout << ch << " is a consonant.";
            } else {
                 cout << ch << " is not an alphabet.";
            }
    }
    return 0;
}
