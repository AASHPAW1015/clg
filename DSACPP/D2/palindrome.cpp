// 22nd october 2026

#include <iostream>
#include <string>
using namespace std;

int len(string word) { return word.size(); }

void palindrome(string word) {
  int size = len(word);
  int left = 0;
  int right = size - 1;

  while (left < right) {
    if (word[left] == word[right]) {
      left++;
      right--;
      if (left == right || left > right) {
        cout << "this is a palindrome" << endl;
        break;
      } else {
        continue;
      }
    } else {
      cout << "This is not a palindrome" << endl;
      break;
    }
  }
}

int main() {
  string word;
  cout << "Enter a word: ";
  cin >> word;
  cout << endl;
  palindrome(word);
  return 0;
}
