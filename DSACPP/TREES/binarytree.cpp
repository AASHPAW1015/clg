#include <iostream>
using namespace std;

// Node class
class Node {
public:
  int data;
  Node *left;
  Node *right;

  // Constructor
  Node(int value) {
    data = value;
    left = NULL;
    right = NULL;
  }
};

int main() {

  // Creating BST manually
  Node *root = new Node(50);

  root->left = new Node(30);
  root->right = new Node(70);

  root->left->left = new Node(20);
  root->left->right = new Node(40);

  root->right->left = new Node(60);
  root->right->right = new Node(80);
  cout << "hi" << endl;

  return 0;
}
