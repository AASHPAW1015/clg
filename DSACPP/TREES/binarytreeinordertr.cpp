#include <iostream>
using namespace std;

class Node {
public:
  int data;
  Node *left;
  Node *right;

  Node(int value) {
    data = value;
    left = NULL;
    right = NULL;
  }
};

// Inorder Function
void inorder(Node *root) {

  if (root == NULL)
    return;

  inorder(root->left);

  cout << root->data << " ";

  inorder(root->right);
}

int main() {

  Node *root = new Node(50);

  root->left = new Node(30);
  root->right = new Node(70);

  root->left->left = new Node(20);
  root->left->right = new Node(40);

  root->right->left = new Node(60);
  root->right->right = new Node(80);

  cout << "Inorder Traversal: ";

  inorder(root);

  return 0;
}
